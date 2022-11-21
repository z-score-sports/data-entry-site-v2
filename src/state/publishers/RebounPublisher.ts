import { ReboundImage } from "../actions/Rebound";
import { Publisher } from "./Publisher";


interface ReboundMessage {
    type: string
    oldImage: ReboundImage
    newImage: ReboundImage
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

    public notify (oldImage:ReboundImage, newImage:ReboundImage) {
        const info : ReboundMessage = {
            type: "rebound",
            oldImage: oldImage,
            newImage: newImage,
        }
        this.subscribers.forEach((sub) => {
            sub.update(info)
        })

    }

}

export {ReboundPublisher}
export type {ReboundMessage}