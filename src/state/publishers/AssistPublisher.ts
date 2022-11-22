import { Assist } from "../actions/Assist";
import { Player } from "../Player";
import { Publisher, createDelete } from "./Publisher";


interface AssistInMessage {
    type: createDelete
    action: Assist
}

interface AssistOutMessage {
    publisher: "assist"
    type: createDelete
    player: Player
}

class AssistPublisher extends Publisher {
    private static instance: AssistPublisher
    private constructor() {
        super()
    }

    public static getInstance() : AssistPublisher {
        if(!AssistPublisher.instance) {
            this.instance = new AssistPublisher();
        }
        return this.instance
    }

    public notify (message: AssistInMessage) {
        if(!message.action) {return;}
        const outMessage : AssistOutMessage = {
            publisher: "assist",
            type: message.type,
            player: message.action.assistingPlayer
        }

        this.subscribers.forEach((sub) => {
            sub.update(outMessage)
        })

    }

}

export {AssistPublisher}
export type {AssistInMessage, AssistOutMessage}