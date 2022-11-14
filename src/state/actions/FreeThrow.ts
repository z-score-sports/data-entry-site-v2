import { observable, action, computed, reaction } from "mobx"

import { Player } from "../Player";
import { Action } from "./Action";
import { Rebound, ReboundType } from "./Rebound";


class FreeThrow extends Action {

    @observable shootingPlayer:Player;
    @observable made : boolean;
    @observable rebound : Rebound = null;

    public constructor(shootingPlayer:Player, made:boolean) {
        super();
        this.shootingPlayer = shootingPlayer;
        this.made = made;
        //always add a free throw attempt
        this.shootingPlayer.addFreeThrowAttempt();
        //if made free throw, add free throw made to the shooting player
        if(this.made){
            this.shootingPlayer.addFreeThrowMade();
        }
    }

    @action removeStats (): void {
        // always remove free throw attempt when deleted
        this.shootingPlayer.removeFreeThrowAttempt();
        //if made, we need to remove their free throw made
        if(this.made) {
            this.shootingPlayer.removeFreeThrowMade();
        }
        // if rebound exists, remove the rebound stats
        if(this.rebound !== null) {
            this.rebound.removeStats();
        }
        
    }

    @action editMade(newMade:boolean) {
        //case when the made boolean isn't changed
        if(this.made === newMade){return};
        //miss to made -> add free throw made
        //made to miss -> remove free throw made
        if(newMade === true && this.made === false) {
            this.shootingPlayer.addFreeThrowMade();
        } else {
            this.shootingPlayer.removeFreeThrowMade();
        }
        
        //change the made
        this.made = newMade;

    }

    @action editShootingPlayer(newPlayer:Player) {
        //first remove the stats from the current player
        this.shootingPlayer.removeFreeThrowAttempt();
        if(this.made){
            this.shootingPlayer.removeFreeThrowMade();
        }
        //change the player
        this.shootingPlayer = newPlayer;
        // add the stats to the new player
        this.shootingPlayer.addFreeThrowAttempt();
        if(this.made) {
            this.shootingPlayer.addFreeThrowMade();
        }
    }

    @action addRebound(reboundingPlayer: Player, reboundType : ReboundType) {
        if(this.made) {
            console.log("warning: trying to add a rebound to a made free throw")
            return
        } else if(this.rebound !== null) {
            console.log("warning: trying to add a second rebound to free throw.")
            return 
        }
        let rebound : Rebound = new Rebound(reboundingPlayer, reboundType);
        this.rebound = rebound;

    }

    @action removeRebound() {
        //since we're removing the action from the outside...
        //we need to remove the stats from the rebounding player
        if(!this.rebound) {return;}
        this.rebound.removeStats();
        this.rebound = null;
    }

    @computed private getReboundId() : string {
        if(this.rebound){
            return this.rebound.actionId;
        } else {
            return "";
        }
    }

    @computed public actionJSON (): Object {
        return {
            "action": "freethrow",
            "actionId": this.actionId,
            "shootingPlayerId": this.shootingPlayer.playerId,
            "made": this.made,
            "reboundId": this.getReboundId(),
        }
    }
    
}

export {FreeThrow}