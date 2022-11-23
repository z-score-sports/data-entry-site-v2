import { observable, action, computed, reaction, makeObservable } from "mobx"

import { Player } from "../Player";
import { PointsPublisher } from "../publishers/PointsPublisher";
import { Action } from "./Action";
import { Rebound } from "./Rebound";

class FreeThrow extends Action {

    shootingPlayer:Player;
    made : boolean;

    public constructor(shootingPlayer:Player, made:boolean) {
        super();
        makeObservable(this, {
            shootingPlayer: observable,
            made: observable,
            actionJSON: computed,
        })
        this.shootingPlayer = shootingPlayer;
        this.made = made;
        //always add a free throw attempt

        
    }

    createNotify (): void {
        PointsPublisher.getInstance().notify({
            type: "CREATE",
            action: this
        })
    }

    deleteNotify () {
        PointsPublisher.getInstance().notify({
            type: "DELETE",
            action: this
        })
    }

    public get actionJSON (): Object {
        return {
            "action": "freethrow",
            "actionId": this.actionId,
            "shootingPlayerId": this.shootingPlayer.playerId,
            "made": this.made,
        }
    }
    
}

export {FreeThrow}
