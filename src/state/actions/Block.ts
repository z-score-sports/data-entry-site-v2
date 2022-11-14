import { observable, action, computed, reaction } from "mobx"

import { Action } from "./Action";
import { Player } from "../Player";



class Block extends Action {
    @observable blockingPlayer : Player;

    public constructor(blockingPlayer : Player) {
        super();
        this.blockingPlayer = blockingPlayer;
        this.blockingPlayer.addBlock();
    }

    @action public removeStats (): void {
        this.blockingPlayer.removeBlock();
    }

    @action public editBlockingPlayer(newBlockingPlayer : Player) {
        this.blockingPlayer.removeBlock();
        this.blockingPlayer = newBlockingPlayer;
        this.blockingPlayer.addBlock();
    }


    @computed public actionJSON (): Object {
        return {
            "action" : "block",
            "actionId": this.actionId,
            "blockingPlayerId" : this.blockingPlayer.playerId,
        }
    }
    
}

export {Block}