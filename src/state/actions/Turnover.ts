import { observable, action, computed, reaction, override } from "mobx"

import { Player } from "../Player";
import { Action } from "./Action";


class Turnover extends Action {
    @observable offensivePlayer : Player = null;
    

    constructor(offensivePlayer : Player) {
        super();
        this.offensivePlayer = offensivePlayer;

    }

    @action editOffensivePlayer(newOffensivePlayer : Player) {
        this.offensivePlayer = newOffensivePlayer
    }

    @action removeStats (): void {return}

    @computed actionJSON (): Object {
        return {
            "action": "turnover",
            "actionId": this.actionId,
            "offensivePlayer": this.offensivePlayer.playerId
        }
    }
    
}

class Steal extends Turnover {
    @observable stealingPlayer : Player;

    constructor(offensivePlayer:Player, stealingPlayer:Player) {
        super(offensivePlayer);
        this.stealingPlayer = stealingPlayer;
        this.stealingPlayer.addSteal();
    }

    @action editStealingPlayer(newStealingPlayer : Player) {
        this.stealingPlayer.removeSteal();
        this.stealingPlayer = newStealingPlayer;
        this.stealingPlayer.addSteal();
    }

    @override @action removeStats (): void {
        this.stealingPlayer.removeSteal();
    }

    @override @computed actionJSON (): Object {
        return {
            "action": "steal",
            "actionId": this.actionId,
            "offensivePlayerId": this.offensivePlayer.playerId,
            "stealingPlayerId": this.stealingPlayer.playerId
        };
    }
}

export {Turnover, Steal}


