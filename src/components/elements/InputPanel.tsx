import { useEffect, useState } from "react";

import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { GameStateContext } from "../../App";
import "../../App.css";
import {
    MakeMissPromptInput,
    NumberPromptInput,
    Prompt,
    PromptInput,
    RegionPromptInput,
} from "../../state/Prompt";

const defaultPrompt = {
    promptTitle: "Enter a key",
    inputs: new Array<PromptInput>(),
};

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
            new NumberPromptInput("Stealing Player"),
            new NumberPromptInput("Offensive Player"),
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
        }
        context.currentPrompt = newPrompt;
        setUI(context.currentPrompt);
    };

    function addToActionStack() {
        let curPrompt = context.currentPrompt;
        let inputs = curPrompt.inputs;
        if (curPrompt.promptingKey === "W") {
            let number = inputs[0].getValue();
            let region = inputs[1].getValue();
            context.actionStack.addShot(number, region, true);
        } else if (curPrompt.promptingKey === "Q") {
            let number = curPrompt.inputs[0].getValue();
            let region = curPrompt.inputs[1].getValue();
            context.actionStack.addShot(number, region, false);
        } else if (curPrompt.promptingKey === "A") {
            let number = inputs[0].getValue();
            context.actionStack.addAssist(number);
        } else if (curPrompt.promptingKey === "B") {
            let number = inputs[0].getValue();
            context.actionStack.addBlock(number);
        } else if (curPrompt.promptingKey === "Z") {
            let number = inputs[0].getValue();
            context.actionStack.addRebound(
                number,
                context.actionStack.getDefense()
            );
        } else if (curPrompt.promptingKey === "X") {
            let number = inputs[0].getValue();
            context.actionStack.addRebound(number, context.actionStack.curPos);
        }
    }

    return (
        <div>
            <h1>{promptTitle}</h1>
            <div>
                {context.currentPrompt &&
                    context.currentPrompt.inputs &&
                    context.currentPrompt.inputs.map((input, i) => (
                        <div key={i}>
                            {i === context.currentPrompt.index
                                ? "*Current* "
                                : ""}
                            {input.inputTitle}: {input.getValue()}
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default observer(InputPanel);
