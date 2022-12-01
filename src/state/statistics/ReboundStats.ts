import { Rebound } from "../actions/Rebound";
import { ReboundOutMessage } from "../actions/Rebound";
import { Subscriber } from "../Subscriber";

class ReboundStats implements Subscriber {

    update(context: ReboundOutMessage) {
        if (context.type === "CREATE") {
            this.reboundCreate(context.action)
        } else if (context.type === "DELETE") {
            this.reboundDelete(context.action)
        }
    }

    reboundCreate(rebound: Rebound) {
        rebound.reboundingPlayer.rebounds += 1;
    }

    reboundDelete(rebound: Rebound) {
        rebound.reboundingPlayer.rebounds -= 1;

    }
}

export { ReboundStats }