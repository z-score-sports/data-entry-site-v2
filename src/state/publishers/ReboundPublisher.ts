import { Rebound } from "../actions/Rebound";
import { Player } from "../Player";
import { createDelete, Publisher } from "./Publisher";


interface ReboundInMessage {
    type: createDelete
    action: Rebound
}

interface ReboundOutMessage {
    publisher: "rebound"
    type: createDelete
    action: Rebound
}

class ReboundPublisher extends Publisher {
    private static instance: ReboundPublisher
    private constructor() {
        super()
    }

    public static getInstance() : ReboundPublisher {
        if(!ReboundPublisher.instance) {
            this.instance = new ReboundPublisher();
        }
        return this.instance
    }

    public notify (message: ReboundInMessage) {
        if(!message.action) {return;}

        const outMessage : ReboundOutMessage = {
            publisher: "rebound",
            type: message.type,
            action: message.action
        }


        this.subscribers.forEach((sub) => {
            sub.update(outMessage)
        })

    }

}

export {ReboundPublisher}
export type {ReboundInMessage, ReboundOutMessage}