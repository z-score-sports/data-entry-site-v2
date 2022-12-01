import { computed, makeObservable, observable } from "mobx";

import { Player } from "../Player";
import { createDelete, Publisher } from "../Publisher";
import { Action } from "./Action";

class FreeThrow extends Action {
    shootingPlayer: Player;
    made: boolean;

    public constructor(shootingPlayer: Player, made: boolean) {
        super();
        makeObservable(this, {
            shootingPlayer: observable,
            made: observable,
            actionJSON: computed,
        });
        this.shootingPlayer = shootingPlayer;
        this.made = made;
    }

    createNotify(): void {
        FreeThrowPublisher.getInstance().notify({
            type: "CREATE",
            action: this,
        });
    }

    deleteNotify() {
        FreeThrowPublisher.getInstance().notify({
            type: "DELETE",
            action: this,
        });
    }

    public get actionJSON(): Object {
        return {
            action: "freethrow",
            actionId: this.actionId,
            shootingPlayerId: this.shootingPlayer.playerId,
            made: this.made,
        };
    }
}



interface FreeThrowInMessage {
    type: createDelete
    action: FreeThrow
}

interface FreeThrowOutMessage {
    publisher: "freethrow"
    type: createDelete
    action: FreeThrow
}

class FreeThrowPublisher extends Publisher {
    private static instance: FreeThrowPublisher
    private constructor() {
        super()
    }

    public static getInstance(): FreeThrowPublisher {
        if (!FreeThrowPublisher.instance) {
            this.instance = new FreeThrowPublisher();
        }
        return this.instance
    }

    public notify(message: FreeThrowInMessage) {
        if (!message.action) { return; }
        const outMessage: FreeThrowOutMessage = {
            publisher: "freethrow",
            type: message.type,
            action: message.action
        }

        this.subscribers.forEach((sub) => {
            sub.update(outMessage)
        })

    }

}

export { FreeThrow, FreeThrowPublisher };
export type { FreeThrowInMessage, FreeThrowOutMessage };

