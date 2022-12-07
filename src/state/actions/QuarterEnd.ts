import { computed, makeObservable } from "mobx";
import { createDelete, Publisher } from "../Publisher";

import { Action } from "./Action";

class QuarterEnd extends Action {
    public constructor() {
        super();
        makeObservable(this, {
            actionJSON: computed,
        });
    }

    createNotify(): void {
        QuarterEndPublisher.getInstance().notify({
            type: "CREATE",
            action: this,
        });
    }

    deleteNotify(): void {
        QuarterEndPublisher.getInstance().notify({
            type: "DELETE",
            action: this,
        });
    }

    get actionJSON(): Object {
        return {
            action: "quarterend",
            actionId: this.actionId,
        };
    }
}

interface QuarterEndInMessage {
    type: createDelete;
    action: QuarterEnd;
}

interface QuarterEndOutMessage {
    publisher: "quarterend";
    type: createDelete;
    action: QuarterEnd;
}
class QuarterEndPublisher extends Publisher {
    private static instance: QuarterEndPublisher;
    private constructor() {
        super();
    }

    public static getInstance(): QuarterEndPublisher {
        if (!QuarterEndPublisher.instance) {
            this.instance = new QuarterEndPublisher();
        }
        return this.instance;
    }

    public notify(message: QuarterEndInMessage) {
        if (!message.action) {
            return;
        }

        const outMessage: QuarterEndOutMessage = {
            publisher: "quarterend",
            type: message.type,
            action: message.action,
        };

        this.subscribers.forEach((sub) => {
            sub.update(outMessage);
        });
    }
}

export { QuarterEnd, QuarterEndPublisher };
export type { QuarterEndOutMessage };


