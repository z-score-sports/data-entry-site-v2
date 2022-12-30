import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { GameStateContext } from "../../App";
import "../../App.css";
import InputPanel from "../elements/InputPanel";
function MainPanel() {
    const context = useContext(GameStateContext);

    const handleClick = (event: React.MouseEvent) => {
        if (event.type === "click") {
            context.actionStack.addPossessionEnd();
        }
    };

    return (
        <div className="mPanel">
            <p>{context.actionStack.curPos}</p>
            This is the main panel
            <button onKeyDown={() => {}} onClick={handleClick}>
                Click to end pos
            </button>
            <div>
                <ul>{JSON.stringify(context.actionStack.toJSON())}</ul>
            </div>
            <InputPanel />
        </div>
    );
}

export default observer(MainPanel);
