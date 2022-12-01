import { Block } from "../actions/Block";
import { BlockOutMessage } from "../actions/Block";
import { Subscriber } from "../Subscriber";



class BlockStats implements Subscriber {

    update(context: BlockOutMessage) {
        if (context.type === "CREATE") {
            this.blockCreate(context.action)
        } else if (context.type === "DELETE") {
            this.blockDelete(context.action)
        }
    }

    blockCreate(block: Block) {
        block.blockingPlayer.blocks += 1;
    }

    blockDelete(block: Block) {
        block.blockingPlayer.blocks -= 1;
    }
}

export { BlockStats }