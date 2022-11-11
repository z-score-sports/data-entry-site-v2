import { randomUUID } from "crypto";

class Action {
    actionId : string;

    constructor() {
        this.actionId = randomUUID();
    }

}

export type {Action};

