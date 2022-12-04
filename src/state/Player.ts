import { makeAutoObservable } from "mobx";
import { AssistOutMessage } from "./actions/Assist";
import { BlockOutMessage } from "./actions/Block";
import { FoulOutMessage } from "./actions/Foul";
import { FreeThrowOutMessage } from "./actions/FreeThrow";
import { ReboundOutMessage } from "./actions/Rebound";
import { ShotOutMessage } from "./actions/Shot";
import { SubstitutionOutMessage } from "./actions/Substitution";
import { Steal, Turnover, TurnoverOutMessage } from "./actions/Turnover";
import { Subscriber } from "./Subscriber";

enum Team {
    home,
    away,
}

type playerUpdateMessage =
    | ShotOutMessage
    | AssistOutMessage
    | BlockOutMessage
    | FoulOutMessage
    | FreeThrowOutMessage
    | ReboundOutMessage
    | TurnoverOutMessage;

class Player implements Subscriber {
    playerId: string;
    num: number;
    firstName: string;
    lastName: string;
    team: Team;
    inGame: boolean = false;
    points: number = 0;
    rebounds: number = 0;
    assists: number = 0;
    plusminus: number = 0;
    minutes: number = 0;
    fouls: number = 0;
    blocks: number = 0;
    threePointers: number = 0;
    fgm: number = 0;
    fga: number = 0;
    ftm: number = 0;
    fta: number = 0;
    steals: number = 0;
    turnovers: number = 0;

    public constructor(
        playerId: string,
        num: number,
        firstName: string,
        lastName: string,
        team: Team
    ) {
        makeAutoObservable(this);
        this.playerId = playerId;
        this.num = num;
        this.firstName = firstName;
        this.lastName = lastName;
        this.team = team;
    }

    update(context: playerUpdateMessage) {
        if (context.publisher === "assist") {
            this.handleAssistUpdate(context as AssistOutMessage);
        } else if (context.publisher === "block") {
            this.handleBlockUpdate(context as BlockOutMessage);
        } else if (context.publisher === "foul") {
            this.handleFoulUpdate(context as FoulOutMessage);
        } else if (context.publisher === "freethrow") {
            this.handleFreeThrowUpdate(context as FreeThrowOutMessage);
        } else if (context.publisher === "rebound") {
            this.handleReboundUpdate(context as ReboundOutMessage);
        } else if (context.publisher === "shot") {
            this.handleShotUpdate(context as ShotOutMessage);
        } else if (context.publisher === "turnover") {
            this.handleTurnoverUpdate(context as TurnoverOutMessage);
        }
    }

    private handleAssistUpdate(context: AssistOutMessage) {
        if (
            context.action.assistingPlayer === this &&
            context.type === "CREATE"
        ) {
            this.assists += 1;
        } else if (
            context.action.assistingPlayer === this &&
            context.type === "DELETE"
        ) {
            this.assists -= 1;
        }
    }

    private handleBlockUpdate(context: BlockOutMessage) {
        if (
            context.action.blockingPlayer === this &&
            context.type === "CREATE"
        ) {
            this.blocks += 1;
        } else if (
            context.action.blockingPlayer === this &&
            context.type === "DELETE"
        ) {
            this.blocks -= 1;
        }
    }

    private handleFoulUpdate(context: FoulOutMessage) {
        if (
            context.action.foulingPlayer === this &&
            context.type === "CREATE"
        ) {
            this.fouls += 1;
        } else if (
            context.action.foulingPlayer === this &&
            context.type === "DELETE"
        ) {
            this.fouls -= 1;
        }
    }

    private handleFreeThrowUpdate(context: FreeThrowOutMessage) {
        // need to update points, fta, ftm, and +/-
        if (context.type === "CREATE") {
            if (context.action.shootingPlayer === this) {
                if (context.action.made) {
                    this.points += 1;
                    this.ftm += 1;
                }
                this.fta += 1;
            }
            if (context.action.made && this.inGame) {
                if (context.action.shootingPlayer.team === this.team) {
                    this.plusminus += 1;
                } else {
                    this.plusminus -= 1;
                }
            }
        } else if (context.type === "DELETE") {
            if (context.action.shootingPlayer === this) {
                if (context.action.made) {
                    this.points -= 1;
                    this.ftm -= 1;
                }
                this.fta -= 1;
            }
            if (context.action.made && this.inGame) {
                if (context.action.shootingPlayer.team === this.team) {
                    this.plusminus -= 1;
                } else {
                    this.plusminus += 1;
                }
            }
        }
    }

    private handleReboundUpdate(context: ReboundOutMessage) {
        if (
            context.action.reboundingPlayer === this &&
            context.type === "CREATE"
        ) {
            this.rebounds += 1;
        } else if (
            context.action.reboundingPlayer === this &&
            context.type === "DELETE"
        ) {
            this.rebounds -= 1;
        }
    }

    private handleShotUpdate(context: ShotOutMessage) {
        // points, fgm, fga, 3pt, +-,
        let points: number = context.action.shotPoints;
        if (context.type === "CREATE") {
            if (context.action.shootingPlayer === this) {
                this.points += points;
                this.fgm += points > 0 ? 1 : 0;
                this.fga += 1;
                if (context.action.region >= 5 && context.action.made) {
                    this.threePointers += 1;
                }
            }
            if (this.inGame) {
                if (context.action.shootingPlayer.team === this.team) {
                    this.plusminus += points;
                } else {
                    this.plusminus -= points;
                }
            }
        } else {
            if (context.action.shootingPlayer === this) {
                this.points -= points;
                this.fgm -= points > 0 ? 1 : 0;
                this.fga -= 1;
                if (context.action.region >= 5 && context.action.made) {
                    this.threePointers -= 1;
                }
            }
            if (this.inGame) {
                if (context.action.shootingPlayer.team === this.team) {
                    this.plusminus -= points;
                } else {
                    this.plusminus += points;
                }
            }
        }
    }

    private handleTurnoverUpdate(context: TurnoverOutMessage) {
        let action: Turnover = context.action;
        if (context.type === "CREATE") {
            if (action.offensivePlayer === this) {
                this.turnovers += 1;
            }
            if (action instanceof Steal && action.stealingPlayer === this) {
                this.steals += 1;
            }
        } else {
            if (context.action.offensivePlayer === this) {
                this.turnovers -= 1;
            }
            if (action instanceof Steal && action.stealingPlayer === this) {
                this.steals -= 1;
            }
        }
    }

    private handleSubstitutionUpdate(context: SubstitutionOutMessage) {}
}

export { Player, Team };
