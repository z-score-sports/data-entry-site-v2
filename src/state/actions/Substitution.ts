import { computed, makeObservable, observable } from "mobx";

import { GameTime } from "../GameTime";
import { Player, Team } from "../Player";
import { createDelete, Publisher } from "../Publisher";
import { Action } from "./Action";

class Substitution extends Action {
    playerGoingIn: Player;
    playerGoingOut: Player;
    gameTime: GameTime;

    public constructor(
        playerGoingIn: Player,
        playerGoingOut: Player,
        gameTime: GameTime
    ) {
        super();
        makeObservable(this, {
            playerGoingIn: observable,
            playerGoingOut: observable,
            gameTime: observable,
            actionJSON: computed,
        });
        this.playerGoingIn = playerGoingIn;
        this.playerGoingOut = playerGoingOut;
        this.gameTime = gameTime;
    }

    createNotify(): void {
        SubstitutionPublisher.getInstance().notify({
            type: "CREATE",
            action: this,
        });
    }

    deleteNotify() {
        SubstitutionPublisher.getInstance().notify({
            type: "DELETE",
            action: this,
        });
    }

    get actionJSON(): Object {
        return {
            action: "substitution",
            playerIdGoingIn: this.playerGoingIn.playerId,
            playerIdGoingOut: this.playerGoingOut.playerId,
            // need to put GameTime string
        };
    }

    get actionString(): string {
        return `${
            this.playerGoingIn.team === Team.home ? "HOME" : "AWAY"
        } SUBSTITUTION ${this.playerGoingIn.num} for ${
            this.playerGoingOut.num
        } at ${this.gameTime.quarter}Q ${this.gameTime.minutes
            .toString()
            .padStart(2, "0")}:${this.gameTime.seconds
            .toString()
            .padStart(2, "0")}`;
    }
}

interface SubstitutionInMessage {
    type: createDelete;
    action: Substitution;
}

interface SubstitutionOutMessage {
    publisher: "substitution";
    type: createDelete;
    action: Substitution;
}

class SubstitutionPublisher extends Publisher {
    private static instance: SubstitutionPublisher;
    private constructor() {
        super();
    }

    public static getInstance(): SubstitutionPublisher {
        if (!SubstitutionPublisher.instance) {
            this.instance = new SubstitutionPublisher();
        }
        return this.instance;
    }

    notify(message: SubstitutionInMessage) {
        if (!message.action) {
            return;
        }

        const outMessage: SubstitutionOutMessage = {
            publisher: "substitution",
            type: message.type,
            action: message.action,
        };

        this.subscribers.forEach((sub) => {
            sub.update(outMessage);
        });
    }
}

export { Substitution, SubstitutionPublisher };
export type { SubstitutionOutMessage };

