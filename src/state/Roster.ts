import { observable, action, computed, reaction, makeAutoObservable } from "mobx"


import { Player, Team } from "./Player";
import { SubstitutionPublisher } from "./publishers/SubstitutionPublisher";


class GameRoster {
    
    homeRoster : Roster
    awayRoster : Roster

    constructor(homeRoster : Roster, awayRoster: Roster) {
        this.homeRoster = homeRoster
        this.awayRoster = awayRoster
    }

    getRoster(team : Team){
        if(team === Team.home){
            return this.homeRoster
        } else {
            return this.awayRoster
        }
    }
}



class Roster {
    team: Team
    players : Map<number, Player> = new Map<number,Player>();

    public constructor(players : Array<Player>, team:Team) {
        makeAutoObservable(this, {})
        this.team = team
        players.forEach((player) => {
            let playerNum : number = player.num;
            this.players.set(playerNum, player);
        })
    }

    getPlayer(num : number) {
        let playerGet : Player | undefined = this.players.get(num);
        if(typeof playerGet === undefined) {
            return null
        } else {
            return playerGet;
        }
        
    }

    get lineupString() {
        let lineupArr : Array<string> = new Array<string>();
        this.players.forEach((player, playerNumber) => {
            if(player.inGame) {
                let numString : string = playerNumber.toString();
                lineupArr.push(numString)
            }
        })
        lineupArr.sort();
        return lineupArr.toString();
    }


    

}


export {GameRoster, Roster};
