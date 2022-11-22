import { Team } from "./Player";
import { AssistOutMessage, AssistPublisher } from "./publishers/AssistPublisher";
import { FoulOutMessage, FoulPublisher } from "./publishers/FoulPublisher";
import { PointsOutMessage, PointsPublisher } from "./publishers/PointsPublisher";
import { ReboundOutMessage, ReboundPublisher } from "./publishers/ReboundPublisher";
import { SubstitutionOutMessage, SubstitutionPublisher } from "./publishers/SubstitutionPublisher";
import { Roster } from "./Roster";
import { Subscriber } from "./Subscriber";

type StatManagerContext = PointsOutMessage | ReboundOutMessage | AssistOutMessage | FoulOutMessage | SubstitutionOutMessage;

class StatManager implements Subscriber {

    homeRoster : Roster;
    awayRoster : Roster;

    public constructor(homeRoster : Roster, awayRoster: Roster) {

        this.homeRoster = homeRoster;
        this.awayRoster = awayRoster;

        PointsPublisher.getInstance().subscribe(this);
        ReboundPublisher.getInstance().subscribe(this);
        AssistPublisher.getInstance().subscribe(this);
        FoulPublisher.getInstance().subscribe(this);
        SubstitutionPublisher.getInstance().subscribe(this);


    }

    getRoster(team: Team) {
        if(team === Team.home){
            return this.homeRoster
        } else {
            return this.awayRoster
        }
    }

    public update(context: StatManagerContext) {
        if(context.publisher === "points") {
            this.handlePointsUpdate(<PointsOutMessage> context);
        } else if(context.publisher === "assist") {
            this.handleAssistUpdate(<AssistOutMessage> context);
        } else if(context.publisher === "rebound") {
            this.handleReboundUpdate(<ReboundOutMessage> context);
        } else if(context.publisher === "foul") {
            this.handleFoulUpdate(<FoulOutMessage> context);
        } else if(context.publisher === "substitution") {
            this.handleSubstitutionUpdate(<SubstitutionOutMessage> context)
        }
    }

    private handlePointsUpdate(context:PointsOutMessage) {
        if(context.type === "CREATE"){
            context.player.points += context.points
            // now for the plus minus
            let playerTeam : Team = context.player.team
            let otherTeam : Team = context.player.team === Team.home ? Team.away : Team.home

            this.getRoster(playerTeam).players.forEach((player) => {
                if(player.inGame){
                    player.plusminus += context.points
                }
            })
            this.getRoster(otherTeam).players.forEach((player) => {
                if(player.inGame){
                    player.plusminus -= context.points
                }
            })
            
            
        } else if (context.type === "DELETE") {
            context.player.points -= context.points
            // now for the plus minus
            let playerTeam : Team = context.player.team
            let otherTeam : Team = context.player.team === Team.home ? Team.away : Team.home

            this.getRoster(playerTeam).players.forEach((player) => {
                if(player.inGame){
                    player.plusminus -= context.points
                }
            })
            this.getRoster(otherTeam).players.forEach((player) => {
                if(player.inGame){
                    player.plusminus += context.points
                }
            })
        }

    }

    private handleAssistUpdate(context:AssistOutMessage) {
        if(context.type === "CREATE"){
            context.player.assists += 1;
        } else if (context.type === "DELETE") {
            context.player.assists -= 1;
        }

    }

    private handleReboundUpdate(context:ReboundOutMessage) {
        if(context.type === "CREATE"){
            context.player.rebounds += 1;
        } else if (context.type === "DELETE") {
            context.player.rebounds -= 1;
        }

    }

    private handleFoulUpdate(context:FoulOutMessage) {
        if(context.type === "CREATE"){
            context.player.fouls += 1;
        } else if (context.type === "DELETE") {
            context.player.fouls -= 1;
        }

    }
    private handleSubstitutionUpdate(context:SubstitutionOutMessage) {
        
    }
}

export {StatManager}