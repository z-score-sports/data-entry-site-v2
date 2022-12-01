import { computed, makeObservable, observable, override } from "mobx";

import { Player } from "../Player";
import { createDelete, Publisher } from "../Publisher";
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

    createNotify(): void {
        TurnoverPublisher.getInstance().notify({
            type: "CREATE",
            action: this,
        });
    }

    deleteNotify(): void {
        TurnoverPublisher.getInstance().notify({
            type: "DELETE",
            action: this,
        });
    }

    get actionJSON(): Object {
        return {
            action: "turnover",
            actionId: this.actionId,
            offensivePlayer: this.offensivePlayer.playerId,
        };
    }
}

class Steal extends Turnover {
    stealingPlayer: Player;

    constructor(offensivePlayer: Player, stealingPlayer: Player) {
        super(offensivePlayer);
        makeObservable(this, {
            stealingPlayer: observable,
            actionJSON: override,
        });
        this.stealingPlayer = stealingPlayer;
    }

    get actionJSON(): Object {
        return {
            action: "steal",
            actionId: this.actionId,
            offensivePlayerId: this.offensivePlayer.playerId,
            stealingPlayerId: this.stealingPlayer.playerId,
        };
    }
}

interface TurnoverInMessage {
    type: createDelete;
    action: Turnover;
}

interface TurnoverOutMessage {
    publisher: "turnover";
    type: createDelete;
    action: Turnover;
}

class TurnoverPublisher extends Publisher {
    private static instance: TurnoverPublisher;
    private constructor() {
        super();
    }

    public static getInstance(): TurnoverPublisher {
        if (!TurnoverPublisher.instance) {
            this.instance = new TurnoverPublisher();
        }
        return this.instance;
    }

    public notify(message: TurnoverInMessage) {
        if (!message.action) {
            return;
        }

        const outMessage: TurnoverOutMessage = {
            publisher: "turnover",
            type: message.type,
            action: message.action,
        };

        this.subscribers.forEach((sub) => {
            sub.update(outMessage);
        });
    }
}

export { Turnover, Steal, TurnoverPublisher };


