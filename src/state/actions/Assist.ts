import { observable, action, computed, reaction } from "mobx"

import { Player } from "../Player";
import { Action } from "./Action";


class Assist extends Action {
    @observable assistingPlayer : Player;
    

    public constructor(assistingPlayer : Player) {
        super();
        this.assistingPlayer = assistingPlayer;
        this.assistingPlayer.addAssist();
    }

    @action public removeStats (): void {
        this.assistingPlayer.removeAssist();
    }

    @action public editAssistingPlayer(newAssistingPlayer : Player) {
        this.assistingPlayer.removeAssist();
        this.assistingPlayer = newAssistingPlayer;
        this.assistingPlayer.addAssist();
    }


    @computed actionJSON (): Object {
        return {
            "action": "assist",
            "actionId": this.actionId,
            "assistingPlayerId": this.assistingPlayer.playerId,
        }
    }
    
}

export {Assist}