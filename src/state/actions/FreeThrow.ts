import { Player } from "../Player";
import { Action } from "./Action";
import { Rebound } from "./Rebound";


class FreeThrow extends Action {

    public shootingPlayer:Player;
    public made : boolean = false;
    public rebound : Rebound = null;

    public constructor(shootingPlayer:Player, made:boolean) {
        super();
        this.shootingPlayer = shootingPlayer;
        this.made = made;
        this.shootingPlayer.addFreeThrowAttempt();

        if(this.made){
            this.shootingPlayer.addFreeThrowMade();
        }


    }

    public editMade(newMade:boolean) {
        //case when the made boolean isn't changed
        if(this.made == newMade){return};
        //change the made
        this.made = newMade;
        //miss to made -> add free throw made
        //made to miss -> remove free throw made
        if(newMade == true && this.made == false) {
            this.shootingPlayer.addFreeThrowMade();
        } else {
            this.shootingPlayer.removeFreeThrowMade();
        }

    }

    public editPlayer(newPlayer:Player) {
        //case when players are the same
        if(this.shootingPlayer == newPlayer){return;}
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

    public setRebound(rebound:Rebound) {
        if(!this.made){
            this.rebound = rebound;
        } else {
            console.log("warning: cannot add rebound to a made free throw.")
        }
    }

    private getReboundId() : string {
        if(this.rebound){
            return this.rebound.actionId;
        } else {
            return "";
        }
    }

    public actionJSON (): Object {
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