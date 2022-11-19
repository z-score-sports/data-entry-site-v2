import { Publisher } from "./Publisher";

interface PointsMessage {
    points: number;
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

    
}