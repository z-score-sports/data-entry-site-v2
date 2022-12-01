import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { GameStateContext } from "../../App";
import "../../App.css";
import { Team } from "../../state/Player";

function MainPanel() {
    const context = useContext(GameStateContext);

    const addShot = () => {
        context.actionStack.addShot(0, 3, true);
    };

    const undoAction = () => {
        context.actionStack.undo();
    };

    const redoAction = () => {
        context.actionStack.redo();
    };

    const addFoul = () => {
        context.actionStack.addFoul(0, Team.home);
    };

    const addRebound = () => {
        context.actionStack.addRebound(1, Team.home);
    };
    const addAssist = () => {
        context.actionStack.addAssist(1);
    };

    return (
        <div className="mPanel">
            <p>{context.actionStack.curPos}</p>
            This is the main panel
            <div>
                <button onClick={addShot}>Add shot to player 0</button>
                <button onClick={undoAction}>Undo</button>
                <button onClick={redoAction}>Redo</button>
            </div>
            <div>
                <button onClick={addFoul}>Add foul to player 0</button>
            </div>
            <div>
                <button onClick={addRebound}>Add rebound to player 1</button>
            </div>
            <div>
                <button onClick={addAssist}>Add assist to player 1</button>
            </div>
            <div>
                {context.gameRoster.getRoster(Team.home).getPlayer(0).fga}
                {context.gameRoster.getRoster(Team.home).getPlayer(0).fgm}
            </div>
        </div>
    );
}

export default observer(MainPanel);
