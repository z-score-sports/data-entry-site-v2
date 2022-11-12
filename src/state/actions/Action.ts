import { randomUUID } from "crypto";

export abstract class Action {
    actionId : string;

    constructor() {
        this.actionId = randomUUID();
    }

    abstract removeStats() : void;

    abstract actionJSON() : Object;
}


