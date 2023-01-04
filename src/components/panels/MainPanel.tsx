import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { GameStateContext } from "../../App";
import "../../App.css";
import InputPanel from "../elements/InputPanel";
import ActionStackView from "../elements/ActionStackView";
import ScoreView from "../elements/ScoreView";


function MainPanel() {
    const context = useContext(GameStateContext);

    return (
        <div className="mPanel">
            <p>{context.actionStack.curPos}</p>
            <ScoreView/>
            <div>
                <ul>{JSON.stringify(context.actionStack.toJSON())}</ul>
            </div>
            <ActionStackView/>
            <InputPanel />
        </div>
    );
}

export default observer(MainPanel);
