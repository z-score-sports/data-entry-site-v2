import { Player } from "../Player";
import { Action } from "./Action";


class FreeThrow extends Action {

    shootingPlayer:Player;
    made : boolean = false;

    constructor(shootingPlayer:Player, made:boolean) {
        super();
        this.shootingPlayer = shootingPlayer;
        this.made = made;
        this.shootingPlayer.addFreeThrowAttempt();

        if(this.made){
            this.shootingPlayer.addFreeThrowMade();
        }


    }

    editMade(newMade:boolean) {
        if(this.made == newMade){return};

        if(newMade == true && this.made == false) {
            this.shootingPlayer.addFreeThrowMade();
        } else {
            this.shootingPlayer.removeFreeThrowMade();
        }

    }

    editPlayer(newPlayer:Player) {
        this.shootingPlayer.removeFreeThrowAttempt();
        if(this.made){
            this.shootingPlayer.removeFreeThrowMade();
        }
        this.shootingPlayer = newPlayer;
        this.shootingPlayer.addFreeThrowAttempt();
        if(this.made) {
            this.shootingPlayer.addFreeThrowMade();
        }
    }

    actionJSON (): Object {
        return {
            "action": "freethrow",
            "actionId": this.actionId,
            "shootingPlayerId": this.shootingPlayer.playerId,
            "made": this.made,
            
        }
    }
    
}

export {FreeThrow}