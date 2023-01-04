import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { GameStateContext } from "../../App";
import "../../App.css";
import InputPanel from "../elements/InputPanel";
import ScoreView from "../elements/ScoreView";

function MainPanel() {
    const context = useContext(GameStateContext);

    return (
        <div className="mPanel">
            {/* <p>{context.actionStack.curPos}</p> */}
            <div className="container scoreboard">
                <ScoreView />
            </div>

            <div className="container currentpossession">
                <h2>Current Possession</h2>
                <ul>
                    {context.actionStack
                        .getCurPossessionActions()
                        .map((action) => (
                            <li>{action.actionString}</li>
                        ))}
                </ul>
            </div>
            <div className="container inputpanel">
                <InputPanel />
            </div>
        </div>
    );
}

export default observer(MainPanel);
