import { observable, action, computed, reaction, makeObservable } from "mobx"

import { Action } from "./Action";
import { Player } from "../Player";

interface BlockImage {
    player: Player
}

class Block extends Action {
    blockingPlayer : Player;

    public constructor(blockingPlayer : Player) {
        super();
        makeObservable(this, {
            blockingPlayer: observable,
            removeStats: action,
            editBlockingPlayer: action,
            actionJSON: computed,
        })
        this.blockingPlayer = blockingPlayer;
    }

    public removeStats (): void {
    }

    public editBlockingPlayer(newBlockingPlayer : Player) {
        this.blockingPlayer = newBlockingPlayer;
    }


    get image() : BlockImage {
        return {
            player: this.blockingPlayer
        }
    }
    get actionJSON (): Object {
        return {
            "action" : "block",
            "actionId": this.actionId,
            "blockingPlayerId" : this.blockingPlayer.playerId,
        }
    }
    
}

export {Block}
export type {BlockImage}