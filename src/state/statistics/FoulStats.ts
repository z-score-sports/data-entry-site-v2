import { Foul } from "../actions/Foul";
import { FoulOutMessage } from "../publishers/FoulPublisher";
import { Subscriber } from "../Subscriber";

class FoulStats implements Subscriber {

    update(context: FoulOutMessage) {
        if (context.type === "CREATE") {
            this.foulCreate(context.action);
        } else if (context.type === "DELETE") {
            this.foulDelete(context.action);
        }
    }

    foulCreate(foul: Foul) {
        foul.foulingPlayer.fouls += 1;
    }

    foulDelete(foul: Foul) {
        foul.foulingPlayer.fouls -= 1;
    }

}

export { FoulStats }