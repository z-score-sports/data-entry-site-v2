import { observable, action, computed, reaction, makeAutoObservable, makeObservable } from "mobx"

import { Player } from "../Player";
import { PointsPublisher } from "../publishers/PointsPublisher";
import { Action } from "./Action";
 
class Shot extends Action {

    shootingPlayer : Player;
    region : number;
    made : boolean;
    
    

    constructor(shootingPlayer:Player, region: 1|2|3|4|5|6|7|8|9, made:boolean) {
        super();
        makeObservable(this, {
            shootingPlayer: observable,
            region: observable,
            made: observable,
            actionJSON: computed,
        })
        this.shootingPlayer = shootingPlayer;
        this.region = region;
        this.made = made;

        PointsPublisher.getInstance().notify({
            type: "CREATE",
            action: this
        })

    }

    get shotPoints() : number {
        if(!this.made){
            return 0;
        } else if (this.region <= 4){
            return 2;
        } else {
            return 3;
        }
    }

    remove() {
        PointsPublisher.getInstance().notify({
            type: "DELETE",
            action: this
        })
    }

    get actionJSON (): Object {
        return {
            "action": "shot",
            "actionId": this.actionId,
            "shootingPlayerId": this.shootingPlayer.playerId,
            "region": this.region,
            "make": this.made,

        }
    }
    
}

export {Shot}
