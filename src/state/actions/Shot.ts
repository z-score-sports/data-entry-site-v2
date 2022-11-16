import { observable, action, computed, reaction, makeAutoObservable, makeObservable } from "mobx"

import { Player } from "../Player";
import { Action } from "./Action";
import { Assist } from "./Assist";
import { Rebound, ReboundType } from "./Rebound";
import { Block } from "./Block";
 
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
        
        this.shooter.addFGAttempt();
        if(this.made) {
            this.shooter.addFGMade();
        }
        let points : number = this.shotPoints;
        this.shooter.addFGPoints(points);

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
        this.shooter.removeFGAttempt();
        if(this.made) {
            this.shooter.removeFGMade();
        }
        this.shooter.removeFGPoints(this.shotPoints)

        this.assist.removeStats();
        this.rebound.removeStats();
        this.block.removeStats();
        
    }

    editShooter(newShooter : Player) {
        let points : number = this.shotPoints;
        
        this.shooter.removeFGAttempt();
        if(this.made) {
            this.shooter.removeFGMade();
        }
        this.shooter.removeFGPoints(points)

        this.shooter = newShooter;

        this.shooter.addFGAttempt();
        if(this.made) {
            this.shooter.addFGMade();
        }
        this.shooter.addFGPoints(points);

    }

    editRegion(newRegion : 1|2|3|4|5|6|7|8|9) {
        //we edit the region explicitly
        //track points before and after adjusting the region...
        //add the difference
        let pointsBefore : number = this.shotPoints;
        this.region = newRegion;
        let pointsAfter : number = this.shotPoints;
        this.shooter.addFGPoints(pointsAfter - pointsBefore);
        
    }

    editMade(newMade: boolean) {

        if (newMade && !this.made) {
            this.made = newMade // setting made to true
            let points : number = this.shotPoints;
            this.shooter.addFGMade();
            this.shooter.addFGPoints(points);
        } else if(!newMade && this.made) { 
            // case when we need to decrement stats from the shooter
            let points : number = this.shotPoints;
            this.made = newMade;
            this.shooter.removeFGMade();
            this.shooter.removeFGPoints(points)

        }
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

    addRebound(reboundingPlayer : Player, reboundType : ReboundType) {
        if(this.made) {
            console.log("warning: cannot add a rebound to a made shot.")
            return
        }
        let newRebound : Rebound = new Rebound(reboundingPlayer, reboundType);
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