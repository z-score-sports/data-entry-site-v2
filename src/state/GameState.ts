import { Team, Player } from "./Player";
import { Possession } from "./Possession";
import { Roster } from "./Roster";

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



class GameState {
    quarter : number = 1;
    possessionArrow : Team;
    homeTimeouts : number = 4;
    awayTimeouts : number = 4;
    homeRoster : Roster = new Roster(homePlayers);
    awayRoster : Roster = new Roster(awayPlayers);
    possessionStack : Array<Possession> = new Array<Possession>();
    currentPossession : Possession = null;

    constructor(startTeam : Team) {
        this.currentPossession = new Possession(this.quarter, startTeam)

    }

    callTimeout(team : Team) {
        if(team == Team.home) {
            this.homeTimeouts--;
        } else {
            this.awayTimeouts--;
        }
    }

    increaseQuarter() {
        this.quarter++;
    }

    decreaseQuarter() {
        this.quarter = Math.max(this.quarter-1, 1);
    }

    changePossessionArray() {
        this.possessionArrow = this.possessionArrow === Team.away ? Team.home : Team.away;
    }

    substitute(team:Team, playerGoingIn:number, playerGoingOut:number) {
        if(team === Team.home) {
            this.homeRoster.substitute(playerGoingIn, playerGoingOut);
        } else {
            this.awayRoster.substitute(playerGoingIn, playerGoingOut);
        }
    }


    endPossession() {
        let team : Team = this.currentPossession.offenseTeam;
        this.currentPossession.homeLineupString = this.homeRoster.getLineupString();
        this.currentPossession.awayLineupString = this.awayRoster.getLineupString();
        this.currentPossession.quarter = this.quarter;
        this.possessionStack.push(this.currentPossession)
        this.currentPossession = new Possession(this.quarter, team);
    }

}

export {GameState}