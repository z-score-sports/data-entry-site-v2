import { Action } from "./actions/Action";
import { region, Shot } from "./actions/Shot";
import { Team } from "./Player";
import { GameRoster } from "./Roster";

interface IStack<T> {
    push(item: T) : void;
    pop() : T | undefined;
    peek() : T | undefined;
    size() : number
    clear() : void;
}

class Stack<T> implements IStack<T> {
    private storage: T[] = [];

    push(item: T): void {
        this.storage.push(item);
    }

    pop(): T | undefined {
        return this.storage.pop();
    }

    peek(): T | undefined {
        return this.storage[this.size() - 1];
    }

    size(): number {
        return this.storage.length
    }

    clear() : void {
        this.storage = [];
    }

}

class ActionStack {

    // validation is done here
    curPos : Team;
    gameRoster : GameRoster
    mainStack : Stack<Action> = new Stack<Action>();
    undoStack : Stack<Action> = new Stack<Action>();

    constructor(gameRoster : GameRoster, startPos : Team) {
        this.gameRoster = gameRoster
        this.curPos = startPos
    }

    addAssist() {
        /*
        Conditions: 
            1) Shot is found before last end possession
            2) The latest shot was made
            3) assisting player is on the same team as the shooting player
        */

        this.undoStack.clear()

    }

    addBlock() {
        /*
        Conditions: 
            1) Shot is found before last end possession
            2) The latest shot was missed
        */

        this.undoStack.clear()
    }

    addFoul() {
        /*
        Conditions: None
        */
        this.undoStack.clear()
    }

    addFreeThrow() {
        /*
        Conditions: 
            1) Foul action is found before the last endPosession
        */
        this.undoStack.clear()
    }

    addPossessionEnd() {
        /*
        Conditions: None
        */
        this.undoStack.clear()
    }

    addQuarterEnd() {
        /*
        Conditions: None, but if the last action isn't a end possession, add an end possession action too
        */
        this.undoStack.clear()
    }

    addRebound() {
        /*
        Conditions: 
            1) Shot is found before last end possession
            2) The latest shot was missed
        */
        this.undoStack.clear()
    }

    addShot(shootingPlayerNumber:number, region:region, made:boolean) {

        let player = this.gameRoster.getRoster(this.curPos).getPlayer(shootingPlayerNumber)
        //conditions: shooter exists and is in the game
        if(!player || !player.inGame){return;}
        
        let newShot = new Shot(player, region, made)
        newShot.createNotify();
        this.mainStack.push(newShot)
        this.undoStack.clear()
    }

    addSubstitution() {
        /*
        Conditions: None
        */
        this.undoStack.clear()
    }

    addTurnover() {
        this.undoStack.clear()
    }

    addSteal() {
        this.undoStack.clear()
    }

    undo() : void {
        if(this.mainStack.size() === 0) {
            return
        }

        let action = this.mainStack.pop();
        action.deleteNotify();
        this.undoStack.push(action);

    }

    redo() : void {
        if(this.undoStack.size() === 0){
            return
        }

        let action = this.undoStack.pop();
        action.createNotify();
        this.mainStack.push(action);

    }



}

export {ActionStack, Stack}