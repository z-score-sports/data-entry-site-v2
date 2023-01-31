import { makeAutoObservable } from "mobx";
import { Action } from "./actions/Action";
import { FreeThrow } from "./actions/FreeThrow";
import { PossessionEnd } from "./actions/PossessionEnd";
import { Shot } from "./actions/Shot";
import { Team } from "./Player";

class StatFactory {
    actionList: Array<Action>;

    constructor(actionStack: Array<Action>) {
        this.actionList = actionStack;
        makeAutoObservable(this);
    }

    getPossessions(team: Team) {
        let sum = 0;
        this.actionList.forEach((action) => {
            if (action instanceof PossessionEnd) {
                sum += 1;
            }
        });
        if (team === Team.home) {
            return Math.ceil(sum / 2);
        } else {
            return Math.floor(sum / 2);
        }
    }

    getTeamPoints(team: Team) {
        let sum = 0;
        this.actionList.forEach((action) => {
            if (action instanceof Shot && action.shootingPlayer.team === team) {
                sum += action.shotPoints;
            } else if (
                action instanceof FreeThrow &&
                action.shootingPlayer.team === team
            ) {
                sum += action.made ? 1 : 0;
            }
        });
        return sum;
    }

    get data(): object {
        return {
            homePossessions: this.getPossessions(Team.home),
            awayPossessions: this.getPossessions(Team.away),
            homePoints: this.getTeamPoints(Team.home),
            awayPoints: this.getTeamPoints(Team.away),
        };
    }
}

export { StatFactory };
