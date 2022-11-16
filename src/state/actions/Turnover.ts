import { observable, action, computed, reaction, makeObservable, override } from "mobx"

import { Player } from "../Player";
import { Action } from "./Action";


class Turnover extends Action {
    offensivePlayer : Player = null;
    

    constructor(offensivePlayer : Player) {
        super();
        makeObservable(this, {
            offensivePlayer: observable,
            editOffensivePlayer: action,
            removeStats: action,
            actionJSON: computed,

        })
        this.offensivePlayer = offensivePlayer;

    }

    editOffensivePlayer(newOffensivePlayer : Player) {
        this.offensivePlayer = newOffensivePlayer
    }

    removeStats (): void {return}

    get actionJSON (): Object {
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
        makeObservable(this, {
            stealingPlayer: observable,
            editStealingPlayer: observable,
            removeStats: override,
            actionJSON: override,
        })
        this.stealingPlayer = stealingPlayer;
        this.stealingPlayer.addSteal();
    }

    editStealingPlayer(newStealingPlayer : Player) {
        this.stealingPlayer.removeSteal();
        this.stealingPlayer = newStealingPlayer;
        this.stealingPlayer.addSteal();
    }

    removeStats (): void {
        this.stealingPlayer.removeSteal();
    }

    get actionJSON (): Object {
        return {
            "action": "steal",
            "actionId": this.actionId,
            "offensivePlayerId": this.offensivePlayer.playerId,
            "stealingPlayerId": this.stealingPlayer.playerId
        };
    }
}

export {Turnover, Steal}


