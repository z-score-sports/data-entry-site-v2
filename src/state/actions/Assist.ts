import { observable, action, computed, reaction, makeObservable } from "mobx"

import { Player } from "../Player";
import { Action } from "./Action";

interface AssistImage {
    player: Player
}
class Assist extends Action {
    assistingPlayer : Player;
    

    public constructor(assistingPlayer : Player) {
        super();
        makeObservable(this, {
            assistingPlayer: observable,
            removeStats: action,
            editAssistingPlayer : action,
            actionJSON : computed,
        })
        this.assistingPlayer = assistingPlayer;
        this.assistingPlayer.addAssist();
    }

    public removeStats (): void {
        this.assistingPlayer.removeAssist();
    }

    public editAssistingPlayer(newAssistingPlayer : Player) {
        this.assistingPlayer.removeAssist();
        this.assistingPlayer = newAssistingPlayer;
        this.assistingPlayer.addAssist();
    }


    get image() : AssistImage {
        return {
            player: this.assistingPlayer
        }
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
export type {AssistImage}