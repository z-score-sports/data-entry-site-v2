import { observable, action, computed, reaction, makeObservable } from "mobx"

import { Player } from "../Player";
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

    get actionJSON (): Object {
        return {
            "action": "assist",
            "actionId": this.actionId,
            "assistingPlayerId": this.assistingPlayer.playerId,
        }
    }
    
}

export {Assist}
