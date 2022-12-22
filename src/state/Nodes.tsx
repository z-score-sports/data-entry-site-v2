import { ReactElement } from "react";
import { ActionStack } from "./ActionStack";

interface NodeInterface {
    inputHandler(key: string, actionStack: ActionStack): NodeInterface;
    promptUI(): ReactElement;
}

class BaseNode implements NodeInterface {
    inputHandler(key: string, actionStack: ActionStack): NodeInterface {
        if (key === "H") {
            return new DefensiveFoulNode();
        } else if (key === ".") {
            actionStack.redo();
        } else if (key === ",") {
            actionStack.undo();
        }

        return this;
    }
    promptUI(): ReactElement {
        return <div>Base Node</div>;
    }
}

//abstracts
abstract class NumberNode {
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

class DefensiveFoulNode extends NumberNode implements NodeInterface {
    inputHandler(key: string, actionStack: ActionStack): NodeInterface {
        console.log("defensive foul input handler");
        this.numHandler(key);
        if (key === "ENTER") {
            // add to action stack
            actionStack.addFoul(this.num, actionStack.getDefense());
            return new BaseNode();
        }
        return this;
    }

    promptUI(): ReactElement {
        return <div>Defensive foul node {this.num}</div>;
    }
}

export { BaseNode, DefensiveFoulNode };
export type { NodeInterface };
