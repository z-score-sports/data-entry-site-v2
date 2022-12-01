import { observable, action, computed, reaction, makeAutoObservable, makeObservable } from "mobx"

import { Player } from "../Player";
import { createDelete, Publisher } from "../Publisher";

import { Action } from "./Action";

type region = 1|2|3|4|5|6|7|8|9;
 
class Shot extends Action {

    shootingPlayer : Player;
    region : number;
    made : boolean;
    
    

    constructor(shootingPlayer:Player, region: region, made:boolean) {
        super();
        makeObservable(this, {
            shootingPlayer: observable,
            region: observable,
            made: observable,
            actionJSON: computed,
        })
        this.shootingPlayer = shootingPlayer;
        this.region = region;
        this.made = made;
        
    }

    get shotPoints() : number {
        if(!this.made){
            return 0;
        } else if (this.region <= 4){
            return 2;
        } else {
            return 3;
        }
    }

    createNotify (): void {
        ShotPublisher.getInstance().notify({
            type: "CREATE",
            action: this
        }) 
    }

    deleteNotify () {
        ShotPublisher.getInstance().notify({
            type: "DELETE",
            action: this
        })
    }

    get actionJSON (): Object {
        return {
            "action": "shot",
            "actionId": this.actionId,
            "shootingPlayerId": this.shootingPlayer.playerId,
            "region": this.region,
            "make": this.made,

        }
    }
    
}

interface ShotInMessage {
    type: createDelete
    action: Shot
}

interface ShotOutMessage {
    publisher: "shot"
    type: createDelete
    action: Shot
}

class ShotPublisher extends Publisher {
    private static instance: ShotPublisher
    private constructor() {
        super()
    }

    public static getInstance(): ShotPublisher {
        if (!ShotPublisher.instance) {
            this.instance = new ShotPublisher();
        }
        return this.instance
    }

    public notify(message: ShotInMessage) {
        if (!message.action) { return; }
        const outMessage: ShotOutMessage = {
            publisher: "shot",
            type: message.type,
            action: message.action
        }

        this.subscribers.forEach((sub) => {
            sub.update(outMessage)
        })

    }

}

export { Shot, ShotPublisher }
export type { ShotInMessage, ShotOutMessage, region }

