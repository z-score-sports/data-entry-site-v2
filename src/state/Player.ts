import { makeAutoObservable } from "mobx";
import { AssistOutMessage } from "./actions/Assist";
import { BlockOutMessage } from "./actions/Block";
import { FoulOutMessage } from "./actions/Foul";
import { FreeThrowOutMessage } from "./actions/FreeThrow";
import { ReboundOutMessage } from "./actions/Rebound";
import { ShotOutMessage } from "./actions/Shot";
import { SubstitutionOutMessage } from "./actions/Substitution";
import { Steal, Turnover, TurnoverOutMessage } from "./actions/Turnover";
import { GameTime } from "./GameTime";
import { ShotRegionTracker } from "./ShotTracker";
import { Subscriber } from "./Subscriber";

enum Team {
    home,
    away,
}

type GameInterval = {
    timeIn: GameTime;
    timeOut: GameTime;
};

type ShotData = {
    shotsMade: number;
    shotsAttempted: number;
};

type RegionShotData = {
    shotIndex: any;
    r1: ShotData;
    r2: ShotData;
    r3: ShotData;
    r4: ShotData;
    r5: ShotData;
    r6: ShotData;
    r7: ShotData;
    r8: ShotData;
    r9: ShotData;
};
type playerUpdateMessage =
    | ShotOutMessage
    | AssistOutMessage
    | BlockOutMessage
    | FoulOutMessage
    | FreeThrowOutMessage
    | ReboundOutMessage
    | TurnoverOutMessage
    | SubstitutionOutMessage;

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
    fouls: number = 0;
    blocks: number = 0;
    threePointersMade: number = 0;
    threePointersAttempted: number = 0;
    fgm: number = 0;
    fga: number = 0;
    ftm: number = 0;
    fta: number = 0;
    shotTracker = new ShotRegionTracker();
    steals: number = 0;
    turnovers: number = 0;

    lastTimeIn: GameTime = null;
    intervals: GameInterval[] = [];

    public constructor(
        playerId: string,
        num: number,
        firstName: string,
        lastName: string,
        team: Team,
        inGame: boolean
    ) {
        makeAutoObservable(this);
        this.playerId = playerId;
        this.num = num;
        this.firstName = firstName;
        this.lastName = lastName;
        this.team = team;
        this.inGame = inGame;
        if (this.inGame) {
            let startGameTime = new GameTime(1, 12, 0);
            this.lastTimeIn = startGameTime;
        }
    }

    get teamString() {
        if (this.team === Team.home) {
            return "Home";
        } else {
            return "Away";
        }
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
        } else if (context.publisher === "substitution") {
            this.handleSubstitutionUpdate(context as SubstitutionOutMessage);
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
                if (context.action.region >= 5) {
                    this.threePointersAttempted += 1;
                    if (context.action.made) {
                        this.threePointersMade += 1;
                    }
                }
                this.shotTracker.addShot(
                    context.action.made,
                    context.action.region
                );
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
                if (context.action.region >= 5) {
                    this.threePointersAttempted -= 1;
                    if (context.action.made) {
                        this.threePointersMade -= 1;
                    }
                }
                this.shotTracker.removeShot(
                    context.action.made,
                    context.action.region
                );
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

    private handleSubstitutionUpdate(context: SubstitutionOutMessage) {
        let gameTime: GameTime = context.action.gameTime;
        let pGI = context.action.playerGoingIn;
        let pGO = context.action.playerGoingOut;
        if (pGI.team !== pGO.team) {
            return;
        }
        if (context.type === "CREATE") {
            if (this === pGI) {
                this.inGame = true;
                this.addTimeIn(gameTime);
            } else if (this === pGO) {
                this.inGame = false;
                this.addTimeOut(gameTime);
            } else if (this.inGame) {
                this.addTimeIn(gameTime);
            }
        } else {
            if (this === pGI) {
                this.inGame = false;
                this.removeTimeNowOut();
            } else if (this === pGO) {
                this.inGame = true;
                this.removeTimeNowIn();
            } else if (this.inGame) {
                this.removeTimeNowIn();
            }
        }
    }

    private addTimeIn(gameTime: GameTime) {
        if (this.lastTimeIn !== null) {
            let newInterval: GameInterval = {
                timeIn: this.lastTimeIn,
                timeOut: gameTime,
            };
            this.intervals.push(newInterval);
            this.lastTimeIn = gameTime;
        } else {
            this.lastTimeIn = gameTime;
        }
    }

    private addTimeOut(gameTime: GameTime) {
        if (this.lastTimeIn !== null) {
            let newInterval: GameInterval = {
                timeIn: this.lastTimeIn,
                timeOut: gameTime,
            };
            this.intervals.push(newInterval);
            this.lastTimeIn = null;
        }
    }

    private removeTimeNowIn() {
        let lastInterval: GameInterval = this.intervals.pop();
        this.lastTimeIn = lastInterval.timeIn;
    }

    private removeTimeNowOut() {
        this.lastTimeIn = null;
    }

    get playerMinutes() {
        let sum: number = 0;
        this.intervals.forEach((interval: GameInterval) => {
            sum += interval.timeIn.minutesBetween(interval.timeOut);
        });

        return sum;
    }
}

export { Player, Team };

