import { makeAutoObservable, flow} from "mobx";
import { Team } from "./Player";
import { FoulOutMessage } from "./publishers/FoulPublisher";
import { PointsOutMessage } from "./publishers/PointsPublisher";
import { Subscriber } from "./Subscriber";

class Scoreboard implements Subscriber {
    quarter: number = 1
    awayPoints : number = 0;
    homePoints : number = 0;
    possessionArrow : Team;
    awayTimeouts : number;
    homeTimeouts : number;
    totalTimeouts : number;
    homeFouls : number = 0;
    awayFouls : number = 0;


    public constructor(startPosArrow:Team, timeouts:number) {

        makeAutoObservable(this)
        this.possessionArrow = startPosArrow;
        this.totalTimeouts = timeouts;
        this.awayTimeouts = timeouts;
        this.homeTimeouts = timeouts;
        
    }

    public update(context: PointsOutMessage | FoulOutMessage) {
        if(context.publisher === "points") {
            this.handlePointsUpdate(context as PointsOutMessage)
        } else if (context.publisher === "foul") {
            this.handleFoulUpdate(context as FoulOutMessage)
        }
    }

    public callTimeout(team:Team) {
        if(team === Team.home) {
            this.homeTimeouts = Math.max(this.homeTimeouts-1, 0);
        } else {
            this.awayTimeouts = Math.max(this.awayTimeouts-1, 0);
        }
    }

    public increaseQuarter() {
        this.quarter +=1;
    }

    public decreaseQuarter() {
        this.quarter = Math.max(this.quarter-1, 1);
    }



    private handlePointsUpdate(context:PointsOutMessage) {

        if(context.type === "CREATE") {
            if(context.player.team === Team.home){
                this.homePoints += context.points
            } else {
                this.awayPoints += context.points
            }
        }else if (context.type === "DELETE") {
            if(context.player.team === Team.home){
                this.homePoints -= context.points
            } else {
                this.awayPoints -= context.points
            }
        }
        
    }

    private handleFoulUpdate(context:FoulOutMessage) {
        if(context.type === "CREATE") {
            if(context.player.team === Team.home){
                this.homeFouls += 1
            } else {
                this.awayFouls += 1
            }
        }else if (context.type === "DELETE") {
            if(context.player.team === Team.home){
                this.homeFouls -= 1
            } else {
                this.awayFouls -= 1
            }
        }
    }

    
}

export {Scoreboard}