import { Player } from "../Player";
import { Action } from "./Action";


class Turnover extends Action {
    offensivePlayer : Player;
    

    constructor(offensivePlayer : Player) {
        super();
        this.offensivePlayer = offensivePlayer;

    }

    actionJSON (): Object {
        return {};
    }
    
}

class Steal extends Turnover {
    stealingPlayer : Player = null;

    constructor(offensivePlayer:Player, stealingPlayer:Player) {
        super(offensivePlayer);
        this.stealingPlayer = stealingPlayer;
    }

    actionJSON (): Object {
        return {};
    }
}

export {Turnover, Steal}


