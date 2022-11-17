import { observable, action, computed, reaction, makeAutoObservable } from "mobx"


import { Player } from "./Player";

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
        if(typeof playerGet == undefined) {
            return null
        } else {
            return playerGet;
        }
        
    }

    substitute(playerGoingIn : number, playerGoingOut: number) {
        let playerGIn : Player = this.getPlayer(playerGoingIn);
        let playerGOut : Player = this.getPlayer(playerGoingOut);
        
        if(playerGIn.inGame && !playerGOut.inGame) {
            playerGIn.subIn();
            playerGOut.subOut();
        } else {
            console.log("warning: invalid substitution. No lineup changes made.")
        }
    }

    putInGame(playerGoingIn : number) {
        let playerGIn : Player = this.getPlayer(playerGoingIn);
        playerGIn.subIn();
    }

    takeOutOfGame(playerGoingIn : number) {
        let playerGIn : Player = this.getPlayer(playerGoingIn);
        playerGIn.subOut();
    }

    get teamFouls() : number  {
        let totalFouls : number = 0;
        this.players.forEach((player, playerNum) => {
            totalFouls += player.fouls;
        })
        return totalFouls;
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

    get pointsScored() {
        let totalPoints : number = 0;
        this.players.forEach((player, playerNumber) => {
            totalPoints += player.totalPoints
        })
        return totalPoints;
    }


    

}


export {Roster};