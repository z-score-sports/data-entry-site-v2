import { randomUUID } from "crypto";
import { Player, Team } from "./Player";

class Possession {
    possessionId : string;
    quarter : number;
    offenseTeam : Team;
    lineupString : string = "";
    
    constructor(quarter : number, offenseTeam : Team) {
        this.possessionId = randomUUID();
        this.quarter = quarter;
        this.offenseTeam = offenseTeam;
        
    }
}

export type {Possession};