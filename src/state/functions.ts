import { Action } from "./actions/Action";
import { Player } from "./Player";

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

const getLineupStats = (
    actionStack: Array<Action>,
    startingHomeLineup: Array<Player>,
    startingAwayLineup: Array<Player>
) => {
    return {};
};

export { getLineupStats };
