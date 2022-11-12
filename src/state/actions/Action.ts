import { randomUUID } from "crypto";

export abstract class Action {
    actionId : string;

    constructor() {
        this.actionId = randomUUID();
    }

    abstract actionJSON() : Object;
}


