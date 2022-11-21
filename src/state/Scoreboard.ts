import { Team } from "./Player";
import { FoulMessage, FoulPublisher } from "./publishers/FoulPublisher";
import { PointsMessage, PointsPublisher } from "./publishers/PointsPublisher";
import { Subscriber } from "./Subscriber";

class Scoreboard implements Subscriber {
    quarter: number = 1
    awayPoints : number = 0;
    homePoints : number = 0;
    possessionArrow : Team;
    awayTimeouts : number;
    homeTimeouts : number;
    totalTimeouts : number;


    public constructor(startPosArrow:Team, timeouts:number) {
        this.possessionArrow = startPosArrow;
        this.totalTimeouts = timeouts;
        this.awayTimeouts = timeouts;
        this.homeTimeouts = timeouts;

        PointsPublisher.getInstance().subscribe(this)
        FoulPublisher.getInstance().subscribe(this);
    }

    public update(context: PointsMessage | FoulMessage) {
        if(context as PointsMessage) {
            this.handlePointsUpdate(<PointsMessage> context)
        } else if (context as FoulMessage) {
            this.handleFoulUpdate(<FoulMessage> context)
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



    private handlePointsUpdate(context:PointsMessage) {
        // remove the first
        let oldImage = context.oldImage
        let newImage = context.newImage
        if(oldImage) {
            let team = oldImage.player.team
            let points = oldImage.points
            if(team === Team.home){
                this.homePoints -= points
            } else {
                this.awayPoints -= points
            }
        }
        if(newImage) {
            let team = newImage.player.team
            let points = newImage.points
            if(team === Team.home) {
                this.homePoints += points
            } else {
                this.awayPoints += points
            }
        }
    }

    private handleFoulUpdate(context:FoulMessage) {
        let oldImage = context.oldImage
        let newImage = context.newImage
        if(oldImage) {
            let team = oldImage.player.team
            if(team === Team.home) {
                //update home fouls
            } else {
                //update away fouls
            }
        }
        if(newImage) {
            let team = newImage.player.team
            if(team === Team.home) {
                //update home fouls
            } else {
                //update away fouls
            }
        }
    }

    
}

export {Scoreboard}