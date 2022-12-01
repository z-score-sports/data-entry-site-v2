import { makeAutoObservable } from "mobx";
import { Team } from "./Player";
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

    public update(context: any) {
        if(context.publisher === "points") {

        } else if (context.publisher === "foul") {

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


    
}

export { Scoreboard };
