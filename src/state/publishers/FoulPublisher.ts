import { Foul } from "../actions/Foul";
import { createDelete, Publisher } from "./Publisher";


interface FoulInMessage {
    type: createDelete
    action: Foul
}

interface FoulOutMessage {
    publisher: "foul"
    type: createDelete
    action: Foul
}

class FoulPublisher extends Publisher {
    private static instance: FoulPublisher
    private constructor() {
        super()
    }

    public static getInstance() : FoulPublisher {
        if(!FoulPublisher.instance) {
            this.instance = new FoulPublisher();
        }
        return this.instance
    }

    public notify (message: FoulInMessage) {
        if(!message.action) {return;}


        const outMessage : FoulOutMessage = {
            publisher: "foul",
            type: message.type,
            action: message.action
        }

        this.subscribers.forEach((sub) => {
            sub.update(outMessage)
        })

    }

}

export {FoulPublisher}

export type {FoulInMessage, FoulOutMessage}