import { observable, computed, makeObservable } from "mobx"

import { Action } from "./Action";
import { Player } from "../Player";
import { BlockPublisher } from "../publishers/BlockPublisher";

class Block extends Action {
    blockingPlayer : Player;

    public constructor(blockingPlayer : Player) {
        super();
        makeObservable(this, {
            blockingPlayer: observable,
            actionJSON: computed,
        })
        this.blockingPlayer = blockingPlayer;
    }

    createNotify (): void {
        BlockPublisher.getInstance().notify({
            type: "CREATE",
            action: this
        })
    }

    deleteNotify (): void {
        BlockPublisher.getInstance().notify({
            type: "DELETE",
            action: this
        })
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
