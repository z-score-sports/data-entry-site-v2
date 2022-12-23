import { JSXElementConstructor, ReactElement } from "react";
import { region } from "./actions/Shot";
import { ActionStack } from "./ActionStack";

/* Abstract Nodes */

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

/* Concrete Nodes */

class BaseNode extends GenericNode {
    inputHandler(key: string, actionStack: ActionStack): GenericNode {
        if (key === "H") {
            return new FoulNode("defensive");
        } else if (key === "J") {
            return new FoulNode("offensive");
        } else if (key === "A") {
            return new AssistNode();
        } else if (key === "B") {
            return new BlockNode();
        } else if (key === "T") {
            return new TurnoverNode();
        } else if (key === "S") {
            return new StealNode();
        } else if (key === "R") {
            return new ReboundNode("defensive");
        } else if (key === "E") {
            return new ReboundNode("offensive");
        } else if (key === "Q") {
            return new ShotNumberNode(false);
        } else if (key === "W") {
            return new ShotNumberNode(true);
        } else if (key === "P") {
            return new FreeThrowNode(true);
        } else if (key === "O") {
            return new FreeThrowNode(false);
        } else if (key === " ") {
            actionStack.addPossessionEnd();
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
        return (
            <div>
                {this.team} foul node {this.num}
            </div>
        );
    }
}

class AssistNode extends NumberNode {
    inputHandler(key: string, actionStack: ActionStack): GenericNode {
        if (key === "ENTER") {
            actionStack.addAssist(this.num);
            return new BaseNode();
        }
        this.numHandler(key);
        return this.defaultHandler(key, actionStack);
    }

    promptUI(): ReactElement<any, string | JSXElementConstructor<any>> {
        return <div>Assisting player node {this.num} </div>;
    }
}

class BlockNode extends NumberNode {
    inputHandler(key: string, actionStack: ActionStack): GenericNode {
        if (key === "ENTER") {
            actionStack.addBlock(this.num);
            return new BaseNode();
        }
        this.numHandler(key);
        return this.defaultHandler(key, actionStack);
    }

    promptUI(): ReactElement<any, string | JSXElementConstructor<any>> {
        return <div>Blocking player node {this.num} </div>;
    }
}

class TurnoverNode extends NumberNode {
    stealingPlayerNumber: number = -1;

    constructor(stealingPlayerNumber: number = -1) {
        super();
        this.stealingPlayerNumber = stealingPlayerNumber;
    }

    inputHandler(key: string, actionStack: ActionStack): GenericNode {
        if (key === "ENTER") {
            if (this.stealingPlayerNumber === -1) {
                actionStack.addTurnover(this.num);
            } else {
                actionStack.addSteal(this.num, this.stealingPlayerNumber);
            }
            return new BaseNode();
        }
        this.numHandler(key);
        return this.defaultHandler(key, actionStack);
    }

    promptUI(): ReactElement<any, string | JSXElementConstructor<any>> {
        return <div>Turnover node by player #{this.num} </div>;
    }
}

class StealNode extends NumberNode {
    inputHandler(key: string, actionStack: ActionStack): GenericNode {
        if (key === "ENTER") {
            return new TurnoverNode(this.num);
        }
        this.numHandler(key);
        return this.defaultHandler(key, actionStack);
    }

    promptUI(): ReactElement<any, string | JSXElementConstructor<any>> {
        return <div>Steal by player #{this.num} </div>;
    }
}

class ReboundNode extends NumberNode {
    private team: string = "offensive" || "defensive";

    constructor(team: "offensive" | "defensive") {
        super();
        this.team = team;
    }

    inputHandler(key: string, actionStack: ActionStack): GenericNode {
        if (key === "ENTER") {
            // add to action stack
            if (this.team === "offensive") {
                actionStack.addRebound(this.num, actionStack.curPos);
            } else {
                actionStack.addRebound(this.num, actionStack.getDefense());
            }
            return new BaseNode();
        }
        this.numHandler(key);
        return this.defaultHandler(key, actionStack);
    }

    promptUI(): ReactElement<any, string | JSXElementConstructor<any>> {
        return (
            <div>
                {this.team} rebound player #{this.num}
            </div>
        );
    }
}

// Shot

class ShotNumberNode extends NumberNode {
    made: boolean;
    constructor(made: boolean) {
        super();
        this.made = made;
    }
    inputHandler(key: string, actionStack: ActionStack): GenericNode {
        if (key === "ENTER") {
            return new ShotRegionNode(this.made, this.num);
        }
        this.numHandler(key);
        return this.defaultHandler(key, actionStack);
    }

    promptUI(): ReactElement<any, string | JSXElementConstructor<any>> {
        return <div>Shot by player #{this.num} </div>;
    }
}

class ShotRegionNode extends GenericNode {
    made: boolean;
    shootingPlayerNumber: number;

    constructor(made: boolean, shootingPlayerNumber: number) {
        super();
        this.made = made;
        this.shootingPlayerNumber = shootingPlayerNumber;
    }

    inputHandler(key: string, actionStack: ActionStack): GenericNode {
        let digit: region = parseInt(key) as region;
        if (digit >= 1 && digit <= 9) {
            //return new TurnoverNode(this.num);
            actionStack.addShot(this.shootingPlayerNumber, digit, this.made);
            return new BaseNode();
        }
        return this.defaultHandler(key, actionStack);
    }

    promptUI(): ReactElement<any, string | JSXElementConstructor<any>> {
        return <div>What was the region?</div>;
    }
}

class FreeThrowNode extends NumberNode {
    made: boolean;

    constructor(made: boolean) {
        super();
        this.made = made;
    }

    inputHandler(key: string, actionStack: ActionStack): GenericNode {
        if (key === "ENTER") {
            actionStack.addFreeThrow(this.num, this.made);
            return new BaseNode();
        }
        this.numHandler(key);
        return this.defaultHandler(key, actionStack);
    }

    promptUI(): ReactElement<any, string | JSXElementConstructor<any>> {
        return (
            <div>
                Free throw {this.made} by player #{this.num}
            </div>
        );
    }
}



export { GenericNode, BaseNode };
