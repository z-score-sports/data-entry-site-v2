import { makeAutoObservable } from "mobx";
import { FoulOutMessage } from "./actions/Foul";
import { FreeThrowOutMessage } from "./actions/FreeThrow";
import { QuarterEndOutMessage } from "./actions/QuarterEnd";
import { ShotOutMessage } from "./actions/Shot";
import { Team } from "./Player";
import { Subscriber } from "./Subscriber";

type scoreboardUpdateMessage =
    | ShotOutMessage
    | FoulOutMessage
    | FreeThrowOutMessage
    | QuarterEndOutMessage;

type FoulTracker = {
    firstHalfFouls: number;
    secondHalfFouls: number;
};

class Scoreboard implements Subscriber {
    private quarter: number = 1;
    awayPoints: number = 0;
    homePoints: number = 0;
    possessionArrow: Team;
    awayTimeouts: number;
    homeTimeouts: number;
    totalTimeouts: number;
    homeFouls: FoulTracker = { firstHalfFouls: 0, secondHalfFouls: 0 };
    awayFouls: FoulTracker = { firstHalfFouls: 0, secondHalfFouls: 0 };

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
        } else if (context.publisher === "quarterend") {
            this.handleQuarterEndUpdate(context as QuarterEndOutMessage);
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

    getHalf(): 1 | 2 {
        if (this.quarter <= 2) {
            return 1;
        } else {
            return 2;
        }
    }

    increaseFouls(team: Team) {
        if (this.getHalf() === 1) {
            if (team === Team.home) {
                this.homeFouls.firstHalfFouls += 1;
            } else {
                this.awayFouls.firstHalfFouls += 1;
            }
        } else {
            if (team === Team.home) {
                this.homeFouls.secondHalfFouls += 1;
            } else {
                this.awayFouls.secondHalfFouls += 1;
            }
        }
    }

    decreaseFouls(team: Team) {
        if (this.getHalf() === 1) {
            if (team === Team.home) {
                this.homeFouls.firstHalfFouls -= 1;
            } else {
                this.awayFouls.firstHalfFouls -= 1;
            }
        } else {
            if (team === Team.home) {
                this.homeFouls.secondHalfFouls -= 1;
            } else {
                this.awayFouls.secondHalfFouls -= 1;
            }
        }
    }

    handleFoulUpdate(context: FoulOutMessage) {
        if (context.type === "CREATE") {
            if (context.action.foulingPlayer.team === Team.home) {
                this.increaseFouls(Team.home);
            } else {
                this.increaseFouls(Team.away);
            }
        } else {
            if (context.action.foulingPlayer.team === Team.home) {
                this.decreaseFouls(Team.home);
            } else {
                this.decreaseFouls(Team.away);
            }
        }
    }

    handleQuarterEndUpdate(context: QuarterEndOutMessage) {
        if (context.type === "CREATE") {
            this.increaseQuarter();
        } else {
            this.decreaseQuarter();
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

    private increaseQuarter() {
        this.quarter += 1;
    }

    private decreaseQuarter() {
        this.quarter -= 1;
    }

    public getBonusString(team: Team): string {
        //TODO: need to implement
        return "";
    }
}

export { Scoreboard };
