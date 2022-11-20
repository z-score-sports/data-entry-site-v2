import { observable, action, computed, reaction, makeObservable } from "mobx"

import { Player } from "../Player";
import { Action } from "./Action";
import { FreeThrow } from "./FreeThrow";

interface FoulImage {
    player: Player
}

class Foul extends Action {
    foulingPlayer : Player;
    freeThrows : Array<FreeThrow> = Array<FreeThrow>();
    

    constructor(foulingPlayer:Player) {
        super();
        makeObservable(this, {
            foulingPlayer: observable,
            freeThrows: observable,
            removeStats: action,
            addFreeThrow: action,
            removeFreeThrow: action,
            editFoulingPlayer: action,
            lastFreeThrow: computed,
            actionJSON: computed,
            
        })
        this.foulingPlayer = foulingPlayer;
        this.foulingPlayer.addFoul();

    }

    removeStats (): void {
        this.freeThrows.forEach((freeThrow : FreeThrow) => {
            freeThrow.removeStats();
        })
        this.foulingPlayer.removeFoul();
    }

    addFreeThrow(shootingPlayer:Player, made:boolean) {
        let freeThrow : FreeThrow = new FreeThrow(shootingPlayer, made);
        this.freeThrows.push(freeThrow)
    }

    removeFreeThrow() {
        // NOTE: this only removes the last free throw that was attempted
        // in the future, we should be able to remove by id
        let lastFreeThrow : FreeThrow = this.freeThrows.pop()
        lastFreeThrow.removeStats();
        
    }

    editFoulingPlayer(newFoulingPlayer : Player) {
        this.foulingPlayer.removeFoul();
        this.foulingPlayer = newFoulingPlayer;
        this.foulingPlayer.addFoul();
    }

    get lastFreeThrow() : FreeThrow {
        if(this.freeThrows.length === 0) {
            return null;
        }
        return this.freeThrows[this.freeThrows.length-1]
    }

    get image() : FoulImage {
        return {
            player: this.foulingPlayer
        }
    }

    get actionJSON (): Object {
        return {
            "action": "foul",
            "actionId": this.actionId,
            "foulingPlayerId": this.foulingPlayer.playerId,
            "freeThrows": this.freeThrows.toString(),
            
        }
    }
    
}


export {Foul}
export type {FoulImage}