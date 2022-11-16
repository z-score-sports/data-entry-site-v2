import { makeObservable, computed } from "mobx"

export abstract class Action {
    actionId : string;

    constructor() {
        makeObservable(this, {
            actionId: false,
            actionString: computed,

        })
        this.actionId = crypto.randomUUID();
    }

    get actionString() {
        return this.actionId;
    }

    abstract removeStats() : void;

    abstract actionJSON() : Object;
}


