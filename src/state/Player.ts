enum Team {
    home,
    away
}

class Player {
    public playerId : string;
    public num : number;
    public firstName : string;
    public lastName : string;
    public team : Team;
    public inGame : boolean = false;
    public fgPoints : number = 0;
    public shots : number = 0;
    public rebounds : number = 0;
    public assists : number = 0;
    public blocks : number = 0;
    public fouls : number = 0;
    public steals : number = 0;
    public freeThrowsAttempted : number = 0;
    public freeThrowsMade : number = 0;

    public constructor(playerId:string, num:number, firstName:string, lastName:string, team:Team){
        this.playerId = playerId;
        this.num = num;
        this.firstName = firstName;
        this.lastName = lastName;
        this.team = team;
    }

    public getTeamStr() : "home" | "away"  {
        if(this.team == 0) {
            return "home"
        } else {
            return "away"
        }
    }

    public subIn() {
        if(this.inGame){
            console.log("warning: player already in game.");
        }
        this.inGame = true;
    }
    public subOut() {
        if(!this.inGame) {
            console.log("warning: player already not in game.");
        }
        this.inGame = false;
    }

    public getTotalPoints() : number {
        return this.fgPoints + this.freeThrowsMade;
    }

    public addFGPoints(fgPoints:number) {this.fgPoints += fgPoints;} 
    public removeFGPoints(fgPoints:number) {this.fgPoints = Math.max(this.fgPoints - fgPoints, 0);}
    public addShot() {this.shots++;}
    public removeShot() {Math.max(this.shots-1, 0);}
    public addRebound() {this.rebounds++;}
    public removeRebound() {Math.max(this.rebounds-1, 0);}
    public addAssist() {this.assists++;}
    public removeAssist() {Math.max(this.assists-1, 0);}
    public addBlock() {this.blocks++;}
    public removeBlock() {Math.max(this.blocks-1, 0);}
    public addFoul() {this.fouls++;}
    public removeFoul() {Math.max(this.fouls-1, 0);}
    public addSteal() {this.steals++;}
    public removeSteal() {Math.max(this.steals-1, 0);}
    public addFreeThrowMade() {this.freeThrowsMade++;}
    public removeFreeThrowMade() {Math.max(this.freeThrowsMade-1, 0);}
    public addFreeThrowAttempt() {this.freeThrowsAttempted++;}
    public removeFreeThrowAttempt() {Math.max(this.freeThrowsAttempted-1, 0);}

}


export {Player, Team};