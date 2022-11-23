import { observable, action, computed, reaction, makeObservable } from "mobx"

import { Player } from "../Player";
import { ReboundPublisher } from "../publishers/ReboundPublisher";
import { Action } from "./Action";


class Rebound extends Action {
    reboundingPlayer : Player;
    

    public constructor(reboundingPlayer : Player) {
        super();
        makeObservable(this, {
            reboundingPlayer: observable,
            actionJSON: computed

        })
        this.reboundingPlayer = reboundingPlayer;
        ReboundPublisher.getInstance().notify({
            type: "CREATE",
            action: this
        })

    }

    remove() {
        ReboundPublisher.getInstance().notify({
            type: "DELETE",
            action: this
        })
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
