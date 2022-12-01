import { Assist } from "../actions/Assist";
import { AssistOutMessage } from "../publishers/AssistPublisher";
import { Subscriber } from "../Subscriber";

class AssistStats implements Subscriber {

    update(context: AssistOutMessage) {
        if (context.type === "CREATE") {
            this.assistCreate(context.action)
        } else if (context.type === "DELETE") {
            this.assistDelete(context.action)
        }
    }

    assistCreate(assist: Assist) {
        assist.assistingPlayer.assists += 1
    }

    assistDelete(assist: Assist) {
        assist.assistingPlayer.assists -= 1
    }
}

export { AssistStats }