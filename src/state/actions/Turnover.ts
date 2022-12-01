import { computed, makeObservable, observable, override } from "mobx";

import { Player } from "../Player";
import { Action } from "./Action";


class Turnover extends Action {
    offensivePlayer: Player = null;

    constructor(offensivePlayer: Player) {
        super();
        makeObservable(this, {
            offensivePlayer: observable,
            actionJSON: computed,
        });
        this.offensivePlayer = offensivePlayer;
    }

    createNotify(): void {}

    deleteNotify(): void {}

    get actionJSON(): Object {
        return {
            action: "turnover",
            actionId: this.actionId,
            offensivePlayer: this.offensivePlayer.playerId,
        };
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

export { Turnover, Steal };


