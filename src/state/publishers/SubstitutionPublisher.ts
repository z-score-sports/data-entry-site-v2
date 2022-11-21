import { LineupImage } from "../Roster";
import { Publisher } from "./Publisher";


interface SubstitutionMessage {
    type: "substitution"
    image: LineupImage
}

class SubstitutionPublisher extends Publisher {
    private static instance: SubstitutionPublisher
    private constructor() {
        super()
    }

    public static getInstance() : SubstitutionPublisher {
        if(!SubstitutionPublisher.instance) {
            this.instance = new SubstitutionPublisher();
        }
        return this.instance
    }

    public notify (image:LineupImage) {
        const info : SubstitutionMessage = {
            type: "substitution",
            image: image,
        }
        this.subscribers.forEach((sub) => {
            sub.update(info)
        })

    }

}

export {SubstitutionPublisher}
export type {SubstitutionMessage}