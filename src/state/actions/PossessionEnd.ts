import { computed, makeObservable } from "mobx";
import { Team } from "../Player";
import { Action } from "./Action";

class PossessionEnd extends Action {
    possessingTeam: Team;

    public constructor(team: Team) {
        super();
        makeObservable(this, {
            actionJSON: computed,
        });
        this.possessingTeam = team;
    }

    createNotify(): void {}

    deleteNotify(): void {}

    get actionJSON(): Object {
        return {
            action: "possessionend",
        };
    }

    get actionString(): string {
        return `POSSESSION END`;
    }
}

export { PossessionEnd };

