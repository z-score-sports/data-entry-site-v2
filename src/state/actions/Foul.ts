import { observable, action, computed, reaction, makeObservable } from "mobx"

import { Player } from "../Player";
import { Action } from "./Action";

class Foul extends Action {
    foulingPlayer : Player;    

    constructor(foulingPlayer:Player) {
        super();
        makeObservable(this, {
            foulingPlayer: observable,
            actionJSON: computed,
            
        })
        this.foulingPlayer = foulingPlayer;

    }

    get actionJSON (): Object {
        return {
            "action": "foul",
            "actionId": this.actionId,
            "foulingPlayerId": this.foulingPlayer.playerId,            
        }
    }
    
}


export {Foul}
