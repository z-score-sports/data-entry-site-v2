import { Player } from "../Player";
import { Action } from "./Action";


class Turnover extends Action {
    offensivePlayer : Player = null;
    

    constructor(offensivePlayer : Player) {
        super();
        this.offensivePlayer = offensivePlayer;

    }

    public editOffensivePlayer(newOffensivePlayer : Player) {
        this.offensivePlayer = newOffensivePlayer
    }

    public removeStats (): void {return}

    actionJSON (): Object {
        return {
            "action": "turnover",
            "actionId": this.actionId,
            "offensivePlayer": this.offensivePlayer.playerId
        }
    }
    
}

class Steal extends Turnover {
    stealingPlayer : Player;

    constructor(offensivePlayer:Player, stealingPlayer:Player) {
        super(offensivePlayer);
        this.stealingPlayer = stealingPlayer;
        this.stealingPlayer.addSteal();
    }

    public editStealingPlayer(newStealingPlayer : Player) {
        this.stealingPlayer.removeSteal();
        this.stealingPlayer = newStealingPlayer;
        this.stealingPlayer.addSteal();
    }

    public removeStats (): void {
        this.stealingPlayer.removeSteal();
    }

    actionJSON (): Object {
        return {
            "action": "steal",
            "actionId": this.actionId,
            "offensivePlayerId": this.offensivePlayer.playerId,
            "stealingPlayerId": this.stealingPlayer.playerId
        };
    }
}

export {Turnover, Steal}


