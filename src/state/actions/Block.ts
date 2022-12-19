import { computed, makeObservable, observable } from "mobx";

import { Player } from "../Player";
import { createDelete, Publisher } from "../Publisher";
import { Action } from "./Action";

class Block extends Action {
    blockingPlayer: Player;

    public constructor(blockingPlayer: Player) {
        super();
        makeObservable(this, {
            blockingPlayer: observable,
            actionJSON: computed,
        });
        this.blockingPlayer = blockingPlayer;
    }

    createNotify(): void {
        BlockPublisher.getInstance().notify({
            type: "CREATE",
            action: this,
        });
    }

    deleteNotify(): void {
        BlockPublisher.getInstance().notify({
            type: "DELETE",
            action: this,
        });
    }

    get actionJSON(): Object {
        return {
            action: "block",
            blockingPlayerId: this.blockingPlayer.playerId,
        };
    }

    get actionString(): string {
        return `BLOCK by player #${this.blockingPlayer.num}`;
    }
}

interface BlockInMessage {
    type: createDelete
    action: Block
}

interface BlockOutMessage {
    publisher: "block"
    type: createDelete
    action: Block
}

class BlockPublisher extends Publisher {

    private static instance: BlockPublisher
    private constructor() {
        super()
    }


    public static getInstance(): BlockPublisher {
        if (!BlockPublisher.instance) {
            this.instance = new BlockPublisher();
        }
        return this.instance
    }

    public notify(message: BlockInMessage) {
        if (!message.action) { return; }
        const outMessage: BlockOutMessage = {
            publisher: "block",
            type: message.type,
            action: message.action
        }

        this.subscribers.forEach((sub) => {
            sub.update(outMessage)
        })

    }

}

export { Block, BlockPublisher };
export type { BlockInMessage, BlockOutMessage };


