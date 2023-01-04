import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { GameStateContext } from "../../App";
import "../../App.css";
import InputPanel from "../elements/InputPanel";
function MainPanel() {
    const context = useContext(GameStateContext);

    return (
        <div className="mPanel">
            <p>{context.actionStack.curPos}</p>
            This is the main panel
            <div>
                <ul>
                    {context.actionStack
                        .getCurPossessionActions()
                        .map((action) => (
                            <li>{action.actionString}</li>
                        ))}
                </ul>
            </div>
            <InputPanel />
        </div>
    );
}

export default observer(MainPanel);
