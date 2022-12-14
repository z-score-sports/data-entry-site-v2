import { computed, makeObservable } from "mobx";

export abstract class Action {
    actionId: string;

    constructor() {
        makeObservable(this, {
            actionString: computed,
        });
    }

    abstract createNotify(): void;
    abstract deleteNotify(): void;

    get actionString() {
        return "action";
    }

    abstract get actionJSON(): any;
}
