import { Action } from "./actions/Action";
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

const createNewLineupData = (): LineupData => {
    return {
        pointsScored: 0,
        pointsAllowed: 0,
        possessions: 0,
        offensiveFGA: 0,
        offensiveFGM: 0,
        offensive3PA: 0,
        offensive3PM: 0,
        rebounds: 0,
        assists: 0,
        defensiveFGA: 0,
        defensiveFGM: 0,
        defensive3PA: 0,
        defensive3PM: 0,
    };
};

const arrayRemove = (arr: Array<Player>, value: Player) => {
    return arr.filter((value) => value !== value);
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
    actionDict.set(lineupString, []);

    actionStack.forEach((action: Action, index) => {
        if (
            action instanceof Substitution &&
            action.playerGoingIn.team === team
        ) {
            let PGI = action.playerGoingIn;
            let PGO = action.playerGoingOut;
            arrayRemove(lineup, PGO);
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

const getLineupStats = (
    actionStack: Array<Action>,
    startingHomeLineup: Array<Player>,
    startingAwayLineup: Array<Player>
) => {
    actionStack.forEach((action: Action, i) => {});
    return {};
};

export { getLineupStats };
