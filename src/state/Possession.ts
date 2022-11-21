import { observable, action, computed, reaction, makeAutoObservable } from "mobx"


import { Action } from "./actions/Action";
import { Foul } from "./actions/Foul";
import { FreeThrow } from "./actions/FreeThrow";
import { Shot } from "./actions/Shot";
import { Steal, Turnover } from "./actions/Turnover";
import { Player, Team } from "./Player";

class Possession {
    possessionId : string;
    quarter : number = null;
    offenseTeam : Team;
    homeLineupString : string = null;
    awayLineupString : string = null;
    actions : Array<Shot|Foul|Turnover> = new Array<Shot|Foul|Turnover>();
    
    constructor(offenseTeam : Team) {
        makeAutoObservable(this, {
            possessionId: false,
            quarter: false,
            homeLineupString: false,
            awayLineupString: false
            
        })
        this.possessionId = crypto.randomUUID();
        this.offenseTeam = offenseTeam;
    }

    get lastShot() : Shot {
        for(let i = this.actions.length-1; i >= 0; i--) {
            let tempAction : Action = this.actions[i]
            if(tempAction instanceof Shot) {
                return tempAction
            }
        }
        return null
    }

    get lastFoul() : Foul {
        for(let i = this.actions.length-1; i >= 0; i--) {
            let tempAction : Action = this.actions[i]
            if(tempAction instanceof Foul) {
                return tempAction
            }
        }
        return null
    }

    get lastTurnover() : Turnover {
        for(let i = this.actions.length-1; i >= 0; i--) {
            let tempAction : Action = this.actions[i]
            if(tempAction instanceof Turnover) {
                return tempAction
            }
        }
        return null
    }

    get lastFTorShot() : Shot | FreeThrow {
        for(let i = this.actions.length-1; i >= 0; i--) {
            let tempAction : Action = this.actions[i]
            if (tempAction instanceof Shot) {
                return tempAction
            } else if(tempAction instanceof Foul) {
                return tempAction.lastFreeThrow;
            }
        }

        return null
    }

    addShot(shooter:Player, region: 1|2|3|4|5|6|7|8|9, made:boolean) {
        let newShot : Shot = new Shot(shooter, region, made);
        this.actions.push(newShot);
    }

    addFoul(foulingPlayer:Player) {
        let newFoul : Foul = new Foul(foulingPlayer);
        this.actions.push(newFoul);
    }

    addTurnover(offensivePlayer:Player) {
        let newTurnover : Turnover = new Turnover(offensivePlayer);
        this.actions.push(newTurnover);
    }

    addSteal(offensivePlayer:Player, stealingPlayer : Player) {
        let newSteal : Steal = new Steal(offensivePlayer, stealingPlayer);
        this.actions.push(newSteal);
    }

    addAssist(assistingPlayer:Player) {
        let prevShot : Shot = this.lastShot;
        if(!prevShot) {
            console.log("warning: trying to add an assist before shot")
            return
        }
        prevShot.addAssist(assistingPlayer);
    }

    addBock(blockingPlayer:Player) {
        let prevShot : Shot = this.lastShot;
        if(!prevShot) {
            console.log("warning: trying to add a block before shot")
            return
        }
        prevShot.addBlock(blockingPlayer);
    }
    
    addFreeThrow(shootingPlayer : Player, made : boolean) {
        let prevFoul : Foul = this.lastFoul;
        if(!prevFoul) {
            console.log("warning: trying to add free throw before foul.")
            return
        }
        prevFoul.addFreeThrow(shootingPlayer, made);
    }

    addRebound(reboundingPlayer : Player) {
        let prevFTorShot : Shot | FreeThrow = this.lastFTorShot;
        if(!prevFTorShot) {
            console.log("warning: trying to add a rebound to nonesistent shot or free throw")
            return
        }
        prevFTorShot.addRebound(reboundingPlayer);
    }

    removeStats() {
        this.actions.forEach((action) => {
            action.removeStats();
        })
    }
    
    removeAction() {
        //going to assume that the only action you can remove is the last one
        let action : Action = this.actions.pop();
        action.removeStats();
    }

    get possessionPoints () {
        let points : number = 0;
        this.actions.forEach((action) => {
            if(action instanceof Shot){
                points += action.shotPoints;
            } else if(action instanceof Foul) {
                action.freeThrows.forEach((ft) => {
                    points += ft.made ? 1 : 0;
                })
            }
        })
        return points;
    }
    get image() {
        return {
            "points": this.possessionPoints,
            "offense": this.offenseTeam,
            "homeLineup": this.homeLineupString,
            "awayLineup": this.awayLineupString
        }
    }

    // adding other types of actions should come from:
    //1) gamestate uses current possession to get the last Shot/Foul
    //2) calling those action's add method with the properties
}

export {Possession};