import { AssistMessage, AssistPublisher } from "./publishers/AssistPublisher";
import { FoulMessage, FoulPublisher } from "./publishers/FoulPublisher";
import { PointsMessage, PointsPublisher } from "./publishers/PointsPublisher";
import { ReboundMessage, ReboundPublisher } from "./publishers/RebounPublisher";
import { SubstitutionMessage, SubstitutionPublisher } from "./publishers/SubstitutionPublisher";
import { Subscriber } from "./Subscriber";

type StatManagerContext = PointsMessage | AssistMessage | ReboundMessage | FoulMessage | SubstitutionMessage;

class StatManager implements Subscriber {

    public constructor() {

        PointsPublisher.getInstance().subscribe(this);
        ReboundPublisher.getInstance().subscribe(this);
        AssistPublisher.getInstance().subscribe(this);
        FoulPublisher.getInstance().subscribe(this);
        SubstitutionPublisher.getInstance().subscribe(this);


    }
    public update(context: StatManagerContext) {
        if(context.type === "points") {
            this.handlePointsUpdate(<PointsMessage> context);
        } else if(context.type === "assist") {
            this.handleAssistUpdate(<AssistMessage> context);
        } else if(context.type === "rebound") {
            this.handleReboundUpdate(<ReboundMessage> context);
        } else if(context.type === "foul") {
            this.handleFoulUpdate(<FoulMessage> context);
        } else if(context.type === "substitution") {
            this.handleSubstitutionUpdate(<SubstitutionMessage> context)
        }
    }

    private handlePointsUpdate(context:PointsMessage) {
        let oldImage = context.oldImage;
        let newImage = context.newImage;
        if(oldImage){
            oldImage.player.points -= oldImage.points;
        }
        if(newImage) {
            newImage.player.points += newImage.points;
        }

    }

    private handleAssistUpdate(context:AssistMessage) {
        let oldImage = context.oldImage
        let newImage = context.newImage
        if(oldImage){
            oldImage.player.assists -= 1;
        }
        if(newImage) {
            newImage.player.assists += 1;
        }

    }

    private handleReboundUpdate(context:ReboundMessage) {
        let oldImage = context.oldImage
        let newImage = context.newImage
        if(oldImage){
            oldImage.player.rebounds -= 1;
        }
        if(newImage) {
            newImage.player.rebounds += 1;
        }

    }

    private handleFoulUpdate(context:FoulMessage) {
        let oldImage = context.oldImage
        let newImage = context.newImage
        if(oldImage){
            oldImage.player.fouls -= 1;
        }
        if(newImage) {
            newImage.player.fouls += 1;
        }

    }
    private handleSubstitutionUpdate(context:SubstitutionMessage) {
        context.image.lineup.forEach((player) => {
            player.subOut(context.image.gameTime)
            player.subIn(context.image.gameTime)
        })
    }
}

export {StatManager}