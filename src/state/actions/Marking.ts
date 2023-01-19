import { computed, makeObservable } from "mobx";
import { markingMappings } from "../GameState";

import { Action } from "./Action";

class Marking extends Action {
    markingKey: number;

    public constructor(markingKey: number) {
        super();
        makeObservable(this, {
            actionJSON: computed,
        });
        if (markingKey < 0 || markingKey >= markingMappings.length) {
            throw new Error("Invalid marking action");
        }
        this.markingKey = markingKey;
    }

    createNotify(): void {}

    deleteNotify(): void {}

    get actionJSON(): Object {
        return {
            action: "marking",
            markingKey: this.markingKey,
        };
    }

    get actionString(): string {
        return `MARKING #${this.markingKey} ${
            markingMappings[this.markingKey]
        }`;
    }
}

export { Marking };
