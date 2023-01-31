import { Action } from "./actions/Action";
import { Assist } from "./actions/Assist";
import { FreeThrow } from "./actions/FreeThrow";
import { PossessionEnd } from "./actions/PossessionEnd";
import { Rebound } from "./actions/Rebound";
import { Shot } from "./actions/Shot";
import { Substitution } from "./actions/Substitution";
import { Player, Team } from "./Player";

//format of result:
/*

{
    "0_1_2_3_4": {
        pointsScored: number,
        pointsAllowed: number,
        possessions: number,
        offensiveFGA: number,
        offensiveFGM: number,
        offensive3PA: number,
        offensive3PM: number,
        rebounds: number,
        assists: number,
        defensiveFGA: number,
        defensiveFGM: number,
        defensive3PA: number,
        defensive3PM: number,
    }
}

*/

type LineupData = {
    lineupString: string;
    pointsScored: number;
    pointsAllowed: number;
    possessions: number;
    offensiveFGA: number;
    offensiveFGM: number;
    offensive3PA: number;
    offensive3PM: number;
    rebounds: number;
    assists: number;
    defensiveFGA: number;
    defensiveFGM: number;
    defensive3PA: number;
    defensive3PM: number;
};

const createNewLineupData = (lineupString: string): LineupData => {
    return {
        lineupString: lineupString,
        pointsScored: 0, // done
        pointsAllowed: 0,
        possessions: 0, // done
        offensiveFGA: 0,
        offensiveFGM: 0,
        offensive3PA: 0,
        offensive3PM: 0,
        rebounds: 0, // done
        assists: 0, // done
        defensiveFGA: 0,
        defensiveFGM: 0,
        defensive3PA: 0,
        defensive3PM: 0,
    };
};

const arrayRemove = (arr: Array<Player>, value: Player) => {
    return arr.filter((player) => player.num !== value.num);
};

const getLineupString = (lineup: Array<Player>): string => {
    let nums: Array<number> = lineup.map((player) => player.num);
    nums.sort();
    return nums.join("_");
};

const segmentActionsByLineup = (
    actionStack: Array<Action>,
    team: Team,
    startingLineup: Array<Player>
): Map<string, Action[]> => {
    let lineup: Array<Player> = startingLineup;
    let lineupString: string = getLineupString(lineup);

    const actionDict: Map<string, Action[]> = new Map<string, Action[]>();

    actionStack.forEach((action: Action, index) => {
        if (
            action instanceof Substitution &&
            action.playerGoingIn.team === team
        ) {
            let PGI = action.playerGoingIn;
            let PGO = action.playerGoingOut;
            lineup = arrayRemove(lineup, PGO);
            lineup.push(PGI);
            lineupString = getLineupString(lineup);
        } else {
            let arr = actionDict.get(lineupString);
            if (arr) {
                arr.push(action);
            } else {
                actionDict.set(lineupString, [action]);
            }
        }
    });
    return actionDict;
};

const getLineupData = (
    team: Team,
    lineupString: string,
    actions: Action[]
): LineupData => {
    const data = createNewLineupData(lineupString);

    actions.forEach((action: Action) => {
        if (action instanceof PossessionEnd) {
            data.possessions += 1;
        } else if (
            action instanceof Rebound &&
            action.reboundingPlayer.team === team
        ) {
            data.rebounds += 1;
        } else if (
            action instanceof Assist &&
            action.assistingPlayer.team == team
        ) {
            data.assists += 1;
        } else if (action instanceof FreeThrow && action.made) {
            if (action.shootingPlayer.team === team) {
                data.pointsScored += 1;
            } else {
                data.pointsAllowed += 1;
            }
        } else if (action instanceof Shot) {
            if (action.shootingPlayer.team === team) {
                data.offensiveFGA += 1;
                data.pointsScored += action.shotPoints;
                if (action.made) {
                    data.offensiveFGM += 1;
                }
                if (action.region >= 5) {
                    data.offensive3PA += 1;
                    if (action.made) {
                        data.offensive3PM += 1;
                    }
                }
            } else {
                data.defensiveFGA += 1;
                data.pointsAllowed += action.shotPoints;
                if (action.made) {
                    data.defensiveFGM += 1;
                }
                if (action.region >= 5) {
                    data.defensive3PA += 1;
                    if (action.made) {
                        data.defensive3PM += 1;
                    }
                }
            }
        }
    });
    return data;
};

const getTeamLineupStats = (
    actionStack: Array<Action>,
    team: Team,
    startingLineup: Array<Player>
) => {
    // get actionStack segmentations
    // for each lineup segmentation, get all the data
    const segmentations: Map<string, Action[]> = segmentActionsByLineup(
        actionStack,
        team,
        startingLineup
    );

    const allData: LineupData[] = [];
    segmentations.forEach((actionArr, lineupString) => {
        let entryData: LineupData = getLineupData(
            team,
            lineupString,
            actionArr
        );
        allData.push(entryData);
    });

    return allData;
};

export { getTeamLineupStats, segmentActionsByLineup };
