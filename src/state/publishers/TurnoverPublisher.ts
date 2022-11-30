import { Turnover } from "../actions/Turnover";
import { Publisher, createDelete } from "./Publisher";


interface TurnoverInMessage {
    type: createDelete
    action: Turnover
}

interface TurnoverOutMessage {
    publisher: "turnover"
    type: createDelete
    action: Turnover
}

class TurnoverPublisher extends Publisher {
    private static instance: TurnoverPublisher
    private constructor() {
        super()
    }

    public static getInstance() : TurnoverPublisher {
        if(!TurnoverPublisher.instance) {
            this.instance = new TurnoverPublisher();
        }
        return this.instance
    }

    public notify (message: TurnoverInMessage) {
        if(!message.action) {return;}
        const outMessage : TurnoverOutMessage = {
            publisher: "turnover",
            type: message.type,
            action: message.action
        }

        this.subscribers.forEach((sub) => {
            sub.update(outMessage)
        })

    }

}

export {TurnoverPublisher}
export type {TurnoverInMessage, TurnoverOutMessage}