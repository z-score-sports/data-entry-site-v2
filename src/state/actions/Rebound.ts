import { Player } from "../Player";
import { Action } from "./Action";


enum ReboundType {
    offensive,
    defensive
} 

class Rebound extends Action {
    public reboundingPlayer : Player;
    public reboundType : ReboundType;

    

    public constructor(reboundingPlayer : Player, reboundType : ReboundType) {
        super();
        this.reboundingPlayer = reboundingPlayer;
        this.reboundType = reboundType; 
        this.reboundingPlayer.addRebound();

    }

    public editReboundType(newReboundType : ReboundType) {
        this.reboundType = newReboundType;
    }

    public editPlayer(newPlayer : Player) {
        this.reboundingPlayer.removeRebound();
        this.reboundingPlayer = newPlayer;
        this.reboundingPlayer.addRebound();
    }

    public getReboundTypeString() {
        if(this.reboundType == 0) {
            return "offensive";
        } else {
            return "defensive";
        }
    }

    public actionJSON (): Object {
        return {
            "action": "rebound",
            "actionId": this.actionId,
            "reboundingPlayerId": this.reboundingPlayer.playerId,
            "reboundType": this.reboundType,
        }
    }
    
}

export {Rebound, ReboundType}