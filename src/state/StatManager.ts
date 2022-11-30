import { Team } from "./Player";
import { AssistOutMessage } from "./publishers/AssistPublisher";
import { FoulOutMessage } from "./publishers/FoulPublisher";
import { PointsOutMessage } from "./publishers/PointsPublisher";
import { ReboundOutMessage } from "./publishers/ReboundPublisher";
import { SubstitutionOutMessage } from "./publishers/SubstitutionPublisher";
import { GameContext } from "./GameState";
import { Subscriber } from "./Subscriber";

type StatManagerContext = PointsOutMessage | ReboundOutMessage | AssistOutMessage | FoulOutMessage | SubstitutionOutMessage;

class StatManager implements Subscriber {

    public constructor() {

    }

    public update(context: StatManagerContext) {
        if(context.publisher === "points") {
            this.handlePointsUpdate(context as PointsOutMessage);
        } else if(context.publisher === "assist") {
            this.handleAssistUpdate(context as AssistOutMessage);
        } else if(context.publisher === "rebound") {
            this.handleReboundUpdate(context as ReboundOutMessage);
        } else if(context.publisher === "foul") {
            this.handleFoulUpdate(context as FoulOutMessage);
        } else if(context.publisher === "substitution") {
            this.handleSubstitutionUpdate(context as SubstitutionOutMessage)
        }
    }

    private handlePointsUpdate(context:PointsOutMessage) {
        if(context.type === "CREATE"){
            context.player.points += context.points
            // now for the plus minus
            let playerTeam : Team = context.player.team
            let otherTeam : Team = context.player.team === Team.home ? Team.away : Team.home

            GameContext.gameRoster.getRoster(playerTeam).players.forEach((player) => {
                if(player.inGame){
                    player.plusminus += context.points
                }
            })
            GameContext.gameRoster.getRoster(otherTeam).players.forEach((player) => {
                if(player.inGame){
                    player.plusminus -= context.points
                }
            })
            
            
        } else if (context.type === "DELETE") {
            context.player.points -= context.points
            // now for the plus minus
            let playerTeam : Team = context.player.team
            let otherTeam : Team = context.player.team === Team.home ? Team.away : Team.home

            GameContext.gameRoster.getRoster(playerTeam).players.forEach((player) => {
                if(player.inGame){
                    player.plusminus -= context.points
                }
            })
            GameContext.gameRoster.getRoster(otherTeam).players.forEach((player) => {
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