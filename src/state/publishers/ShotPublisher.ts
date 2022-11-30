import { Shot } from "../actions/Shot";
import { Publisher, createDelete } from "./Publisher";


interface ShotInMessage {
    type: createDelete
    action: Shot
}

interface ShotOutMessage {
    publisher: "shot"
    type: createDelete
    action: Shot
}

class ShotPublisher extends Publisher {
    private static instance: ShotPublisher
    private constructor() {
        super()
    }

    public static getInstance() : ShotPublisher {
        if(!ShotPublisher.instance) {
            this.instance = new ShotPublisher();
        }
        return this.instance
    }

    public notify (message: ShotInMessage) {
        if(!message.action) {return;}
        const outMessage : ShotOutMessage = {
            publisher: "shot",
            type: message.type,
            action: message.action
        }

        this.subscribers.forEach((sub) => {
            sub.update(outMessage)
        })

    }

}

export {ShotPublisher}
export type {ShotInMessage, ShotOutMessage}