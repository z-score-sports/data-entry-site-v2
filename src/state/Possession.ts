import { randomUUID } from "crypto";
import { Team } from "./Player";

class Possession {
    possessionId : string;
    quarter : number;
    offenseTeam : Team;
    lineupString : string = "";
    
    constructor(quarter : number, offenseTeam : Team) {
        this.possessionId = randomUUID();
        this.quarter = quarter;
        this.offenseTeam = offenseTeam;
        //TODO: need list of actions which can be of type Shot, Foul, Turnover        
    }
}

export type {Possession};