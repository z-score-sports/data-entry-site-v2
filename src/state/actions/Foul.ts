import { Player } from "../Player";
import { Action } from "./Action";
import { FreeThrow } from "./FreeThrow";


class Foul extends Action {
    foulingPlayer : Player;
    freeThrows : Array<FreeThrow> = Array<FreeThrow>();
    

    constructor(foulingPlayer:Player) {
        super();
        this.foulingPlayer = foulingPlayer;
        this.foulingPlayer.addFoul();

    }

    public removeStats (): void {
        this.freeThrows.forEach((freeThrow : FreeThrow) => {
            freeThrow.removeStats();
        })
        this.foulingPlayer.removeFoul();
    }

    public addFreeThrow(shootingPlayer:Player, made:boolean) {
        let freeThrow : FreeThrow = new FreeThrow(shootingPlayer, made);
        this.freeThrows.push(freeThrow)
    }

    public removeFreeThrow() {
        // NOTE: this only removes the last free throw that was attempted
        // in the future, we should be able to remove by id
        let lastFreeThrow : FreeThrow = this.freeThrows.pop()
        lastFreeThrow.removeStats();
        
    }

    public editFoulingPlayer(newFoulingPlayer : Player) {
        this.foulingPlayer.removeFoul();
        this.foulingPlayer = newFoulingPlayer;
        this.foulingPlayer.addFoul();
    }



    actionJSON (): Object {
        return {
            "action": "foul",
            "actionId": this.actionId,
            "foulingPlayerId": this.foulingPlayer.playerId,
            "freeThrows": this.freeThrows.toString(),
            
        }
    }
    
}


export {Foul}