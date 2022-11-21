import { FreeThrowImage } from "../actions/FreeThrow";
import { ShotImage } from "../actions/Shot";
import { Player } from "../Player";
import { Publisher } from "./Publisher";

type PointsMessage = {
    type: "points"
    oldImage: ShotImage | FreeThrowImage
    newImage: ShotImage | FreeThrowImage
}

type PointsImage = ShotImage | FreeThrowImage;

class PointsPublisher extends Publisher {

    private static instance: PointsPublisher;

    private constructor() {
        super();
    }

    public static getInstance() : PointsPublisher {
        if(!PointsPublisher.instance) {
            this.instance = new PointsPublisher();
        }
        return this.instance;

    }

    public notify (oldImage:PointsImage, newImage:PointsImage): void {
        const info : PointsMessage = {
            type: "points",
            oldImage: oldImage,
            newImage: newImage
        }
        this.subscribers.forEach((sub) => {
            sub.update(info)
        })
    }

    
}

export {PointsPublisher}
export type {PointsMessage}