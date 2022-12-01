import { FreeThrow } from "../actions/FreeThrow";
import { Shot } from "../actions/Shot";
import { FreeThrowOutMessage } from "../publishers/FreeThrowPublisher";
import { ShotOutMessage } from "../publishers/ShotPublisher";
import { Subscriber } from "../Subscriber";

type pointsStatsContext = ShotOutMessage | FreeThrowOutMessage

class PointStats implements Subscriber {



    update(context: pointsStatsContext) {
        if (context.publisher === "shot") {
            if (context.type === "CREATE") {
                this.shotCreate(context.action)
            } else {
                this.shotDelete(context.action)
            }
        } else if (context.publisher === "freethrow") {
            if (context.type === "CREATE") {
                this.freeThrowCreate(context.action)
            } else {
                this.freeThrowDelete(context.action)
            }


        }
    }

    shotCreate(shot: Shot) {
        if (shot.made) {
            shot.shootingPlayer.points += shot.shotPoints;
        }
    }

    shotDelete(shot: Shot) {
        if (shot.made) {
            shot.shootingPlayer.points -= shot.shotPoints;
        }
    }

    freeThrowCreate(freethrow: FreeThrow) {
        if (freethrow.made) {
            freethrow.shootingPlayer.points += 1;
        }
    }

    freeThrowDelete(freethrow: FreeThrow) {
        if (freethrow.made) {
            freethrow.shootingPlayer.points -= 1;
        }
    }


}

export { PointStats }; 