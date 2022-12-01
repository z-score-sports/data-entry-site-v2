import { Assist, AssistOutMessage } from "./actions/Assist";
import { Block, BlockOutMessage } from "./actions/Block";
import { Foul, FoulOutMessage } from "./actions/Foul";
import { FreeThrow, FreeThrowOutMessage } from "./actions/FreeThrow";
import { Rebound, ReboundOutMessage } from "./actions/Rebound";
import { Shot, ShotOutMessage } from "./actions/Shot";
import { Steal, Turnover, TurnoverOutMessage } from "./actions/Turnover";
import { GameContext } from "./GameState";
import { Player, Team } from "./Player";
import { Subscriber } from "./Subscriber";

class AssistStats implements Subscriber {
    update(context: AssistOutMessage) {
        if (context.type === "CREATE") {
            this.assistCreate(context.action);
        } else if (context.type === "DELETE") {
            this.assistDelete(context.action);
        }
    }

    assistCreate(assist: Assist) {
        assist.assistingPlayer.assists += 1;
    }

    assistDelete(assist: Assist) {
        assist.assistingPlayer.assists -= 1;
    }
}

class BlockStats implements Subscriber {
    update(context: BlockOutMessage) {
        if (context.type === "CREATE") {
            this.blockCreate(context.action);
        } else if (context.type === "DELETE") {
            this.blockDelete(context.action);
        }
    }

    blockCreate(block: Block) {
        block.blockingPlayer.blocks += 1;
    }

    blockDelete(block: Block) {
        block.blockingPlayer.blocks -= 1;
    }
}

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

class PointStats implements Subscriber {
    update(context: ShotOutMessage | FreeThrowOutMessage) {
        if (context.publisher === "shot") {
            if (context.type === "CREATE") {
                this.shotCreate(context.action);
            } else {
                this.shotDelete(context.action);
            }
        } else if (context.publisher === "freethrow") {
            if (context.type === "CREATE") {
                this.freeThrowCreate(context.action);
            } else {
                this.freeThrowDelete(context.action);
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

class ReboundStats implements Subscriber {
    update(context: ReboundOutMessage) {
        if (context.type === "CREATE") {
            this.reboundCreate(context.action);
        } else if (context.type === "DELETE") {
            this.reboundDelete(context.action);
        }
    }

    reboundCreate(rebound: Rebound) {
        rebound.reboundingPlayer.rebounds += 1;
    }

    reboundDelete(rebound: Rebound) {
        rebound.reboundingPlayer.rebounds -= 1;
    }
}

class ThreePointStats implements Subscriber {
    update(context: ShotOutMessage) {
        if (context.type === "CREATE") {
            this.handleCreate(context.action);
        } else if (context.type === "DELETE") {
            this.handleDelete(context.action);
        }
    }

    handleCreate(shot: Shot) {
        if (shot.made && shot.region >= 5) {
            shot.shootingPlayer.threePointers += 1;
        }
    }

    handleDelete(shot: Shot) {
        if (shot.made && shot.region >= 5) {
            shot.shootingPlayer.threePointers -= 1;
        }
    }
}

class PlusMinusStats implements Subscriber {
    update(context: ShotOutMessage | FreeThrowOutMessage) {
        let points: number = 0;
        let player: Player = null;
        if (context.publisher === "shot") {
            points = context.action.shotPoints;
            player = context.action.shootingPlayer;
        } else if (context.publisher === "freethrow") {
            points = context.action.made ? 1 : 0;
            player = context.action.shootingPlayer;
        }
        if (points === 0) {
            return;
        }
        if (context.type === "CREATE") {
            this.handlePointsCreate(player, points);
        } else if (context.type === "DELETE") {
            this.handlePointsDelete(player, points);
        }
    }

    handlePointsCreate(player: Player, points: number) {
        let playerTeam: Team = player.team;
        let opposingTeam: Team =
            player.team === Team.home ? Team.away : Team.home;

        GameContext.gameRoster
            .getRoster(playerTeam)
            .players.forEach((otherPlayer) => {
                if (otherPlayer.inGame) {
                    otherPlayer.plusminus += points;
                }
            });

        GameContext.gameRoster
            .getRoster(opposingTeam)
            .players.forEach((otherPlayer) => {
                if (otherPlayer.inGame) {
                    otherPlayer.plusminus -= points;
                }
            });
    }

    handlePointsDelete(player: Player, points: number) {
        let playerTeam: Team = player.team;
        let opposingTeam: Team =
            player.team === Team.home ? Team.away : Team.home;

        GameContext.gameRoster
            .getRoster(playerTeam)
            .players.forEach((otherPlayer) => {
                if (otherPlayer.inGame) {
                    otherPlayer.plusminus -= points;
                }
            });

        GameContext.gameRoster
            .getRoster(opposingTeam)
            .players.forEach((otherPlayer) => {
                if (otherPlayer.inGame) {
                    otherPlayer.plusminus += points;
                }
            });
    }
}

class FieldGoalStats implements Subscriber {
    update(context: ShotOutMessage) {
        if (context.type === "CREATE") {
            this.handleCreate(context.action);
        } else if (context.type === "DELETE") {
            this.handleDelete(context.action);
        }
    }

    private handleCreate(shot: Shot) {
        shot.shootingPlayer.fga += 1;
        if (shot.made) {
            shot.shootingPlayer.fgm += 1;
        }
    }

    private handleDelete(shot: Shot) {
        shot.shootingPlayer.fga -= 1;
        if (shot.made) {
            shot.shootingPlayer.fgm -= 1;
        }
    }
}

class FreeThrowStats implements Subscriber {
    update(context: FreeThrowOutMessage) {
        if (context.type === "CREATE") {
            this.handleCreate(context.action);
        } else if (context.type === "DELETE") {
            this.handleDelete(context.action);
        }
    }

    private handleCreate(freethrow: FreeThrow) {
        freethrow.shootingPlayer.fta += 1;
        if (freethrow.made) {
            freethrow.shootingPlayer.ftm += 1;
        }
    }
    private handleDelete(freethrow: FreeThrow) {
        freethrow.shootingPlayer.fta -= 1;
        if (freethrow.made) {
            freethrow.shootingPlayer.ftm -= 1;
        }
    }
}

class TurnoverStats implements Subscriber {
    update(context: TurnoverOutMessage) {
        if (context.type === "CREATE") {
            this.handleCreate(context.action);
        } else if (context.type === "DELETE") {
            this.handleDelete(context.action);
        }
    }

    private handleCreate(turnover: Turnover) {
        turnover.offensivePlayer.turnovers += 1;
    }

    private handleDelete(turnover: Turnover) {
        turnover.offensivePlayer.turnovers -= 1;
    }
}

class StealStats implements Subscriber {
    update(context: TurnoverOutMessage) {
        const curAction: Turnover = context.action;
        if (curAction instanceof Steal) {
            if (context.type === "CREATE") {
                this.handleCreate(curAction);
            } else if (context.type === "DELETE") {
                this.handleDelete(curAction);
            }
        }
    }

    private handleCreate(steal: Steal) {
        steal.stealingPlayer.steals += 1;
    }

    private handleDelete(steal: Steal) {
        steal.stealingPlayer.steals -= 1;
    }
}

/*
Stats left: 
- Steals
- Turnovers
- Minutes

*/

export {
    AssistStats,
    BlockStats,
    FoulStats,
    PointStats,
    ReboundStats,
    ThreePointStats,
    PlusMinusStats,
    FieldGoalStats,
    FreeThrowStats,
    TurnoverStats,
    StealStats,
};
