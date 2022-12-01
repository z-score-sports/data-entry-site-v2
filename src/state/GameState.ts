import { createContext } from "react";
import { AssistPublisher } from "./actions/Assist";
import { BlockPublisher } from "./actions/Block";
import { FoulPublisher } from "./actions/Foul";
import { FreeThrowPublisher } from "./actions/FreeThrow";
import { ReboundPublisher } from "./actions/Rebound";
import { ShotPublisher } from "./actions/Shot";
import { ActionStack } from "./ActionStack";
import { Team, Player } from "./Player";
import { GameRoster, Roster } from "./Roster";
import { Scoreboard } from "./Scoreboard";
import { AssistStats } from "./statistics/AssistStats";
import { BlockStats } from "./statistics/BlockStats";
import { FoulStats } from "./statistics/FoulStats";
import { PointStats } from "./statistics/PointStats";
import { ReboundStats } from "./statistics/ReboundStats";

const p1_h = new Player("000000", 0, "A", "Adams", Team.home);
const p2_h = new Player("000001", 1, "B", "Baker", Team.home);
const p3_h = new Player("000002", 2, "C", "Clark", Team.home);
const p4_h = new Player("000003", 3, "D", "Davis", Team.home);
const p5_h = new Player("000004", 4, "E", "Evans", Team.home);
const p6_h = new Player("000005", 5, "F", "Frank", Team.home);

const p1_a = new Player("000010", 10, "G", "Ghosh", Team.away);
const p2_a = new Player("000011", 11, "H", "Hills", Team.away);
const p3_a = new Player("000012", 12, "I", "Irwin", Team.away);
const p4_a = new Player("000013", 13, "J", "Jones", Team.away);
const p5_a = new Player("000014", 14, "K", "Klein", Team.away);
const p6_a = new Player("000015", 15, "L", "Lopez", Team.away);

const homePlayers = new Array<Player>(p1_h, p2_h, p3_h, p4_h, p5_h, p6_h);
const awayPlayers = new Array<Player>(p1_a, p2_a, p3_a, p4_a, p5_a, p6_a);

p1_h.inGame = true;
p2_h.inGame = true;
p3_h.inGame = true;
p4_h.inGame = true;
p5_h.inGame = true;
p1_a.inGame = true;
p2_a.inGame = true;
p3_a.inGame = true;
p4_a.inGame = true;
p5_a.inGame = true;

interface game {
    gameRoster: GameRoster,
    scoreboard: Scoreboard,
    actionStack: ActionStack
}


const createGameContext = (): game => {
    const tempHomeRoster = new Roster(homePlayers, Team.home, "Home");
    const tempAwayRoster = new Roster(awayPlayers, Team.away, "Away");

    const gameRoster = new GameRoster(tempHomeRoster, tempAwayRoster)

    const scoreboard = new Scoreboard(Team.home, 4);

    const actionStack = new ActionStack(Team.home)

    const pointsStats = new PointStats();
    const reboundStats = new ReboundStats();
    const assistStats = new AssistStats();
    const blockStats = new BlockStats();
    const foulStats = new FoulStats();

    ShotPublisher.getInstance().subscribe(pointsStats)
    FreeThrowPublisher.getInstance().subscribe(pointsStats)
    ReboundPublisher.getInstance().subscribe(reboundStats)
    AssistPublisher.getInstance().subscribe(assistStats)
    BlockPublisher.getInstance().subscribe(blockStats);
    FoulPublisher.getInstance().subscribe(foulStats)


    return {
        gameRoster: gameRoster,
        scoreboard: scoreboard,
        actionStack: actionStack
    }


}

const GameContext = createGameContext();


export { GameContext }

export default createContext(GameContext)