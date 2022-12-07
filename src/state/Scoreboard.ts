import { makeAutoObservable } from "mobx";
import { FoulOutMessage } from "./actions/Foul";
import { FreeThrowOutMessage } from "./actions/FreeThrow";
import { ShotOutMessage } from "./actions/Shot";
import { Team } from "./Player";
import { Subscriber } from "./Subscriber";

type scoreboardUpdateMessage =
    | ShotOutMessage
    | FoulOutMessage
    | FreeThrowOutMessage;

class Scoreboard implements Subscriber {
    private quarter: number = 1;
    awayPoints: number = 0;
    homePoints: number = 0;
    possessionArrow: Team;
    awayTimeouts: number;
    homeTimeouts: number;
    totalTimeouts: number;
    homeFouls: number = 0;
    awayFouls: number = 0;

    public constructor(startPosArrow: Team, timeouts: number) {
        makeAutoObservable(this);
        this.possessionArrow = startPosArrow;
        this.totalTimeouts = timeouts;
        this.awayTimeouts = timeouts;
        this.homeTimeouts = timeouts;
    }

    public update(context: scoreboardUpdateMessage) {
        if (context.publisher === "shot") {
            this.handleShotUpdate(context as ShotOutMessage);
        } else if (context.publisher === "freethrow") {
            this.handleFreeThrowUpdate(context as FreeThrowOutMessage);
        } else if (context.publisher === "foul") {
            this.handleFoulUpdate(context as FoulOutMessage);
        }
    }

    handleShotUpdate(context: ShotOutMessage) {
        let points = context.action.shotPoints;
        if (context.type === "CREATE") {
            if (context.action.shootingPlayer.team === Team.home) {
                this.homePoints += points;
            } else {
                this.awayPoints += points;
            }
        } else {
            if (context.action.shootingPlayer.team === Team.home) {
                this.homePoints -= points;
            } else {
                this.awayPoints -= points;
            }
        }
    }

    handleFreeThrowUpdate(context: FreeThrowOutMessage) {
        let points = context.action.made ? 1 : 0;
        if (context.type === "CREATE") {
            if (context.action.shootingPlayer.team === Team.home) {
                this.homePoints += points;
            } else {
                this.awayPoints += points;
            }
        } else {
            if (context.action.shootingPlayer.team === Team.home) {
                this.homePoints -= points;
            } else {
                this.awayPoints -= points;
            }
        }
    }

    handleFoulUpdate(context: FoulOutMessage) {
        if (context.type === "CREATE") {
            if (context.action.foulingPlayer.team === Team.home) {
                this.homeFouls += 1;
            } else {
                this.awayFouls += 1;
            }
        } else {
            if (context.action.foulingPlayer.team === Team.home) {
                this.homeFouls -= 1;
            } else {
                this.awayFouls -= 1;
            }
        }
    }

    public callTimeout(team: Team) {
        if (team === Team.home) {
            this.homeTimeouts = Math.max(this.homeTimeouts - 1, 0);
        } else {
            this.awayTimeouts = Math.max(this.awayTimeouts - 1, 0);
        }
    }

    public getQuarter() {
        return this.quarter;
    }

    public increaseQuarter() {
        this.quarter += 1;

        if (this.quarter === 3) {
            this.homeFouls = 0;
            this.awayFouls = 0;
        }
    }

    public getBonusString(team: Team): string {
        if (team === Team.home && this.awayFouls >= 7) {
            if (this.awayFouls >= 10) {
                return "Bonus+";
            } else {
                return "Bonus";
            }
        } else if (team === Team.away && this.homeFouls >= 7) {
            if (this.homeFouls >= 10) {
                return "Bonus+";
            } else {
                return "Bonus";
            }
        } else {
            return "";
        }
    }
}

export { Scoreboard };
