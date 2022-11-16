import { observable, action, computed, reaction } from "mobx"

import { Player } from "../Player";
import { Action } from "./Action";
import { FreeThrow } from "./FreeThrow";


class Foul extends Action {
    @observable foulingPlayer : Player;
    @observable freeThrows : Array<FreeThrow> = Array<FreeThrow>();
    

    constructor(foulingPlayer:Player) {
        super();
        this.foulingPlayer = foulingPlayer;
        this.foulingPlayer.addFoul();

    }

    @action removeStats (): void {
        this.freeThrows.forEach((freeThrow : FreeThrow) => {
            freeThrow.removeStats();
        })
        this.foulingPlayer.removeFoul();
    }

    @action addFreeThrow(shootingPlayer:Player, made:boolean) {
        let freeThrow : FreeThrow = new FreeThrow(shootingPlayer, made);
        this.freeThrows.push(freeThrow)
    }

    @action removeFreeThrow() {
        // NOTE: this only removes the last free throw that was attempted
        // in the future, we should be able to remove by id
        let lastFreeThrow : FreeThrow = this.freeThrows.pop()
        lastFreeThrow.removeStats();
        
    }

    @action editFoulingPlayer(newFoulingPlayer : Player) {
        this.foulingPlayer.removeFoul();
        this.foulingPlayer = newFoulingPlayer;
        this.foulingPlayer.addFoul();
    }

    @action getLastFreeThrow() : FreeThrow {
        if(this.freeThrows.length === 0) {
            return null;
        }
        return this.freeThrows[this.freeThrows.length-1]
    }

    @computed actionJSON (): Object {
        return {
            "action": "foul",
            "actionId": this.actionId,
            "foulingPlayerId": this.foulingPlayer.playerId,
            "freeThrows": this.freeThrows.toString(),
            
        }
    }
    
}


export {Foul}