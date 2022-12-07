import { makeAutoObservable } from "mobx";
import { Action } from "./actions/Action";
import { Assist } from "./actions/Assist";
import { Block } from "./actions/Block";
import { Foul } from "./actions/Foul";
import { FreeThrow } from "./actions/FreeThrow";
import { PossessionEnd } from "./actions/PossessionEnd";
import { QuarterEnd } from "./actions/QuarterEnd";
import { Rebound } from "./actions/Rebound";
import { region, Shot } from "./actions/Shot";
import { Substitution } from "./actions/Substitution";
import { Steal, Turnover } from "./actions/Turnover";
import { GameContext } from "./GameState";
import { GameTime } from "./GameTime";
import { Team } from "./Player";

// TODO: Need to test and validate each action

class ActionStack {
    // validation is done here
    curPos: Team;
    mainStack: Action[] = [];
    undoStack: Action[] = [];

    constructor(startPos: Team) {
        makeAutoObservable(this, {
            undoStack: false,
        });

        this.curPos = startPos;
    }

    addAssist(assistingPlayerNumber: number) {
        /*
        Conditions: 
            1) Shot is found before last end possession
            2) The latest shot was made
        */
        let player = GameContext.gameRoster
            .getRoster(this.curPos)
            .getPlayer(assistingPlayerNumber);

        if (!player || !player.inGame) {
            return;
        }

        let validShotFound: boolean = false;
        for (let index = this.mainStack.length - 1; index >= 0; index--) {
            let action = this.mainStack[index];
            if (action instanceof PossessionEnd) {
                return;
            } else if (action instanceof Shot) {
                if (!action.made) {
                    return;
                } else {
                    validShotFound = true;
                    break;
                }
            }
        }
        if (!validShotFound) {
            return;
        } // handles case where it reaches the end

        let newAssist = new Assist(player);
        newAssist.createNotify();
        this.mainStack.push(newAssist);
        this.undoStack = [];
    }

    addBlock(blockingPlayerNumber: number) {
        /*
        Conditions: 
            1) Shot is found before last end possession
            2) The latest shot was missed
        */
        let player = GameContext.gameRoster
            .getRoster(this.curPos)
            .getPlayer(blockingPlayerNumber);

        if (!player || !player.inGame) {
            return;
        }

        let validShotFound: boolean = false;
        for (let index = this.mainStack.length - 1; index >= 0; index--) {
            let action = this.mainStack[index];
            if (action instanceof PossessionEnd) {
                return;
            } else if (action instanceof Shot) {
                if (action.made) {
                    return;
                } else {
                    validShotFound = true;
                    break;
                }
            }
        }
        if (!validShotFound) {
            return;
        } // handles case where it reaches the end

        let newBlock = new Block(player);
        newBlock.createNotify();
        this.mainStack.push(newBlock);
        this.undoStack = [];
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
        /*
        Conditions: 
            1) Foul action is found before the last endPosession
            2) foul is committed by the defense
            3) shooting player is on the offense
        */

        let player = GameContext.gameRoster
            .getRoster(this.curPos)
            .getPlayer(shootingPlayerNumber);

        if (!player || !player.inGame) {
            return;
        }

        let validFoulFound: boolean = false;
        for (let index = this.mainStack.length - 1; index >= 0; index--) {
            let action = this.mainStack[index];
            if (action instanceof PossessionEnd) {
                return;
            } else if (action instanceof Foul) {
                if (action.foulingPlayer.team === this.curPos) {
                    // if shooter on the same team as fouler
                    return;
                } else {
                    validFoulFound = true;
                    break;
                }
            }
        }
        if (!validFoulFound) {
            return;
        } // handles case where it reaches the end

        let newFreeThrow = new FreeThrow(player, made);
        newFreeThrow.createNotify();
        this.mainStack.push(newFreeThrow);
        this.undoStack = [];
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

        let newRebound = new Rebound(player);
        newRebound.createNotify();
        this.mainStack.push(newRebound);
        this.undoStack = [];
    }

    addShot(shootingPlayerNumber: number, region: region, made: boolean) {
        let player = GameContext.gameRoster
            .getRoster(this.curPos)
            .getPlayer(shootingPlayerNumber);
        //conditions: shooter exists and is in the game
        if (!player || !player.inGame) {
            return;
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
        // may update to take inputs of quarter, minute, second
        /*
        Conditions: None
        */

        let pGI = GameContext.gameRoster
            .getRoster(team)
            .getPlayer(playerNumGoingIn);
        let pGO = GameContext.gameRoster
            .getRoster(team)
            .getPlayer(playerNumGoingOut);

        let newSubstitution = new Substitution(pGI, pGO, gameTime);
        newSubstitution.createNotify();
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
        }
        action.createNotify();
        this.mainStack.push(action);
    }

    convertStackToStringList() {
        let ret: string[] = [];

        this.mainStack.forEach((action) => {
            ret.push(action.actionString);
        });
        return ret;
    }
}

export { ActionStack };
