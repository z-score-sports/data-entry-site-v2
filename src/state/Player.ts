import { makeAutoObservable } from "mobx"


enum Team {
    home,
    away
}

class Player {
    playerId : string;
    num : number;
    firstName : string;
    lastName : string;
    team : Team;
    inGame : boolean = false;
    points : number = 0;
    rebounds : number = 0;
    assists : number = 0;
    plusminus : number = 0;
    minutes : number = 0;
    fouls : number = 0;

    public constructor(playerId:string, num:number, firstName:string, lastName:string, team:Team){
        makeAutoObservable(this)
        this.playerId = playerId;
        this.num = num;
        this.firstName = firstName;
        this.lastName = lastName;
        this.team = team;
    }

    subIn() {
        if(this.inGame){
            console.log("warning: player already in game.");
        }
        this.inGame = true;
    }
    subOut() {
        if(!this.inGame) {
            console.log("warning: player already not in game.");
        }
        this.inGame = false;
    }

    

}


export {Player, Team};