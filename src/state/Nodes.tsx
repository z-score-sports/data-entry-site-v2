import { ReactElement } from "react";
import { ActionStack } from "./ActionStack";


abstract class GenericNode {
    abstract inputHandler(key: string, actionStack: ActionStack): GenericNode;
    abstract promptUI(): ReactElement;

    protected defaultHandler(
        key: string,
        actionStack: ActionStack
    ): GenericNode {
        if (key === "ESCAPE") {
            return new BaseNode();
        } else if (key === ".") {
            actionStack.redo();
            return new BaseNode();
        } else if (key === ",") {
            actionStack.undo();
            return new BaseNode();
        }
        return this;
    }
}
abstract class NumberNode extends GenericNode {
    num: number = 0;

    protected numHandler(key: string) {
        if (key === "BACKSPACE") {
            this.handleBackspace();
        } else if (!isNaN(+key)) {
            this.handleNumberInput(parseInt(key));
        }
    }

    protected handleNumberInput(digit: number) {
        this.num = this.num * 10 + digit;
    }
    protected handleBackspace() {
        this.num = Math.floor(this.num / 10);
    }
}

class BaseNode extends GenericNode {
    inputHandler(key: string, actionStack: ActionStack): GenericNode {
        if (key === "H") {
            return new FoulNode("defensive");
        } else if (key === "J") {
            return new FoulNode("offensive");
        }
        return this.defaultHandler(key, actionStack);
    }
    promptUI(): ReactElement {
        return <div>Base Node</div>;
    }
}

// Node that gets the number of a defensive fouling player
class FoulNode extends NumberNode {
    private team: string = "offensive" || "defensive";

    constructor(team: "offensive" | "defensive") {
        super();
        this.team = team;
    }

    inputHandler(key: string, actionStack: ActionStack): GenericNode {
        if (key === "ENTER") {
            // add to action stack
            if (this.team === "offensive") {
                actionStack.addFoul(this.num, actionStack.curPos);
            } else {
                actionStack.addFoul(this.num, actionStack.getDefense());
            }
            return new BaseNode();
        }
        this.numHandler(key);
        return this.defaultHandler(key, actionStack);
    }

    promptUI(): ReactElement {
        return <div>Defensive foul node {this.num}</div>;
    }
}

export { GenericNode, BaseNode, FoulNode };

