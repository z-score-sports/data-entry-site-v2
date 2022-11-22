import { observable, action, computed, reaction, makeAutoObservable } from "mobx"


import { GameTime, Player, Team } from "./Player";
import { SubstitutionPublisher } from "./publishers/SubstitutionPublisher";

interface LineupImage {
    gameTime : GameTime
    team: Team
    lineup : Array<Player>
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


export {Roster};
export type {LineupImage}