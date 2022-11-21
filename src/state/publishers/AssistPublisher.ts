import { AssistImage } from "../actions/Assist";
import { Publisher } from "./Publisher";


interface AssistMessage {
    type: "assist"
    oldImage: AssistImage
    newImage: AssistImage
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

    public notify (oldImage:AssistImage, newImage:AssistImage) {
        const info : AssistMessage = {
            type: "assist",
            oldImage: oldImage,
            newImage: newImage,
        }
        this.subscribers.forEach((sub) => {
            sub.update(info)
        })

    }

}

export {AssistPublisher}
export type {AssistMessage}