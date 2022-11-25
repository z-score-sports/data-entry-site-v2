import { Substitution } from "../actions/Substitution";
import { GameTime, Player } from "../Player";
import { createDelete, Publisher } from "./Publisher";


interface SubstitutionInMessage {
    type: createDelete
    action: Substitution
}

interface SubstitutionOutMessage {
    publisher: "substitution"
    type: createDelete
    playerGoingIn: Player
    playerGoingOut: Player
    gameTime: GameTime
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

    public notify (message : SubstitutionInMessage) {
        const outMessage : SubstitutionOutMessage = {
            publisher: "substitution",
            type: message.type,
            playerGoingIn: message.action.playerGoingIn,
            playerGoingOut: message.action.playerGoingOut,
            gameTime: message.action.gameTime
        }
        this.subscribers.forEach((sub) => {
            sub.update(outMessage)
        })

    }

}

export {SubstitutionPublisher}
export type {SubstitutionInMessage, SubstitutionOutMessage}