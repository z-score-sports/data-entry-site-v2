import { observable, action, computed, reaction, makeAutoObservable, makeObservable } from "mobx"

import { Player } from "../Player";
import { Action } from "./Action";
import { Assist } from "./Assist";
import { Rebound } from "./Rebound";
import { Block } from "./Block";
import { PointsPublisher } from "../publishers/PointsPublisher";
 

interface ShotImage {
    player: Player
    points: number
}
class Shot extends Action {

    shooter : Player;
    region : number;
    made : boolean;
    assist : Assist = null;
    rebound : Rebound = null;
    block : Block = null;
    
    

    constructor(shooter:Player, region: 1|2|3|4|5|6|7|8|9, made:boolean) {
        super();
        makeObservable(this, {
            shooter: observable,
            region: observable,
            made: observable,
            assist: observable,
            rebound: observable, 
            block: observable,
            shotPoints: computed,
            removeStats: action,
            editShooter: action,
            editRegion: action,
            editMade: action,
            addAssist: action,
            addBlock: action,
            addRebound: action,
            removeAssist: action,
            removeBlock: action,
            removeRebound: action,
            actionJSON: computed,
        })
        this.shooter = shooter;
        this.region = region;
        this.made = made;
        
        let newImage = this.image
        PointsPublisher.getInstance().notify(null, newImage);

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

    removeStats (): void {
        // first the properties unique to the shot 

        let image = this.image
        const publisher = PointsPublisher.getInstance()
        publisher.notify(image, null)
    }

    editShooter(newShooter : Player) {
        
        let oldImage = this.image
        this.shooter = newShooter;
        let newImage = this.image

        PointsPublisher.getInstance().notify(oldImage, newImage);

        

    }

    editRegion(newRegion : 1|2|3|4|5|6|7|8|9) {
        let oldImage = this.image
        this.region = newRegion;
        let newImage = this.image
        PointsPublisher.getInstance().notify(oldImage, newImage);
        
    }

    editMade(newMade: boolean) {
        let oldImage = this.image
        this.made = newMade;
        let newImage = this.image
        PointsPublisher.getInstance().notify(oldImage, newImage);
    }

    addAssist(assistingPlayer : Player) {
        if (!this.made) {
            console.log("warning: cannot add an assist to a missed shot.")
            return
        }
        
        let newAssist : Assist = new Assist(assistingPlayer);
        this.assist = newAssist;

    }

    removeAssist() {
        if(!this.assist) {return ;}
        this.assist.removeStats();
        this.assist = null;


    }

    addRebound(reboundingPlayer : Player) {
        if(this.made) {
            console.log("warning: cannot add a rebound to a made shot.")
            return
        }
        let newRebound : Rebound = new Rebound(reboundingPlayer);
        this.rebound = newRebound;
    }

    removeRebound() {
        if (!this.rebound){return;}

        this.rebound.removeStats();
        this.rebound = null;

    }

    addBlock(blockingPlayer : Player) {
        //validate
        if(this.made) {
            console.log("warning: cannot add a block to a made shot.")
            return
        }
        let newBlock : Block = new Block(blockingPlayer);
        this.block = newBlock;
    }

    removeBlock() {
        if(!this.block){return;}
        this.block.removeStats();
        this.block = null;

    }

    get image() : ShotImage {
        return {
            player: this.shooter,
            points: this.shotPoints
        }
    }

    get actionJSON (): Object {
        return {
            "action": "shot",
            "actionId": this.actionId,
            "shooterPlayerId": this.shooter.playerId,
            "region": this.region,
            "make": this.made,
            "assistId": this.assist ? this.assist.actionId : "",
            "reboundId": this.rebound ? this.rebound.actionId : "",
            "blockId": this.block ? this.block.actionId : ""

        }
    }
    
}

export {Shot}
export type {ShotImage}