import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { GameStateContext } from "../../App";
import "../../App.css";
import "./CurrentPosView.css";

function CurrentPosView() {
  const context = useContext(GameStateContext);

  return (
    <div className="container currentpossession">
      <p className="currPosTitle">
        Current Possession{" "}
        <span className="currMarkTitle">
          {context.actionStack.getCurMarking() != null &&
            "(" + context.actionStack.getCurMarking().markString + ")"}
        </span>
      </p>
      <p className="currTeamTitle">
        {context.actionStack.curPos == 0 ? "Home" : "Away"}
      </p>
      <div className="actionTable">
        {context.actionStack.getCurPossessionActions().map((action) => (
          <div className="actionCell">{action.actionString}</div>
        ))}
      </div>
    </div>
  );
}

export default observer(CurrentPosView);
