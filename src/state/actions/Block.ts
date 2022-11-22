import { observable, action, computed, reaction, makeObservable } from "mobx"

import { Action } from "./Action";
import { Player } from "../Player";

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

    get actionJSON (): Object {
        return {
            "action" : "block",
            "actionId": this.actionId,
            "blockingPlayerId" : this.blockingPlayer.playerId,
        }
    }
    
}

export {Block}
