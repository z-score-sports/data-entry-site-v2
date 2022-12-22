import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { GameStateContext } from "../../App";
import "../../App.css";

function InputPanel() {
    const context = useContext(GameStateContext);

    const [ui, setUI] = useState(context.currentInputNode.promptUI());

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [ui]);

    const handleKeyPress = (e: KeyboardEvent) => {
        console.log(e.key.toUpperCase());
        const newNode = context.currentInputNode.inputHandler(
            e.key.toUpperCase(),
            context.actionStack
        );
        context.currentInputNode = newNode;
        setUI(newNode.promptUI());
    };

    return <div>{ui}</div>;
}

export default observer(InputPanel);