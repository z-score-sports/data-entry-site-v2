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
    fgPoints : number = 0;
    fgMade : number = 0;
    fgAttempted : number = 0;
    rebounds : number = 0;
    assists : number = 0;
    blocks : number = 0;
    fouls : number = 0;
    steals : number = 0;
    freeThrowsAttempted : number = 0;
    freeThrowsMade : number = 0;

    public constructor(playerId:string, num:number, firstName:string, lastName:string, team:Team){
        makeAutoObservable(this)
        this.playerId = playerId;
        this.num = num;
        this.firstName = firstName;
        this.lastName = lastName;
        this.team = team;
    }

    get teamStr() : "home" | "away"  {
        if(this.team === Team.home) {
            return "home"
        } else {
            return "away"
        }
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
    
    get totalPoints() : number {
        return this.fgPoints + this.freeThrowsMade;
    }

    addFGPoints(fgPoints:number) {this.fgPoints += fgPoints;} 
    removeFGPoints(fgPoints:number) {this.fgPoints = Math.max(this.fgPoints - fgPoints, 0);}
    addFGMade() {this.fgMade += 1;}
    removeFGMade() {this.fgMade = Math.max(this.fgMade-1, 0);}
    addFGAttempt() {this.fgAttempted += 1;}
    removeFGAttempt() {this.fgAttempted = Math.max(this.fgAttempted-1, 0);}
    addRebound() {this.rebounds++;}
    removeRebound() {this.rebounds = Math.max(this.rebounds-1, 0);}
    addAssist() {this.assists++;}
    removeAssist() {this.assists = Math.max(this.assists-1, 0);}
    addBlock() {this.blocks++;}
    removeBlock() {this.blocks = Math.max(this.blocks-1, 0);}
    addFoul() {this.fouls++;}
    removeFoul() {this.fouls = Math.max(this.fouls-1, 0);}
    addSteal() {this.steals++;}
    removeSteal() {this.steals = Math.max(this.steals-1, 0);}
    addFreeThrowMade() {this.freeThrowsMade++;}
    removeFreeThrowMade() {this.freeThrowsMade = Math.max(this.freeThrowsMade-1, 0);}
    addFreeThrowAttempt() {this.freeThrowsAttempted++;}
    removeFreeThrowAttempt() {this.freeThrowsAttempted = Math.max(this.freeThrowsAttempted-1, 0);}

}


export {Player, Team};