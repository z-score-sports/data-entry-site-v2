import { makeAutoObservable } from "mobx";

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
