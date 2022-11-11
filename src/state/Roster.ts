import { Player } from "./Player";

class Roster {

    public players : Map<number, Player> = new Map<number,Player>();

    public constructor(players : Array<Player>) {
        players.forEach((player) => {
            let playerNum : number = player.num;
            this.players.set(playerNum, player);
        })
    }

    public getPlayer(num : number) {
        let playerGet : Player | undefined = this.players.get(num);
        if(typeof playerGet == undefined) {
            return null
        } else {
            return playerGet;
        }
        
    }

    public substitute(playerGoingIn : number, playerGoingOut: number) {
        let playerGIn : Player = this.getPlayer(playerGoingIn);
        let playerGOut : Player = this.getPlayer(playerGoingOut);
        
        if(playerGIn.inGame && !playerGOut.inGame) {
            playerGIn.subIn();
            playerGOut.subOut();
        } else {
            console.log("warning: invalid substitution.")
        }
    }

    public putInGame(playerGoingIn : number) {
        let playerGIn : Player = this.getPlayer(playerGoingIn);
        playerGIn.subIn();
    }

    public takeOutOfGame(playerGoingIn : number) {
        let playerGIn : Player = this.getPlayer(playerGoingIn);
        playerGIn.subOut();
    }

    public getLineupString() {
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


export type {Roster};