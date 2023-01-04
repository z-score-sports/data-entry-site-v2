import { makeAutoObservable } from "mobx";
import { Action } from "./actions/Action";
import { Assist } from "./actions/Assist";
import { Block } from "./actions/Block";
import { Foul } from "./actions/Foul";
import { FreeThrow } from "./actions/FreeThrow";
import { Marking } from "./actions/Marking";
import { PossessionEnd } from "./actions/PossessionEnd";
import { QuarterEnd } from "./actions/QuarterEnd";
import { Rebound } from "./actions/Rebound";
import { region, Shot } from "./actions/Shot";
import { Substitution } from "./actions/Substitution";
import { Steal, Turnover } from "./actions/Turnover";
import { GameContext, markingMappings } from "./GameState";
import { GameTime } from "./GameTime";
import { Team } from "./Player";

// TODO: Need to test and validate each action

type PrimaryAction =
    | Shot
    | PossessionEnd
    | QuarterEnd
    | Substitution
    | Turnover
    | Foul;

class ActionStack {
    // validation is done here
    curPos: Team;
    mainStack: Action[] = [];
    undoStack: Action[] = [];
    gameTimes: GameTime[] = [];

    constructor(startPos: Team, startTime: GameTime) {
        makeAutoObservable(this, {
            undoStack: false,
        });
        this.gameTimes = [startTime];
        this.curPos = startPos;
    }

    getLastGameTime(): GameTime {
        return this.gameTimes[this.gameTimes.length - 1];
    }

    getDefense(): Team {
        return this.curPos === Team.home ? Team.away : Team.home;
    }

    addMarking(markingNumber: number) {
        if (markingNumber < 0 || markingNumber >= markingMappings.length) {
            return;
        }

        let newMarking = new Marking(markingNumber);
        newMarking.createNotify();
        this.mainStack.push(newMarking);
        this.undoStack = [];
    }

    addAssist(assistingPlayerNumber: number) {
        /*
        Conditions: 
            1) Shot is found before last end possession
            2) Assist is not found before the shot
            3) The latest shot was made
        */
        let player = GameContext.gameRoster
            .getRoster(this.curPos)
            .getPlayer(assistingPlayerNumber);

        if (!player || !player.inGame) {
            return;
        }

        for (let index = this.mainStack.length - 1; index >= 0; index--) {
            let action = this.mainStack[index];
            if (action instanceof PossessionEnd || action instanceof Assist) {
                return;
            } else if (action instanceof Shot) {
                if (!action.made || action.shootingPlayer === player) {
                    return;
                } else {
                    let newAssist = new Assist(player);
                    newAssist.createNotify();
                    this.mainStack.push(newAssist);
                    this.undoStack = [];
                }
            }
        }
    }

    addBlock(blockingPlayerNumber: number) {
        let player = GameContext.gameRoster
            .getRoster(this.getDefense())
            .getPlayer(blockingPlayerNumber);

        if (!player || !player.inGame) {
            return;
        }

        for (let index = this.mainStack.length - 1; index >= 0; index--) {
            let action = this.mainStack[index];
            if (action instanceof PossessionEnd) {
                return;
            } else if (action instanceof Shot) {
                if (action.made) {
                    return;
                } else {
                    let newBlock = new Block(player);
                    newBlock.createNotify();
                    this.mainStack.push(newBlock);
                    this.undoStack = [];
                    return;
                }
            }
        }
    }

    addFoul(foulingPlayerNumber: number, foulingTeam: Team) {
        /*
        Conditions: None
        */

        let player = GameContext.gameRoster
            .getRoster(foulingTeam)
            .getPlayer(foulingPlayerNumber);
        if (!player || !player.inGame) {
            return;
        }

        let newFoul = new Foul(player);
        newFoul.createNotify();
        this.mainStack.push(newFoul);
        this.undoStack = [];
    }

    addFreeThrow(shootingPlayerNumber: number, made: boolean) {
        let player = GameContext.gameRoster
            .getRoster(this.curPos)
            .getPlayer(shootingPlayerNumber);

        if (!player || !player.inGame) {
            return;
        }

        for (let index = this.mainStack.length - 1; index >= 0; index--) {
            let action = this.mainStack[index];
            if (
                action instanceof PossessionEnd ||
                action instanceof QuarterEnd ||
                action instanceof Substitution
            ) {
                continue;
            } else if (
                (action instanceof Foul &&
                    action.foulingPlayer.team === this.getDefense()) ||
                (action instanceof FreeThrow &&
                    action.shootingPlayer === player)
            ) {
                let newFreeThrow = new FreeThrow(player, made);
                newFreeThrow.createNotify();
                this.mainStack.push(newFreeThrow);
                this.undoStack = [];
                return;
            } else {
                return;
            }
        }
    }

    addPossessionEnd() {
        let newPosEnd = new PossessionEnd();
        newPosEnd.createNotify();
        this.mainStack.push(newPosEnd);
        this.curPos = this.curPos === Team.home ? Team.away : Team.home; // just flips the possession
        this.undoStack = [];
    }

    addRebound(reboundingPlayerNumber: number, team: Team) {
        /*
        Conditions: 
            1) Shot is found before last end possession
            2) The latest shot was missed
        */

        let player = GameContext.gameRoster
            .getRoster(team)
            .getPlayer(reboundingPlayerNumber);
        if (!player || !player.inGame) {
            return;
        }

        for (let index = this.mainStack.length - 1; index >= 0; index--) {
            let action = this.mainStack[index];
            if (action instanceof PossessionEnd || action instanceof Rebound) {
                return;
            } else if (action instanceof Shot || action instanceof FreeThrow) {
                if (action.made) {
                    return;
                } else {
                    let newRebound = new Rebound(player);
                    newRebound.createNotify();
                    this.mainStack.push(newRebound);
                    this.undoStack = [];
                    return;
                }
            }
        }
    }

    addShot(shootingPlayerNumber: number, region: region, made: boolean) {
        // Can't add shot if there exists a made shot on the current possession
        let player = GameContext.gameRoster
            .getRoster(this.curPos)
            .getPlayer(shootingPlayerNumber);
        //conditions: shooter exists and is in the game
        if (!player || !player.inGame) {
            return;
        }
        console.log("Shot being added");
        for (let index = this.mainStack.length - 1; index >= 0; index--) {
            let action = this.mainStack[index];
            if (action instanceof Shot && action.made) {
                return;
            } else if (action instanceof PossessionEnd) {
                break;
            }
        }

        let newShot = new Shot(player, region, made);
        newShot.createNotify();
        this.mainStack.push(newShot);
        this.undoStack = [];
    }

    addSubstitution(
        team: Team,
        playerNumGoingIn: number,
        playerNumGoingOut: number,
        gameTime: GameTime
    ) {
        // Assumption: 1 player in for 1 player, no single subs

        let pGI = GameContext.gameRoster
            .getRoster(team)
            .getPlayer(playerNumGoingIn);

        let pGO = GameContext.gameRoster
            .getRoster(team)
            .getPlayer(playerNumGoingOut);

        if (
            !pGO ||
            !pGI ||
            !pGO.inGame ||
            pGI.inGame ||
            !this.getLastGameTime().lte(gameTime)
        ) {
            return;
        }

        let newSubstitution = new Substitution(pGI, pGO, gameTime);

        newSubstitution.createNotify();
        this.gameTimes.push(gameTime);
        this.mainStack.push(newSubstitution);
        this.undoStack = [];
    }

    addTurnover(offensivePlayerNumber: number) {
        let offensivePlayer = GameContext.gameRoster
            .getRoster(this.curPos)
            .getPlayer(offensivePlayerNumber);
        //conditions: shooter exists and is in the game
        if (!offensivePlayer || !offensivePlayer.inGame) {
            return;
        }

        let newTurnover = new Turnover(offensivePlayer);
        newTurnover.createNotify();
        this.mainStack.push(newTurnover);
        this.undoStack = [];
    }

    addSteal(offensivePlayerNumber: number, defensivePlayerNumber: number) {
        let offensivePlayer = GameContext.gameRoster
            .getRoster(this.curPos)
            .getPlayer(offensivePlayerNumber);
        if (!offensivePlayer || !offensivePlayer.inGame) {
            return;
        }

        let defense = this.curPos === Team.home ? Team.away : Team.home;

        let defensivePlayer = GameContext.gameRoster
            .getRoster(defense)
            .getPlayer(defensivePlayerNumber);
        if (!defensivePlayer || !defensivePlayer.inGame) {
            return;
        }

        let newSteal = new Steal(offensivePlayer, defensivePlayer);
        newSteal.createNotify();
        this.mainStack.push(newSteal);
        this.undoStack = [];
    }

    addQuarterEnd() {
        // Can't undo past a quarter end
        if (
            !(
                this.mainStack[this.mainStack.length - 1] instanceof
                PossessionEnd
            )
        ) {
            this.addPossessionEnd();
        }
        let newQuarterEnd = new QuarterEnd();
        newQuarterEnd.createNotify();
        this.mainStack.push(newQuarterEnd);
        this.undoStack = [];
    }

    undo(): void {
        if (this.mainStack.length === 0) {
            return;
        }

        let action = this.mainStack.pop();
        if (action instanceof PossessionEnd) {
            this.curPos = this.curPos === Team.home ? Team.away : Team.home; // just flips the possession
        } else if (action instanceof Substitution) {
            this.gameTimes.pop();
        }
        action.deleteNotify();
        this.undoStack.push(action);
    }

    redo(): void {
        if (this.undoStack.length === 0) {
            return;
        }

        let action = this.undoStack.pop();
        if (action instanceof PossessionEnd) {
            this.curPos = this.curPos === Team.home ? Team.away : Team.home; // just flips the possession
        } else if (action instanceof Substitution) {
            this.gameTimes.push(action.gameTime);
        }
        action.createNotify();
        this.mainStack.push(action);
    }

    getCurPossessionActions() {
        let ret: Action[] = [];
        for (let i = this.mainStack.length - 1; i >= 0; i--) {
            let curAction = this.mainStack[i];
            if (curAction instanceof PossessionEnd) {
                break;
            } else if (
                curAction instanceof Substitution ||
                curAction instanceof QuarterEnd
            ) {
                continue;
            }
            ret.push(this.mainStack[i]);
        }
        ret.reverse();
        return ret;
    }

    convertStackToStringList() {
        let ret: string[] = [];

        this.mainStack.forEach((action) => {
            ret.push(action.actionString);
        });
        return ret;
    }

    toJSON(): Object {
        let retJSON: object[] = this.mainStack.map((action, i) => ({
            id: i,
            ...action.actionJSON,
        }));
        return retJSON;
    }
}

export { ActionStack };
