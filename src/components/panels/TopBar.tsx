import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { GameStateContext } from "../../App";
import "../../App.css";
import { Team } from "../../state/Player";

function TopBar() {
    const context = useContext(GameStateContext);

    return (
        <div className="tBar">
            {context.scoreboard.getQuarter()}
            <button onClick={() => context.scoreboard.increaseQuarter()}>
                Quarter Change
            </button>
            <br />
            {context.scoreboard.awayPoints} - {context.scoreboard.homePoints}
            <h4>Bonuses:</h4>
            <p>Home: {context.scoreboard.getBonusString(Team.home)}</p>
            <p>Away: {context.scoreboard.getBonusString(Team.away)}</p>
        </div>
    );
}

export default observer(TopBar);
