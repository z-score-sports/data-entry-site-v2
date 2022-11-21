import { observable, action, computed, reaction, makeObservable } from "mobx"

import { Player } from "../Player";
import { AssistPublisher } from "../publishers/AssistPublisher";
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
        

        AssistPublisher.getInstance().notify(null, this.image);

    }

    public removeStats (): void {
        AssistPublisher.getInstance().notify(this.image, null);
    }

    public editAssistingPlayer(newAssistingPlayer : Player) {
        let oldImage = this.image
        this.assistingPlayer = newAssistingPlayer;
        let newImage = this.image;
        AssistPublisher.getInstance().notify(oldImage, newImage);
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