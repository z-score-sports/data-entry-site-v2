import { observable, action, computed, reaction } from "mobx"


enum Team {
    home,
    away
}

class Player {
    @observable playerId : string;
    @observable num : number;
    @observable firstName : string;
    @observable lastName : string;
    @observable team : Team;
    @observable inGame : boolean = false;
    @observable fgPoints : number = 0;
    @observable fgMade : number = 0;
    @observable fgAttempted : number = 0;
    @observable rebounds : number = 0;
    @observable assists : number = 0;
    @observable blocks : number = 0;
    @observable fouls : number = 0;
    @observable steals : number = 0;
    @observable freeThrowsAttempted : number = 0;
    @observable freeThrowsMade : number = 0;

    public constructor(playerId:string, num:number, firstName:string, lastName:string, team:Team){
        this.playerId = playerId;
        this.num = num;
        this.firstName = firstName;
        this.lastName = lastName;
        this.team = team;
    }

    @computed getTeamStr() : "home" | "away"  {
        if(this.team == 0) {
            return "home"
        } else {
            return "away"
        }
    }

    @action public subIn() {
        if(this.inGame){
            console.log("warning: player already in game.");
        }
        this.inGame = true;
    }
    @action public subOut() {
        if(!this.inGame) {
            console.log("warning: player already not in game.");
        }
        this.inGame = false;
    }

    @computed getTotalPoints() : number {
        return this.fgPoints + this.freeThrowsMade;
    }

    @action addFGPoints(fgPoints:number) {this.fgPoints += fgPoints;} 
    @action removeFGPoints(fgPoints:number) {this.fgPoints = Math.max(this.fgPoints - fgPoints, 0);}
    @action addFGMade() {this.fgMade += 1;}
    @action removeFGMade() {this.fgMade = Math.max(this.fgMade-1, 0);}
    @action addFGAttempt() {this.fgAttempted += 1;}
    @action removeFGAttempt() {this.fgAttempted = Math.max(this.fgAttempted-1, 0);}


    @action addRebound() {this.rebounds++;}
    @action removeRebound() {this.rebounds = Math.max(this.rebounds-1, 0);}
    @action addAssist() {this.assists++;}
    @action removeAssist() {this.assists = Math.max(this.assists-1, 0);}
    @action addBlock() {this.blocks++;}
    @action removeBlock() {this.blocks = Math.max(this.blocks-1, 0);}
    @action addFoul() {this.fouls++;}
    @action removeFoul() {this.fouls = Math.max(this.fouls-1, 0);}
    @action addSteal() {this.steals++;}
    @action removeSteal() {this.steals = Math.max(this.steals-1, 0);}
    @action addFreeThrowMade() {this.freeThrowsMade++;}
    @action removeFreeThrowMade() {this.freeThrowsMade = Math.max(this.freeThrowsMade-1, 0);}
    @action addFreeThrowAttempt() {this.freeThrowsAttempted++;}
    @action removeFreeThrowAttempt() {this.freeThrowsAttempted = Math.max(this.freeThrowsAttempted-1, 0);}

}


export {Player, Team};