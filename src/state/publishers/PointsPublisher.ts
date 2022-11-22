
import { FreeThrow } from "../actions/FreeThrow";
import { Shot } from "../actions/Shot";
import { Player } from "../Player";
import { createDelete, Publisher } from "./Publisher";


interface PointsInMessage {
    type: createDelete
    action: Shot | FreeThrow
}

interface PointsOutMessage {
    publisher: "points"
    type: createDelete
    points: number
    player: Player
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

    public notify (message: PointsInMessage): void {
        if(!message.action) {return;}

        let points: number = 0;
        let player: Player = null
        if(message.action instanceof Shot) {
            points = message.action.shotPoints
            player = message.action.shootingPlayer
        } else if (message.action instanceof FreeThrow){
            points = message.action.made ? 1 : 0
            player = message.action.shootingPlayer
        }
        
        const outMessage : PointsOutMessage = {
            publisher: "points",
            type: message.type,
            points: points,
            player: player
            
        }
        
        this.subscribers.forEach((sub) => {
            sub.update(outMessage)
        })
    }

    
}

export {PointsPublisher}

export type {PointsInMessage, PointsOutMessage}
