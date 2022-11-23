import { observable, action, computed, reaction, makeObservable } from "mobx"

import { Action } from "./Action";

class PossessionEnd extends Action {    

    public constructor() {
        super();
        makeObservable(this, {
            actionJSON : computed,
        })
    }

    createNotify (): void {
        
    }

    deleteNotify (): void {
        
    }

    get actionJSON (): Object {
        return {
            "action": "possessionend",
            "actionId": this.actionId,
        }
    }
    
}

export {PossessionEnd}
