import { observable, action, computed, reaction, makeAutoObservable } from "mobx"


import { GameTime, Player, Team } from "./Player";
import { SubstitutionPublisher } from "./publishers/SubstitutionPublisher";

interface LineupImage {
    gameTime : GameTime
    lineup : Array<Player>
}

class Roster {

    players : Map<number, Player> = new Map<number,Player>();

    public constructor(players : Array<Player>) {
        makeAutoObservable(this, {})
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

    substitute(playerGoingIn : number, playerGoingOut: number, gameTime: GameTime) {
        let playerGIn : Player = this.getPlayer(playerGoingIn);
        let playerGOut : Player = this.getPlayer(playerGoingOut);
        
        if(!playerGIn.inGame && playerGOut.inGame) {
            playerGIn.subIn(gameTime);
            playerGOut.subOut(gameTime);
            let image : LineupImage = {
                gameTime: gameTime,
                lineup: this.lineupArray
            }
            SubstitutionPublisher.getInstance().notify(image)
        } else {
            console.log("warning: invalid substitution. No lineup changes made.")
        }
    }

    putInGame(playerGoingIn : number, gameTime:GameTime) {
        let playerGIn : Player = this.getPlayer(playerGoingIn);
        playerGIn.subIn(gameTime);
    }

    takeOutOfGame(playerGoingIn : number, gameTime:GameTime) {
        let playerGIn : Player = this.getPlayer(playerGoingIn);
        playerGIn.subOut(gameTime);
    }

    get lineupArray() {

        const curLineup : Array<Player> = Array<Player>();
        this.players.forEach((player, num) => {
            if(player.inGame) { 
                curLineup.push(player)
            }
        })
        return curLineup
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