import { FreeThrowImage } from "../actions/FreeThrow";
import { ShotImage } from "../actions/Shot";
import { Player } from "../Player";
import { Publisher } from "./Publisher";

interface PointsMessage {
    type: string
    oldImage: ShotImage | FreeThrowImage
    newImage: ShotImage | FreeThrowImage
}

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

    public notify (info: PointsMessage): void {
        super.notify(info)
    }

    
}

export {PointsPublisher}