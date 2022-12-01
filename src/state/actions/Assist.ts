import { computed, makeObservable, observable } from "mobx";

import { Player } from "../Player";
import { createDelete, Publisher } from "../Publisher";
import { Action } from "./Action";

class Assist extends Action {
    assistingPlayer: Player;

    public constructor(assistingPlayer: Player) {
        super();
        makeObservable(this, {
            assistingPlayer: observable,
            actionJSON: computed,
        });
        this.assistingPlayer = assistingPlayer;
    }

    createNotify() {
        AssistPublisher.getInstance().notify({
            type: "CREATE",
            action: this,
        });
    }

    deleteNotify() {
        AssistPublisher.getInstance().notify({
            type: "DELETE",
            action: this,
        });
    }

    get actionJSON(): Object {
        return {
            action: "assist",
            actionId: this.actionId,
            assistingPlayerId: this.assistingPlayer.playerId,
        };
    }
}

interface AssistInMessage {
    type: createDelete;
    action: Assist;
}

interface AssistOutMessage {
    publisher: "assist";
    type: createDelete;
    action: Assist;
}

class AssistPublisher extends Publisher {
    private static instance: AssistPublisher;

    private constructor() {
        super();
    }

    public static getInstance(): AssistPublisher {
        if (!AssistPublisher.instance) {
            this.instance = new AssistPublisher();
        }
        return this.instance;
    }

    public notify(message: AssistInMessage) {
        if (!message.action) {
            return;
        }
        const outMessage: AssistOutMessage = {
            publisher: "assist",
            type: message.type,
            action: message.action,
        };

        this.subscribers.forEach((sub) => {
            sub.update(outMessage);
        });
    }
}

export { Assist, AssistPublisher };
export type { AssistInMessage, AssistOutMessage };
