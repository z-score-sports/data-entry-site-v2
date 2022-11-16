import { observable, action, computed, reaction } from "mobx"

export abstract class Action {
    actionId : string;

    constructor() {
        this.actionId = crypto.randomUUID();
    }

    @computed public toString() {
        return this.actionId;
    }

    abstract removeStats() : void;

    abstract actionJSON() : Object;
}


