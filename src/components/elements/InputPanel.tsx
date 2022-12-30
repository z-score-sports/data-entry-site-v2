import { useEffect, useState } from "react";

import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { GameStateContext } from "../../App";
import "../../App.css";
import {
    MakeMissPromptInput,
    NumberPromptInput,
    Prompt,
    RegionPromptInput,
} from "../../state/Prompt";
import "./InputPanel.css";

const settings = {
    shot: {
        getInputs: () => [
            new NumberPromptInput("Shooting Player"),
            new RegionPromptInput("Region"),
        ],
    },
    assist: {
        getInputs: () => [new NumberPromptInput("Assisting Player")],
    },
    block: {
        getInputs: () => [new NumberPromptInput("Blocking Player")],
    },
    rebound: {
        getInputs: () => [new NumberPromptInput("Rebounding Player")],
    },
    foul: {
        getInputs: () => [new NumberPromptInput("Fouling Player")],
    },
    freethrow: {
        getInputs: () => [
            new NumberPromptInput("Shooting Player"),
            new MakeMissPromptInput("Made"),
        ],
    },
    turnover: {
        getInputs: () => [new NumberPromptInput("Offensive Player")],
    },
    steal: {
        getInputs: () => [
            new NumberPromptInput("Offensive Player"),
            new NumberPromptInput("Stealing Player"),
        ],
    },
};

function InputPanel() {
    const context = useContext(GameStateContext);
    const [promptTitle, setPromptTitle] = useState<string>("Blank Prompt");
    //const [promptInputs, setPromptInputs] = useState<Array<PromptInput>>();

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, []);
    //useEffect(() => {}, [context.currentInputNode]);

    const setUI = (prompt: Prompt) => {
        setPromptTitle(prompt ? prompt.promptTitle : "Blank Prompt");
        //setPromptInputs(prompt ? prompt.inputs : null);
    };

    const handleKeyPress = (e: KeyboardEvent) => {
        let key: string = e.key.toUpperCase();
        console.log(key);
        let newPrompt = context.currentPrompt;
        if (key === ",") {
            context.actionStack.undo();
            newPrompt = null;
        } else if (key === ".") {
            context.actionStack.redo();
            newPrompt = null;
        } else if (context.currentPrompt !== null) {
            let terminal: boolean = context.currentPrompt.handleInput(key);
            if (terminal) {
                addToActionStack();
                newPrompt = null;
            }
        } else if (key === "SHIFT") {
            context.actionStack.addPossessionEnd();
            newPrompt = null;
        } else if (key === "W") {
            const inputs = settings.shot.getInputs();
            newPrompt = new Prompt(key, "Made Shot", inputs);
        } else if (key === "Q") {
            const inputs = settings.shot.getInputs();
            newPrompt = new Prompt(key, "Missed Shot", inputs);
        } else if (key === "A") {
            const inputs = settings.assist.getInputs();
            newPrompt = new Prompt(key, "Assist", inputs);
        } else if (key === "B") {
            const inputs = settings.block.getInputs();
            newPrompt = new Prompt(key, "Block", inputs);
        } else if (key === "Z") {
            const inputs = settings.rebound.getInputs();
            newPrompt = new Prompt(key, "Defensive Rebound", inputs);
        } else if (key === "X") {
            const inputs = settings.rebound.getInputs();
            newPrompt = new Prompt(key, "Offensive Rebound", inputs);
        } else if (key === "S") {
            const inputs = settings.steal.getInputs();
            newPrompt = new Prompt(key, "Steal", inputs);
        } else if (key === "F") {
            const inputs = settings.foul.getInputs();
            newPrompt = new Prompt(key, "Defensive Foul", inputs);
        } else if (key === "D") {
            const inputs = settings.foul.getInputs();
            newPrompt = new Prompt(key, "Offensive Foul", inputs);
        } else if (key === "E") {
            const inputs = settings.freethrow.getInputs();
            newPrompt = new Prompt(key, "Free Throw", inputs);
        }
        context.currentPrompt = newPrompt;
        setUI(context.currentPrompt);
    };

    const addToActionStack = () => {
        let curPrompt = context.currentPrompt;
        let inputs = curPrompt.inputs;
        let actionStack = context.actionStack;
        if (curPrompt.promptingKey === "W") {
            let number = inputs[0].getValue();
            let region = inputs[1].getValue();
            actionStack.addShot(number, region, true);
        } else if (curPrompt.promptingKey === "Q") {
            let number = curPrompt.inputs[0].getValue();
            let region = curPrompt.inputs[1].getValue();
            actionStack.addShot(number, region, false);
        } else if (curPrompt.promptingKey === "A") {
            let number = inputs[0].getValue();
            actionStack.addAssist(number);
        } else if (curPrompt.promptingKey === "B") {
            let number = inputs[0].getValue();
            actionStack.addBlock(number);
        } else if (curPrompt.promptingKey === "Z") {
            let number = inputs[0].getValue();
            actionStack.addRebound(number, actionStack.getDefense());
        } else if (curPrompt.promptingKey === "X") {
            let number = inputs[0].getValue();
            actionStack.addRebound(number, context.actionStack.curPos);
        } else if (curPrompt.promptingKey === "S") {
            let stealee = inputs[0].getValue();
            let stealer = inputs[1].getValue();
            actionStack.addSteal(stealee, stealer);
        } else if (curPrompt.promptingKey === "F") {
            let foulingPlayer = inputs[0].getValue();
            actionStack.addFoul(foulingPlayer, actionStack.getDefense());
        } else if (curPrompt.promptingKey === "D") {
            let foulingPlayer = inputs[0].getValue();
            actionStack.addFoul(foulingPlayer, actionStack.curPos);
        } else if (curPrompt.promptingKey === "E") {
            let shootingPlayer = inputs[0].getValue();
            let made = inputs[1].getValue();
            actionStack.addFreeThrow(shootingPlayer, made);
        }
    };

    return (
        <div className="inputpanel">
            <div className="prompttitle">
                <h2>{promptTitle}</h2>
            </div>
            <div className="inputprompts">
                {context.currentPrompt &&
                    context.currentPrompt.inputs &&
                    context.currentPrompt.inputs.map((input, i) => (
                        <div
                            className={`promptinput ${
                                context.currentPrompt.index === i
                                    ? "current"
                                    : ""
                            }`}
                            key={i}
                        >
                            {input.inputTitle}: {input.toString()}
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default observer(InputPanel);
