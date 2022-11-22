import { observable, action, computed, reaction, makeObservable } from "mobx"

import { GameTime, Player } from "../Player";
import { Action } from "./Action";

class Substitution extends Action {
    playerGoingIn : Player;
    playerGoingOut : Player;
    gameTime : GameTime

    public constructor(playerGoingIn : Player, playerGoingOut : Player, gameTime : GameTime) {
        super();
        makeObservable(this, {
            playerGoingIn: observable,
            playerGoingOut: observable,
            gameTime: observable,
            actionJSON : computed,
        })
        this.playerGoingIn = playerGoingIn
        this.playerGoingOut = playerGoingOut
        this.gameTime = gameTime
    }

    get actionJSON (): Object {
        return {
            "action": "substitution",
            "actionId": this.actionId,
            "playerIdGoingIn": this.playerGoingIn.playerId,
            "playerIdGoingOut": this.playerGoingOut.playerId,
            // need to put GameTime string
        }
    }
    
}

export {Substitution}
