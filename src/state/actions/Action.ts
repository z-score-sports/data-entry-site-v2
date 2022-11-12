import { randomUUID } from "crypto";

export abstract class Action {
    id : string;

    constructor() {
        this.id = randomUUID();
    }

    abstract actionJSON() : Object;
}


