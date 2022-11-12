import { Player } from "../Player";
import { Action } from "./Action";


class Turnover extends Action {
    offensivePlayer : Player = null;
    

    constructor(offensivePlayer : Player) {
        super();
        this.offensivePlayer = offensivePlayer;

    }

    public removeStats (): void {return}

    actionJSON (): Object {
        return {};
    }
    
}

class Steal extends Turnover {
    stealingPlayer : Player;

    constructor(offensivePlayer:Player, stealingPlayer:Player) {
        super(offensivePlayer);
        this.stealingPlayer = stealingPlayer;
        this.stealingPlayer.addSteal();
    }

    public removeStats (): void {
        this.stealingPlayer.removeSteal();
    }

    actionJSON (): Object {
        return {
            "action": "steal",
            "actionId": this.actionId,
            "stealee": this.offensivePlayer.playerId,
            "stealer": this.stealingPlayer.playerId
        };
    }
}

export {Turnover, Steal}


