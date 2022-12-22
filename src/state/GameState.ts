import { createContext } from "react";
import { AssistPublisher } from "./actions/Assist";
import { BlockPublisher } from "./actions/Block";
import { FoulPublisher } from "./actions/Foul";
import { FreeThrowPublisher } from "./actions/FreeThrow";
import { QuarterEndPublisher } from "./actions/QuarterEnd";
import { ReboundPublisher } from "./actions/Rebound";
import { ShotPublisher } from "./actions/Shot";
import { SubstitutionPublisher } from "./actions/Substitution";
import { TurnoverPublisher } from "./actions/Turnover";
import { ActionStack } from "./ActionStack";
import { GameTime } from "./GameTime";
import { BaseNode, NodeInterface } from "./Nodes";
import { Player, Team } from "./Player";
import { GameRoster, Roster } from "./Roster";
import { Scoreboard } from "./Scoreboard";

const p1_h = new Player("000000", 0, "A", "Adams", Team.home, true);
const p2_h = new Player("000001", 1, "B", "Baker", Team.home, true);
const p3_h = new Player("000002", 2, "C", "Clark", Team.home, true);
const p4_h = new Player("000003", 3, "D", "Davis", Team.home, true);
const p5_h = new Player("000004", 4, "E", "Evans", Team.home, true);
const p6_h = new Player("000005", 5, "F", "Frank", Team.home, false);

const p1_a = new Player("000010", 10, "G", "Ghosh", Team.away, true);
const p2_a = new Player("000011", 11, "H", "Hills", Team.away, true);
const p3_a = new Player("000012", 12, "I", "Irwin", Team.away, true);
const p4_a = new Player("000013", 13, "J", "Jones", Team.away, true);
const p5_a = new Player("000014", 14, "K", "Klein", Team.away, true);
const p6_a = new Player("000015", 15, "L", "Lopez", Team.away, false);

const homePlayers = new Array<Player>(p1_h, p2_h, p3_h, p4_h, p5_h, p6_h);
const awayPlayers = new Array<Player>(p1_a, p2_a, p3_a, p4_a, p5_a, p6_a);

const initialGameTime = new GameTime(1, 12, 0);

interface game {
    gameRoster: GameRoster;
    scoreboard: Scoreboard;
    actionStack: ActionStack;
    currentInputNode: NodeInterface;
}

const createGameContext = (): game => {
    const tempHomeRoster = new Roster(homePlayers, Team.home, "Home");
    const tempAwayRoster = new Roster(awayPlayers, Team.away, "Away");

    const gameRoster = new GameRoster(tempHomeRoster, tempAwayRoster);

    const scoreboard = new Scoreboard(Team.home, 4);

    const actionStack = new ActionStack(Team.home, initialGameTime);

    gameRoster.awayRoster.players.forEach((player) => {
        AssistPublisher.getInstance().subscribe(player);
        BlockPublisher.getInstance().subscribe(player);
        FoulPublisher.getInstance().subscribe(player);
        FreeThrowPublisher.getInstance().subscribe(player);
        ReboundPublisher.getInstance().subscribe(player);
        ShotPublisher.getInstance().subscribe(player);
        TurnoverPublisher.getInstance().subscribe(player);
        SubstitutionPublisher.getInstance().subscribe(player);
    });
    gameRoster.homeRoster.players.forEach((player) => {
        AssistPublisher.getInstance().subscribe(player);
        BlockPublisher.getInstance().subscribe(player);
        FoulPublisher.getInstance().subscribe(player);
        FreeThrowPublisher.getInstance().subscribe(player);
        ReboundPublisher.getInstance().subscribe(player);
        ShotPublisher.getInstance().subscribe(player);
        TurnoverPublisher.getInstance().subscribe(player);
        SubstitutionPublisher.getInstance().subscribe(player);
    });

    ShotPublisher.getInstance().subscribe(scoreboard);
    FoulPublisher.getInstance().subscribe(scoreboard);
    FreeThrowPublisher.getInstance().subscribe(scoreboard);
    QuarterEndPublisher.getInstance().subscribe(scoreboard);

    let currentInputNode = new BaseNode();

    return {
        gameRoster: gameRoster,
        scoreboard: scoreboard,
        actionStack: actionStack,
        currentInputNode: currentInputNode,
    };
};

const GameContext = createGameContext();

export { GameContext };

export default createContext(GameContext)