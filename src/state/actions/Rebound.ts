import { observable, action, computed, reaction } from "mobx"

import { Player } from "../Player";
import { Action } from "./Action";


enum ReboundType {
    offensive,
    defensive
} 

class Rebound extends Action {
    @observable reboundingPlayer : Player;
    @observable reboundType : ReboundType;

    

    public constructor(reboundingPlayer : Player, reboundType : ReboundType) {
        super();
        this.reboundingPlayer = reboundingPlayer;
        this.reboundType = reboundType; 
        this.reboundingPlayer.addRebound();

    }

    @action removeStats (): void {
        this.reboundingPlayer.removeRebound();
    }
    
    @action editReboundType(newReboundType : ReboundType) {
        this.reboundType = newReboundType;
    }

    @action editPlayer(newPlayer : Player) {
        this.reboundingPlayer.removeRebound();
        this.reboundingPlayer = newPlayer;
        this.reboundingPlayer.addRebound();
    }

    @computed getReboundTypeString() {
        if(this.reboundType === ReboundType.offensive) {
            return "offensive";
        } else {
            return "defensive";
        }
    }


    @computed actionJSON (): Object {
        return {
            "action": "rebound",
            "actionId": this.actionId,
            "reboundingPlayerId": this.reboundingPlayer.playerId,
            "reboundType": this.reboundType,
        }
    }
    
}

export {Rebound, ReboundType}