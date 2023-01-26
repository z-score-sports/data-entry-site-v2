import { makeAutoObservable } from "mobx";
import { Action } from "./actions/Action";

class StatFactory {
    actionList: Array<Action>;

    constructor(actionStack: Array<Action>) {
        this.actionList = actionStack;
        makeAutoObservable(this);
    }

    get data(): object {
        return {};
    }
}

export { StatFactory };
