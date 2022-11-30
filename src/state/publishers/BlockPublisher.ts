import { Block } from "../actions/Block";
import { Publisher, createDelete } from "./Publisher";


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

    public static getInstance() : BlockPublisher {
        if(!BlockPublisher.instance) {
            this.instance = new BlockPublisher();
        }
        return this.instance
    }

    public notify (message: BlockInMessage) {
        if(!message.action) {return;}
        const outMessage : BlockOutMessage = {
            publisher: "block",
            type: message.type,
            action: message.action
        }

        this.subscribers.forEach((sub) => {
            sub.update(outMessage)
        })

    }

}

export {BlockPublisher}

export type {BlockInMessage, BlockOutMessage}