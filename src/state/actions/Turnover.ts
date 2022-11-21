import { observable, action, computed, reaction, makeObservable, override } from "mobx"

import { Player } from "../Player";
import { Action } from "./Action";

interface StealImage {
    player: Player
}

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

    get image() : Object {
        return {}
    }

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
    }

    editStealingPlayer(newStealingPlayer : Player) {
        this.stealingPlayer = newStealingPlayer;
    }

    removeStats (): void {
    }

    get image() : StealImage {
        return {
            player: this.stealingPlayer
        }
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
export type {StealImage}


