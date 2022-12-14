import { computed, makeObservable } from "mobx";
import { Action } from "./Action";

class PossessionEnd extends Action {
    public constructor() {
        super();
        makeObservable(this, {
            actionJSON: computed,
        });
    }

    createNotify(): void {}

    deleteNotify(): void {}

    get actionJSON(): Object {
        return {
            action: "possessionend",
        };
    }

    get actionString(): string {
        return `POSSESSION END`;
    }
}

export { PossessionEnd };

