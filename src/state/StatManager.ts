import { AssistMessage, AssistPublisher } from "./publishers/AssistPublisher";
import { FoulMessage, FoulPublisher } from "./publishers/FoulPublisher";
import { PointsMessage, PointsPublisher } from "./publishers/PointsPublisher";
import { ReboundMessage, ReboundPublisher } from "./publishers/RebounPublisher";
import { Subscriber } from "./Subscriber";

type StatManagerContext = PointsMessage | AssistMessage | ReboundMessage | FoulMessage;

class StatManager implements Subscriber {

    public constructor() {

        PointsPublisher.getInstance().subscribe(this);
        ReboundPublisher.getInstance().subscribe(this);
        AssistPublisher.getInstance().subscribe(this);
        FoulPublisher.getInstance().subscribe(this);


    }
    public update(context: StatManagerContext) {
        if(context as PointsMessage) {
            this.handlePointsUpdate(<PointsMessage> context);
        } else if(context as AssistMessage) {
            this.handleAssistUpdate(<AssistMessage> context);
        } else if(context as ReboundMessage) {
            this.handleReboundUpdate(<ReboundMessage> context);
        } else if(context as FoulMessage) {
            this.handleFoulUpdate(<FoulMessage> context);
        }
    }

    private handlePointsUpdate(context:PointsMessage) {
        let oldImage = context.oldImage;
        let newImage = context.newImage;
        oldImage.player.points -= oldImage.points;
        newImage.player.points += newImage.points;

    }

    private handleAssistUpdate(context:AssistMessage) {
        let oldImage = context.oldImage
        let newImage = context.newImage
        oldImage.player.assists -= 1;
        newImage.player.assists += 1;

    }

    private handleReboundUpdate(context:ReboundMessage) {
        let oldImage = context.oldImage
        let newImage = context.newImage
        oldImage.player.rebounds -= 1;
        newImage.player.rebounds += 1;

    }

    private handleFoulUpdate(context:FoulMessage) {
        let oldImage = context.oldImage
        let newImage = context.newImage
        oldImage.player.fouls -= 1;
        newImage.player.fouls += 1;

    }
}