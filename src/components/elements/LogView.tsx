import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { GameStateContext } from "../../App";

function LogView() {
    const context = useContext(GameStateContext);

    return (
        <div>
            <h1>Action Log</h1>
            <ul>
                {context.actionStack &&
                    context.actionStack
                        .lastNActions(5)
                        .map((action) => <li>{action.actionString}</li>)}
            </ul>
        </div>
    );
}

export default observer(LogView);
