import { useEffect, useState } from "react";

import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { GameStateContext } from "../../App";
import "../../App.css";
import {
  MakeMissPromptInput,
  NumberPromptInput,
  Prompt,
  RegionPromptInput
} from "../../state/Prompt";
import "./InputPanel.css";

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
        } else if (key === "/") {
            context.actionStack.addPossessionEnd();
            newPrompt = null;
        } else if (key === "W") {
            const inputs = [
                new NumberPromptInput("Shooting Player"),
                new RegionPromptInput("Region"),
            ];
            newPrompt = new Prompt(key, "Made Shot", inputs);
        } else if (key === "Q") {
            const inputs = [
                new NumberPromptInput("Shooting Player"),
                new RegionPromptInput("Region"),
            ];
            newPrompt = new Prompt(key, "Missed Shot", inputs);
        } else if (key === "A") {
            const inputs = [new NumberPromptInput("Assisting Player")];
            newPrompt = new Prompt(key, "Assist", inputs);
        } else if (key === "B") {
            const inputs = [new NumberPromptInput("Blocking Player")];
            newPrompt = new Prompt(key, "Block", inputs);
        } else if (key === "Z") {
            const inputs = [new NumberPromptInput("Rebounding Player")];
            newPrompt = new Prompt(key, "Defensive Rebound", inputs);
        } else if (key === "X") {
            const inputs = [new NumberPromptInput("Rebounding Player")];
            newPrompt = new Prompt(key, "Offensive Rebound", inputs);
        } else if (key === "S") {
            const inputs = [
                new NumberPromptInput("Offensive Player"),
                new NumberPromptInput("Stealing Player"),
            ];
            newPrompt = new Prompt(key, "Steal", inputs);
        } else if (key === "T") {
            const inputs = [new NumberPromptInput("Offensive Player")];
            newPrompt = new Prompt(key, "Turnover", inputs);
        } else if (key === "F") {
            const inputs = [new NumberPromptInput("Fouling Player")];
            newPrompt = new Prompt(key, "Defensive Foul", inputs);
        } else if (key === "D") {
            const inputs = [new NumberPromptInput("Fouling Player")];
            newPrompt = new Prompt(key, "Offensive Foul", inputs);
        } else if (key === "E") {
            const inputs = [
                new NumberPromptInput("Shooting Player"),
                new MakeMissPromptInput("Made"),
            ];
            newPrompt = new Prompt(key, "Free Throw", inputs);
        }
        context.currentPrompt = newPrompt;
        setUI(context.currentPrompt);
    };

    const addToActionStack = () => {
        let curPrompt = context.currentPrompt;
        let inputValues = curPrompt.inputs.map((input) => input.getValue());
        let actionStack = context.actionStack;
        if (curPrompt.promptingKey === "W") {
            actionStack.addShot(inputValues[0], inputValues[1], true);
        } else if (curPrompt.promptingKey === "Q") {
            actionStack.addShot(inputValues[0], inputValues[1], false);
        } else if (curPrompt.promptingKey === "A") {
            actionStack.addAssist(inputValues[0]);
        } else if (curPrompt.promptingKey === "B") {
            actionStack.addBlock(inputValues[0]);
        } else if (curPrompt.promptingKey === "Z") {
            actionStack.addRebound(inputValues[0], actionStack.getDefense());
        } else if (curPrompt.promptingKey === "X") {
            actionStack.addRebound(inputValues[0], context.actionStack.curPos);
        } else if (curPrompt.promptingKey === "S") {
            actionStack.addSteal(inputValues[0], inputValues[1]);
        } else if (curPrompt.promptingKey === "F") {
            actionStack.addFoul(inputValues[0], actionStack.getDefense());
        } else if (curPrompt.promptingKey === "D") {
            actionStack.addFoul(inputValues[0], actionStack.curPos);
        } else if (curPrompt.promptingKey === "E") {
            actionStack.addFreeThrow(inputValues[0], inputValues[1]);
        } else if (curPrompt.promptingKey === "T") {
            actionStack.addTurnover(inputValues[0]);
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
