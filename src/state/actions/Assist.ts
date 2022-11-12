import { Player } from "../Player";
import { Action } from "./Action";


class Assist extends Action {
    public assistingPlayer : Player;
    

    public constructor(assistingPlayer : Player) {
        super();
        this.assistingPlayer = assistingPlayer;
        this.assistingPlayer.addAssist();
    }

    public removeStats (): void {
        this.assistingPlayer.removeAssist();
    }

    public editAssistingPlayer(newAssistingPlayer : Player) {
        this.assistingPlayer.removeAssist();
        this.assistingPlayer = newAssistingPlayer;
        this.assistingPlayer.addAssist();
    }


    actionJSON (): Object {
        return {
            "action": "assist",
            "actionId": this.actionId,
            "assistingPlayerId": this.assistingPlayer.playerId,
        }
    }
    
}

export {Assist}