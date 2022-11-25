import { Foul } from "../actions/Foul";
import { Player } from "../Player";
import { createDelete, Publisher } from "./Publisher";


interface FoulInMessage {
    type: createDelete
    action: Foul
}

interface FoulOutMessage {
    publisher: "foul"
    type: createDelete
    player: Player
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
            player: message.action.foulingPlayer
        }

        this.subscribers.forEach((sub) => {
            sub.update(outMessage)
        })

    }

}

export {FoulPublisher}

export type {FoulInMessage, FoulOutMessage}