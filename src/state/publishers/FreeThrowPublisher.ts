import { FreeThrow } from "../actions/FreeThrow";
import { Player } from "../Player";
import { Publisher, createDelete } from "./Publisher";


interface FreeThrowInMessage {
    type: createDelete
    action: FreeThrow
}

interface FreeThrowOutMessage {
    publisher: "freethrow"
    type: createDelete
    action: FreeThrow
}

class FreeThrowPublisher extends Publisher {
    private static instance: FreeThrowPublisher
    private constructor() {
        super()
    }

    public static getInstance() : FreeThrowPublisher {
        if(!FreeThrowPublisher.instance) {
            this.instance = new FreeThrowPublisher();
        }
        return this.instance
    }

    public notify (message: FreeThrowInMessage) {
        if(!message.action) {return;}
        const outMessage : FreeThrowOutMessage = {
            publisher: "freethrow",
            type: message.type,
            action: message.action
        }

        this.subscribers.forEach((sub) => {
            sub.update(outMessage)
        })

    }

}

export {FreeThrowPublisher}
export type {FreeThrowInMessage, FreeThrowOutMessage}