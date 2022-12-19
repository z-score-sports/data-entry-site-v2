import { computed, makeObservable, observable } from "mobx";

import { Player } from "../Player";
import { createDelete, Publisher } from "../Publisher";
import { Action } from "./Action";

class Foul extends Action {
    foulingPlayer: Player;

    constructor(foulingPlayer: Player) {
        super();
        makeObservable(this, {
            foulingPlayer: observable,
            actionJSON: computed,
        });
        this.foulingPlayer = foulingPlayer;
    }

    createNotify(): void {
        FoulPublisher.getInstance().notify({
            type: "CREATE",
            action: this,
        });
    }

    deleteNotify() {
        FoulPublisher.getInstance().notify({
            type: "DELETE",
            action: this,
        });
    }

    get actionJSON(): Object {
        return {
            action: "foul",
            foulingPlayerId: this.foulingPlayer.playerId,
        };
    }

    get actionString(): string {
        return `FOUL by player #${this.foulingPlayer.num}`;
    }
}

interface FoulInMessage {
    type: createDelete;
    action: Foul;
}

interface FoulOutMessage {
    publisher: "foul";
    type: createDelete;
    action: Foul;
}

class FoulPublisher extends Publisher {
    private static instance: FoulPublisher;
    private constructor() {
        super();
    }

    public static getInstance(): FoulPublisher {
        if (!FoulPublisher.instance) {
            this.instance = new FoulPublisher();
        }
        return this.instance;
    }

    public notify(message: FoulInMessage) {
        if (!message.action) {
            return;
        }

        const outMessage: FoulOutMessage = {
            publisher: "foul",
            type: message.type,
            action: message.action,
        };

        this.subscribers.forEach((sub) => {
            sub.update(outMessage);
        });
    }
}

export { Foul, FoulPublisher };
export type { FoulInMessage, FoulOutMessage };

