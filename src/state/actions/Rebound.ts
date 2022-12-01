import { computed, makeObservable, observable } from "mobx";

import { Player } from "../Player";
import { createDelete, Publisher } from "../Publisher";
import { Action } from "./Action";


class Rebound extends Action {
    reboundingPlayer: Player;

    public constructor(reboundingPlayer: Player) {
        super();
        makeObservable(this, {
            reboundingPlayer: observable,
            actionJSON: computed,
        });
        this.reboundingPlayer = reboundingPlayer;
    }

    createNotify(): void {
        ReboundPublisher.getInstance().notify({
            type: "CREATE",
            action: this,
        });
    }

    deleteNotify(): void {
        ReboundPublisher.getInstance().notify({
            type: "DELETE",
            action: this,
        });
    }

    get actionJSON(): Object {
        return {
            action: "rebound",
            actionId: this.actionId,
            reboundingPlayerId: this.reboundingPlayer.playerId,
        };
    }
}

interface ReboundInMessage {
    type: createDelete
    action: Rebound
}

interface ReboundOutMessage {
    publisher: "rebound"
    type: createDelete
    action: Rebound
}

class ReboundPublisher extends Publisher {
    private static instance: ReboundPublisher
    private constructor() {
        super()
    }

    public static getInstance(): ReboundPublisher {
        if (!ReboundPublisher.instance) {
            this.instance = new ReboundPublisher();
        }
        return this.instance
    }

    public notify(message: ReboundInMessage) {
        if (!message.action) { return; }

        const outMessage: ReboundOutMessage = {
            publisher: "rebound",
            type: message.type,
            action: message.action
        }


        this.subscribers.forEach((sub) => {
            sub.update(outMessage)
        })

    }

}

export { Rebound, ReboundPublisher };
export type { ReboundInMessage, ReboundOutMessage };

