import { makeAutoObservable } from "mobx";
import { AssistPublisher } from "./actions/Assist";
import { BlockPublisher } from "./actions/Block";
import { FoulPublisher } from "./actions/Foul";
import { FreeThrowPublisher } from "./actions/FreeThrow";
import { QuarterEndPublisher } from "./actions/QuarterEnd";
import { ReboundPublisher } from "./actions/Rebound";
import { ShotPublisher } from "./actions/Shot";
import { SubstitutionPublisher } from "./actions/Substitution";
import { TurnoverPublisher } from "./actions/Turnover";
import { Player, Team } from "./Player";

class GameRoster {
    homeRoster: Roster;
    awayRoster: Roster;

    constructor(homeRoster: Roster, awayRoster: Roster) {
        this.homeRoster = homeRoster;
        this.awayRoster = awayRoster;
    }

    getRoster(team: Team) {
        if (team === Team.home) {
            return this.homeRoster;
        } else {
            return this.awayRoster;
        }
    }
}

class Roster {
    team: Team;
    players: Map<number, Player> = new Map<number, Player>();
    teamName: string;

    public constructor(players: Array<Player>, team: Team, tName: string) {
        makeAutoObservable(this, {});
        this.team = team;
        players.forEach((player) => {
            let playerNum: number = player.num;
            this.players.set(playerNum, player);
        });
        this.teamName = tName;
    }

    addPlayer(num: number, firstName: string, lastName: string) {
        let randomId: string = (Math.random() + 1).toString(36).substring(6);
        let newPlayer: Player = new Player(
            randomId,
            num,
            firstName,
            lastName,
            this.team,
            false
        );
        this.players.set(newPlayer.num, newPlayer);
        AssistPublisher.getInstance().subscribe(newPlayer);
        BlockPublisher.getInstance().subscribe(newPlayer);
        FoulPublisher.getInstance().subscribe(newPlayer);
        FreeThrowPublisher.getInstance().subscribe(newPlayer);
        ReboundPublisher.getInstance().subscribe(newPlayer);
        ShotPublisher.getInstance().subscribe(newPlayer);
        TurnoverPublisher.getInstance().subscribe(newPlayer);
        SubstitutionPublisher.getInstance().subscribe(newPlayer);
    }

    removePlayer(num: number) {
        this.players.delete(num);
    }

    getPlayer(num: number) {
        let playerGet: Player | undefined = this.players.get(num);
        if (typeof playerGet === undefined) {
            return null;
        } else {
            return playerGet;
        }
    }
    getPlayerArr() {
        return Array.from(this.players.values());
    }

    get lineupString() {
        let lineupArr: Array<string> = new Array<string>();
        this.players.forEach((player, playerNumber) => {
            if (player.inGame) {
                let numString: string = playerNumber.toString();
                lineupArr.push(numString);
            }
        });
        lineupArr.sort();
        return lineupArr.toString();
    }
}

export { GameRoster, Roster };
