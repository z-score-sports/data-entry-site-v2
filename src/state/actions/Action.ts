import { randomUUID } from "crypto";

export abstract class Action {
    actionId : string;

    constructor() {
        this.actionId = randomUUID();
    }

    public toString() {
        return this.actionId;
    }

    abstract removeStats() : void;

    abstract actionJSON() : Object;
}


