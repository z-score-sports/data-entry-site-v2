import { observable, action, computed, reaction, makeObservable } from "mobx"

import { Player } from "../Player";
import { Action } from "./Action";


enum ReboundType {
    offensive,
    defensive
} 

class Rebound extends Action {
    reboundingPlayer : Player;
    reboundType : ReboundType;

    

    public constructor(reboundingPlayer : Player, reboundType : ReboundType) {
        super();
        makeObservable(this, {
            reboundingPlayer: observable,
            reboundType: observable,
            removeStats: action,
            editPlayer: action,
            reboundTypeString: computed,
            actionJSON: computed

        })
        this.reboundingPlayer = reboundingPlayer;
        this.reboundType = reboundType; 
        this.reboundingPlayer.addRebound();

    }

    removeStats (): void {
        this.reboundingPlayer.removeRebound();
    }

    editPlayer(newPlayer : Player) {
        this.reboundingPlayer.removeRebound();
        if(newPlayer.team !== this.reboundingPlayer.team) {
            this.reboundType = this.reboundType === ReboundType.offensive ? ReboundType.defensive : ReboundType.offensive;
        }
        this.reboundingPlayer = newPlayer;
        this.reboundingPlayer.addRebound();
    }

    get reboundTypeString() {
        if(this.reboundType === ReboundType.offensive) {
            return "offensive";
        } else {
            return "defensive";
        }
    }


    get actionJSON (): Object {
        return {
            "action": "rebound",
            "actionId": this.actionId,
            "reboundingPlayerId": this.reboundingPlayer.playerId,
            "reboundType": this.reboundType,
        }
    }
    
}

export {Rebound, ReboundType}