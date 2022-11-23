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

    abstract remove() : void

    get actionString() {
        return this.actionId;
    }

    abstract get actionJSON() : Object;
}


