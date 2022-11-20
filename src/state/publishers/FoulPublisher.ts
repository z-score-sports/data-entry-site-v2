import { FoulImage } from "../actions/Foul";
import { Publisher } from "./Publisher";


interface FoulMessage {
    type: string
    oldImage: FoulImage
    newImage: FoulImage
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

    public notify (oldImage:FoulImage, newImage:FoulImage) {
        const info : FoulMessage = {
            type: "foul",
            oldImage: oldImage,
            newImage: newImage,
        }
        this.subscribers.forEach((sub) => {
            sub.update(info)
        })

    }

}

export {FoulPublisher}