import { observable, action, computed, reaction, makeObservable, override } from "mobx"

import { Player } from "../Player";
import { TurnoverPublisher } from "../publishers/TurnoverPublisher";
import { Action } from "./Action";


class Turnover extends Action {
    offensivePlayer : Player = null;
    

    constructor(offensivePlayer : Player) {
        super();
        makeObservable(this, {
            offensivePlayer: observable,
            actionJSON: computed,

        })
        this.offensivePlayer = offensivePlayer;

    }

    createNotify (): void {
        TurnoverPublisher.getInstance().notify({
            type: "CREATE",
            action: this
        })
        
    }

    deleteNotify (): void {
        TurnoverPublisher.getInstance().notify({
            type: "DELETE",
            action: this
        })
        
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
            actionJSON: override,
        })
        this.stealingPlayer = stealingPlayer;
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


