import {GameState} from "../src/state/GameState";
import {Player, Team} from "../src/state/Player"
import { Roster } from "../src/state/Roster";


const generateBlankGame = (startTeam:Team) => {

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
    
    const tempHomeRoster = new Roster(homePlayers);
    tempHomeRoster.putInGame(0);
    tempHomeRoster.putInGame(1);
    tempHomeRoster.putInGame(2);
    tempHomeRoster.putInGame(3);
    tempHomeRoster.putInGame(4);
    const tempAwayRoster = new Roster(awayPlayers);
    tempAwayRoster.putInGame(10);
    tempAwayRoster.putInGame(11);
    tempAwayRoster.putInGame(12);
    tempAwayRoster.putInGame(13);
    tempAwayRoster.putInGame(14);

    return new GameState(startTeam)
}

export {generateBlankGame};