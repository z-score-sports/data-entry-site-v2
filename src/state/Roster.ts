import { Player } from "./Player";

class Roster {

    public players : Map<number, Player> = new Map<number,Player>();
    public lineup : Array<Player> = new Array<Player>;

    public constructor(players : Array<Player>) {
        players.forEach((player) => {
            if(this.lineup.length < 5){
                this.lineup.push(player);
            }
            let playerNum : number = player.num;
            this.players.set(playerNum, player);
        })
    }

    public getPlayer(num : number) {
        
    }

    public substitute(playerGoingIn : number, playerGoingOut: number) {
        
    }

    

}


export type {Roster};