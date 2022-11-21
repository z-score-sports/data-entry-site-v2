import { observable, action, computed, reaction, makeObservable } from "mobx"

import { Player } from "../Player";
import { ReboundPublisher } from "../publishers/RebounPublisher";
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
        
        ReboundPublisher.getInstance().notify(null, this.image);

    }

    removeStats (): void {
        ReboundPublisher.getInstance().notify(this.image, null);
    }

    editPlayer(newPlayer : Player) {
        let oldImage = this.image;
        this.reboundingPlayer = newPlayer;
        let newImage = this.image;
        ReboundPublisher.getInstance().notify(oldImage, newImage);
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