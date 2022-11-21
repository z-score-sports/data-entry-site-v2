import { makeAutoObservable } from "mobx"


enum Team {
    home,
    away
}

class GameTime {
    quarter: number
    minute: number
    second: number
    
    quarterMinuteStart: number = 12;

    constructor(quarter:number, minute:number, second:number, quarterMinuteStart:number=12){
        this.quarter = quarter
        this.minute = minute
        this.second = second
        this.quarterMinuteStart = quarterMinuteStart
    }

    get quarterTimeLeft() : number {
        let fraction = this.second / 60;
        return this.minute + fraction
    }

    get quarterTimePassed() {
        return this.quarterMinuteStart - this.quarterTimeLeft
    }

    public static timeDiff(startTime: GameTime, endTime:GameTime) {
        if(startTime.quarter === endTime.quarter) {
            return startTime.quarterTimeLeft - endTime.quarterTimeLeft
        } else {
            let total = 0;
            if(endTime.quarter > startTime.quarter + 1) {
                total += (endTime.quarter - startTime.quarter - 1) * startTime.quarterMinuteStart
            }
            total += startTime.quarterTimeLeft
            total += endTime.quarterTimePassed
            return total
        } 
    }

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
    private lastTimeIn : GameTime;

    public constructor(playerId:string, num:number, firstName:string, lastName:string, team:Team){
        makeAutoObservable(this)
        this.playerId = playerId;
        this.num = num;
        this.firstName = firstName;
        this.lastName = lastName;
        this.team = team;
    }

    subIn(gameTime : GameTime) {
        this.lastTimeIn = gameTime;
        this.inGame = true;
    }
    subOut(gameTime : GameTime) {
        let minutes = GameTime.timeDiff(this.lastTimeIn, gameTime);
        this.minutes += minutes
        this.lastTimeIn = null
        this.inGame = false;
    }

    

}


export {Player, Team, GameTime};

