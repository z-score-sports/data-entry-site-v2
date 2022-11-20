import { observable, action, computed, reaction, makeObservable } from "mobx"

import { Player } from "../Player";
import { Action } from "./Action";

interface ReboundImage {
    player: Player
}

class Rebound extends Action {
    reboundingPlayer : Player;
    

    public constructor(reboundingPlayer : Player) {
        super();
        makeObservable(this, {
            reboundingPlayer: observable,
            removeStats: action,
            editPlayer: action,
            actionJSON: computed

        })
        this.reboundingPlayer = reboundingPlayer;
        this.reboundingPlayer.addRebound();

    }

    removeStats (): void {
        this.reboundingPlayer.removeRebound();
    }

    editPlayer(newPlayer : Player) {
        this.reboundingPlayer.removeRebound();
        this.reboundingPlayer = newPlayer;
        this.reboundingPlayer.addRebound();
    }

    get image() :ReboundImage {
        return {
            player: this.reboundingPlayer
        }
    }

    get actionJSON (): Object {
        return {
            "action": "rebound",
            "actionId": this.actionId,
            "reboundingPlayerId": this.reboundingPlayer.playerId,
        }
    }
    
}

export {Rebound}
export type {ReboundImage}