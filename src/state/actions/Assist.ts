import { observable, action, computed, reaction, makeObservable } from "mobx"

import { Player } from "../Player";
import { AssistPublisher } from "../publishers/AssistPublisher";
import { Action } from "./Action";

class Assist extends Action {
    assistingPlayer : Player;
    

    public constructor(assistingPlayer : Player) {
        super();
        makeObservable(this, {
            assistingPlayer: observable,
            actionJSON : computed,
        })
        this.assistingPlayer = assistingPlayer;

    }

    createNotify() {
        AssistPublisher.getInstance().notify({
            type: "CREATE",
            action: this
        })
    }

    deleteNotify () {
        AssistPublisher.getInstance().notify({
            type: "DELETE",
            action: this
        })
    }

    get actionJSON (): Object {
        return {
            "action": "assist",
            "actionId": this.actionId,
            "assistingPlayerId": this.assistingPlayer.playerId,
        }
    }
    
}

export {Assist}
