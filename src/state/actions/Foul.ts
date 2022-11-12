import { Player } from "../Player";
import { Action } from "./Action";


class Foul extends Action {
    foulingPlayer : Player;
    

    constructor(foulingPlayer:Player) {
        super();
        this.foulingPlayer = foulingPlayer;

    }

    actionJSON (): Object {
        return {}
    }
    
}