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
    public points : number = 0;
    public shots : number = 0;
    public rebounds : number = 0;
    public assists : number = 0;
    public blocks : number = 0;
    public fouls : number = 0;
    public steals : number = 0;

    public constructor(playerId:string, num:number, firstName:string, lastName:string, team:Team){
        this.playerId = playerId;
        this.num = num;
        this.firstName = firstName;
        this.lastName = lastName;
        this.team = team;
    }

    public getTeamStr() {
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

    public addPoints(points:number) {this.points += points;} 
    public removePoints(points:number) {this.points = Math.max(this.points - points, 0);}
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
    
}


export type {Player, Team};