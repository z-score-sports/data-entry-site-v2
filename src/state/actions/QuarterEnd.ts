import { computed, makeObservable } from "mobx"

import { Action } from "./Action";

class QuarterEnd extends Action {    

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
            "action": "quarterend",
            "actionId": this.actionId,
        }
    }
    
}

export {QuarterEnd}
