import { Action } from "./actions/Action";
import { Assist } from "./actions/Assist";
import { FreeThrow } from "./actions/FreeThrow";
import { Marking } from "./actions/Marking";
import { PossessionEnd } from "./actions/PossessionEnd";
import { Rebound } from "./actions/Rebound";
import { Shot } from "./actions/Shot";
import { Substitution } from "./actions/Substitution";
import { Turnover } from "./actions/Turnover";
import { Player, Team } from "./Player";
import { ShotRegionTracker } from "./ShotTracker";

type LineupData = {
    lineupString: string;
    pointsScored: number;
    pointsAllowed: number;
    offensivePossessions: number;
    defensivePossessions: number;
    offensiveFGA: number;
    offensiveFGM: number;
    offensive3PA: number;
    offensive3PM: number;
    rebounds: number;
    assists: number;
    turnovers: number;
    defensiveFGA: number;
    defensiveFGM: number;
    defensive3PA: number;
    defensive3PM: number;
};

type MarkingData = {
    markingIndex: number;
    markingString: string;
    tpm: number;
    tpa: number;
    fgm: number;
    fga: number;
    ftm: number;
    fta: number;
    turnovers: number;
    points: number;
    shots: ShotRegionTracker;
};

const createNewLineupData = (lineupString: string): LineupData => {
    return {
        lineupString: lineupString,
        pointsScored: 0, // done
        pointsAllowed: 0,
        offensivePossessions: 0, // done
        defensivePossessions: 0,
        offensiveFGA: 0,
        offensiveFGM: 0,
        offensive3PA: 0,
        offensive3PM: 0,
        rebounds: 0, // done
        assists: 0, // done
        turnovers: 0,
        defensiveFGA: 0,
        defensiveFGM: 0,
        defensive3PA: 0,
        defensive3PM: 0,
    };
};

const createNewMarkingData = (
    markingIndex: number,
    markingString: string
): MarkingData => {
    return {
        markingIndex: markingIndex,
        markingString: markingString,
        tpm: 0,
        tpa: 0,
        fgm: 0,
        fga: 0,
        ftm: 0,
        fta: 0,
        turnovers: 0,
        points: 0,
        shots: new ShotRegionTracker(),
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

const segmentActionsByMarking = (
    actions: Action[],
    team: Team
): Map<number, Action[]> => {
    let currentPossession: Action[] = [];
    let marking: number = -1;
    const markingMappings: Map<number, Action[]> = new Map<number, Action[]>();

    actions.forEach((action) => {
        currentPossession.push(action);
        if (action instanceof Marking) {
            marking = action.markingKey;
        } else if (action instanceof PossessionEnd) {
            if (action.possessingTeam === team && marking !== -1) {
                // add the current possession actions to the markingMappings
                let arr = markingMappings.get(marking);
                if (arr) {
                    markingMappings.set(marking, [
                        ...arr,
                        ...currentPossession,
                    ]);
                } else {
                    markingMappings.set(marking, [...currentPossession]);
                }
            }
            // always
            marking = -1;
            currentPossession = [];
        }
    });
    return markingMappings;
};

const getLineupData = (
    team: Team,
    lineupString: string,
    actions: Action[]
): LineupData => {
    const data = createNewLineupData(lineupString);

    actions.forEach((action: Action) => {
        if (action instanceof PossessionEnd) {
            if (action.possessingTeam === team) {
                data.offensivePossessions += 1;
            } else {
                data.defensivePossessions += 1;
            }
        } else if (
            action instanceof Rebound &&
            action.reboundingPlayer.team === team
        ) {
            data.rebounds += 1;
        } else if (
            action instanceof Assist &&
            action.assistingPlayer.team === team
        ) {
            data.assists += 1;
        } else if (
            action instanceof Turnover &&
            action.offensivePlayer.team === team
        ) {
            data.turnovers += 1;
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

const getMarkingData = (
    markingIndex: number,
    markingString: string,
    actionArr: Action[],
    team: Team
): MarkingData => {
    const newMarkingData = createNewMarkingData(markingIndex, markingString);
    actionArr.forEach((action: Action) => {
        if (action instanceof Turnover) {
            newMarkingData.turnovers += 1;
        } else if (action instanceof FreeThrow) {
            newMarkingData.fta += 1;
            if (action.made) {
                newMarkingData.ftm += 1;
                newMarkingData.points += 1;
            }
        } else if (action instanceof Shot) {
            newMarkingData.shots.addShot(action.made, action.region);
            newMarkingData.points += action.shotPoints;
            newMarkingData.fga += 1;
            if (action.made) {
                newMarkingData.fgm += 1;
            }
            if (action.region >= 5) {
                newMarkingData.tpa += 1;
                if (action.made) {
                    newMarkingData.tpm += 1;
                }
            }
        }
    });

    return newMarkingData;
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

const getMarkingStats = (
    actionStack: Action[],
    team: Team,
    markings: string[]
): MarkingData[] => {
    const segmentations: Map<number, Action[]> = segmentActionsByMarking(
        actionStack,
        team
    );

    const allData: MarkingData[] = [];

    segmentations.forEach((actionArr, markingIndex) => {
        let markingString = markings[markingIndex];
        let entryData: MarkingData = getMarkingData(
            markingIndex,
            markingString,
            actionArr,
            team
        );
        allData.push(entryData);
    });

    return allData;
};

export { getTeamLineupStats, getMarkingStats };
