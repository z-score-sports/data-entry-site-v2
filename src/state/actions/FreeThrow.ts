import { observable, action, computed, reaction, makeObservable } from "mobx"

import { Player } from "../Player";
import { PointsPublisher } from "../publishers/PointsPublisher";
import { Action } from "./Action";
import { Rebound } from "./Rebound";


interface FreeThrowImage {
    player: Player
    points: number
}

class FreeThrow extends Action {

    shootingPlayer:Player;
    made : boolean;
    rebound : Rebound = null;

    public constructor(shootingPlayer:Player, made:boolean) {
        super();
        makeObservable(this, {
            shootingPlayer: observable,
            made: observable,
            rebound: observable,
            removeStats: action,
            editMade: action,
            editShootingPlayer: action,
            addRebound: action,
            removeRebound: action,
            actionJSON: computed,
        })
        this.shootingPlayer = shootingPlayer;
        this.made = made;
        //always add a free throw attempt
        PointsPublisher.getInstance().notify(null, this.image);
    }

    removeStats (): void {
        
        if(this.rebound) {this.rebound.removeStats()}
        PointsPublisher.getInstance().notify(this.image, null)
        
    }

    editMade(newMade:boolean) {
        //case when the made boolean isn't changed
        let oldImage = this.image
        this.made = newMade;
        let newImage = this.image
        PointsPublisher.getInstance().notify(oldImage, newImage);

    }

    editShootingPlayer(newPlayer:Player) {
        let oldImage = this.image
        this.shootingPlayer = newPlayer;
        let newImage = this.image
        PointsPublisher.getInstance().notify(oldImage, newImage);
    }

    addRebound(reboundingPlayer: Player) {
        // TODO: We can actually infer the rebound type, but this might be where the code gets messy
        if(this.made) {
            console.log("warning: trying to add a rebound to a made free throw")
            return
        } else if(this.rebound !== null) {
            console.log("warning: trying to add a second rebound to free throw.")
            return 
        }
        let rebound : Rebound = new Rebound(reboundingPlayer);
        this.rebound = rebound;

    }

    removeRebound() {
        //since we're removing the action from the outside...
        //we need to remove the stats from the rebounding player
        if(!this.rebound) {return;}
        this.rebound.removeStats();
        this.rebound = null;
    }

    private get reboundId() : string {
        if(this.rebound){
            return this.rebound.actionId;
        } else {
            return "";
        }
    }

    get image(): FreeThrowImage {
        return {
            player: this.shootingPlayer,
            points: this.made ? 1 : 0
        }
    }

    public get actionJSON (): Object {
        return {
            "action": "freethrow",
            "actionId": this.actionId,
            "shootingPlayerId": this.shootingPlayer.playerId,
            "made": this.made,
            "reboundId": this.rebound ? this.rebound.actionId : "",
        }
    }
    
}

export {FreeThrow}
export type {FreeThrowImage}