import { Action } from "./actions/Action";
import { Assist } from "./actions/Assist";
import { Block } from "./actions/Block";
import { PossessionEnd } from "./actions/PossessionEnd";
import { QuarterEnd } from "./actions/QuarterEnd";
import { region, Shot } from "./actions/Shot";
import { Steal, Turnover } from "./actions/Turnover";
import { Team } from "./Player";
import { GameRoster } from "./Roster";



class ActionStack {

    // validation is done here
    curPos : Team;
    gameRoster : GameRoster
    mainStack : Action[] = [];
    undoStack : Action[] = [];

    constructor(gameRoster : GameRoster, startPos : Team) {
        this.gameRoster = gameRoster
        this.curPos = startPos
    }

    addAssist(assistingPlayerNumber:number) {
        /*
        Conditions: 
            1) Shot is found before last end possession
            2) The latest shot was made
        */
        let player = this.gameRoster.getRoster(this.curPos).getPlayer(assistingPlayerNumber)

        if(!player || !player.inGame){return;}
        
        let validShotFound : boolean = false
        for (let index = this.mainStack.length-1; index >=  0; index--) {
            let action = this.mainStack[index]
            if(action instanceof PossessionEnd){
                return;
            } else if(action instanceof Shot){
                if(!action.made) {
                    return
                } else {
                    validShotFound = true
                    break
                }
            }
        }
        if(!validShotFound){return;} // handles case where it reaches the end

        let newAssist = new Assist(player);
        newAssist.createNotify();
        this.mainStack.push(newAssist)
        this.undoStack = [];

    }

    addBlock(blockingPlayerNumber:number) {
        /*
        Conditions: 
            1) Shot is found before last end possession
            2) The latest shot was missed
        */
        let player = this.gameRoster.getRoster(this.curPos).getPlayer(blockingPlayerNumber)

        if(!player || !player.inGame){return;}

        let validShotFound : boolean = false
        for (let index = this.mainStack.length-1; index >=  0; index--) {
            let action = this.mainStack[index]
            if(action instanceof PossessionEnd){
                return;
            } else if(action instanceof Shot){
                if(action.made) {
                    return
                } else {
                    validShotFound = true
                    break
                }
            }
        }
        if(!validShotFound){return;} // handles case where it reaches the end

        let newBlock = new Block(player);
        newBlock.createNotify();
        this.mainStack.push(newBlock)
        this.undoStack = [];
    }

    addFoul() {
        /*
        Conditions: None
        */
        this.undoStack = [];
    }

    addFreeThrow() {
        /*
        Conditions: 
            1) Foul action is found before the last endPosession
        */
        this.undoStack = [];
    }

    addPossessionEnd() {

        let newPosEnd = new PossessionEnd();
        newPosEnd.createNotify();
        this.mainStack.push(newPosEnd);
        this.curPos = this.curPos === Team.home ? Team.away : Team.home // just flips the possession        
        this.undoStack = [];
    }

    addRebound() {
        /*
        Conditions: 
            1) Shot is found before last end possession
            2) The latest shot was missed
        */
        this.undoStack = [];
    }

    addShot(shootingPlayerNumber:number, region:region, made:boolean) {

        let player = this.gameRoster.getRoster(this.curPos).getPlayer(shootingPlayerNumber)
        //conditions: shooter exists and is in the game
        if(!player || !player.inGame){return;}
        
        let newShot = new Shot(player, region, made)
        newShot.createNotify();
        this.mainStack.push(newShot)
        this.undoStack = [];
    }

    addSubstitution() {
        /*
        Conditions: None
        */
        this.undoStack = [];
    }

    addTurnover(offensivePlayerNumber:number) {

        let offensivePlayer = this.gameRoster.getRoster(this.curPos).getPlayer(offensivePlayerNumber)
        //conditions: shooter exists and is in the game
        if(!offensivePlayer || !offensivePlayer.inGame){return;}

        let newTurnover = new Turnover(offensivePlayer)
        newTurnover.createNotify();
        this.mainStack.push(newTurnover);
        this.undoStack = [];
    }

    addSteal(offensivePlayerNumber:number, defensivePlayerNumber:number) {
        
        let offensivePlayer = this.gameRoster.getRoster(this.curPos).getPlayer(offensivePlayerNumber)
        if(!offensivePlayer || !offensivePlayer.inGame){return;}

        let defense = this.curPos === Team.home ? Team.away : Team.home;
        
        let defensivePlayer = this.gameRoster.getRoster(defense).getPlayer(defensivePlayerNumber)
        if(!defensivePlayer || !defensivePlayer.inGame){return;}

        let newSteal = new Steal(offensivePlayer, defensivePlayer);
        newSteal.createNotify();
        this.mainStack.push(newSteal)
        this.undoStack = [];

    }

    undo() : void {
        if(this.mainStack.length === 0) {
            return
        }

        let action = this.mainStack.pop();
        if(action instanceof PossessionEnd){
            this.curPos = this.curPos === Team.home ? Team.away : Team.home // just flips the possession
        }
        action.deleteNotify();
        this.undoStack.push(action);

    }

    redo() : void {
        if(this.undoStack.length=== 0){
            return
        }

        let action = this.undoStack.pop();
        if(action instanceof PossessionEnd){
            this.curPos = this.curPos === Team.home ? Team.away : Team.home // just flips the possession
        }
        action.createNotify();
        this.mainStack.push(action);

    }



}

export {ActionStack}