import { observable, action, computed, reaction, makeAutoObservable, makeObservable } from "mobx"

import { Player } from "../Player";
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
