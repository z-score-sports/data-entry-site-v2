import { action, makeAutoObservable } from "mobx"

import React, { createContext } from "react";
import { ActionStack } from "./ActionStack";
import { Team, Player, GameTime } from "./Player";
import { AssistPublisher } from "./publishers/AssistPublisher";
import { FoulPublisher } from "./publishers/FoulPublisher";
import { PointsPublisher } from "./publishers/PointsPublisher";
import { ReboundPublisher } from "./publishers/ReboundPublisher";
import { SubstitutionPublisher } from "./publishers/SubstitutionPublisher";
import { GameRoster, Roster } from "./Roster";
import { Scoreboard } from "./Scoreboard";

import { StatManager } from "./StatManager";

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

const tempHomeRoster = new Roster(homePlayers, Team.home, "Home");
const tempAwayRoster = new Roster(awayPlayers, Team.away, "Away");

const gameRoster = new GameRoster(tempHomeRoster, tempAwayRoster)

const scoreboard = new Scoreboard(Team.home, 4);

const statManager = new StatManager();
const actionStack = new ActionStack(Team.home)

interface game {
    gameRoster: GameRoster,
    scoreboard: Scoreboard,
    statManager: StatManager,
    actionStack: ActionStack
}


const createGameContext = () : game => {
    const tempHomeRoster = new Roster(homePlayers, Team.home, "Home");
    const tempAwayRoster = new Roster(awayPlayers, Team.away, "Away");

    const gameRoster = new GameRoster(tempHomeRoster, tempAwayRoster)

    const scoreboard = new Scoreboard(Team.home, 4);

    const statManager = new StatManager();
    const actionStack = new ActionStack(Team.home)


    PointsPublisher.getInstance().subscribe(scoreboard)
    PointsPublisher.getInstance().subscribe(statManager)
    FoulPublisher.getInstance().subscribe(scoreboard)
    FoulPublisher.getInstance().subscribe(statManager)
    ReboundPublisher.getInstance().subscribe(statManager)
    AssistPublisher.getInstance().subscribe(statManager)
    SubstitutionPublisher.getInstance().subscribe(statManager)

    return {
        gameRoster: gameRoster,
        scoreboard: scoreboard,
        statManager: statManager,
        actionStack: actionStack
    }
    
    
}

const GameContext = createGameContext();


export {GameContext}

export default createContext(GameContext)