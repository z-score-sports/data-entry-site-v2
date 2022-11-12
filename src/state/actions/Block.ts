import { Action } from "./Action";
import { Player } from "../Player";



class Block extends Action {
    public blockingPlayer : Player;

    public constructor(blockingPlayer : Player) {
        super();
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


    public actionJSON (): Object {
        return {
            "action" : "block",
            "actionId": this.actionId,
            "blockingPlayerId" : this.blockingPlayer.playerId,
        }
    }
    
}

export {Block}