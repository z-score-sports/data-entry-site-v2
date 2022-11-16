import { observable, action, computed, reaction, makeObservable } from "mobx"

import { Action } from "./Action";
import { Player } from "../Player";



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
        this.blockingPlayer.addBlock();
    }

    public removeStats (): void {
        this.blockingPlayer.removeBlock();
    }

    public editBlockingPlayer(newBlockingPlayer : Player) {
        this.blockingPlayer.removeBlock();
        this.blockingPlayer = newBlockingPlayer;
        this.blockingPlayer.addBlock();
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