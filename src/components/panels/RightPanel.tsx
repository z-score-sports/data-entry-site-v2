import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { GameStateContext } from "../../App";
import "../../App.css";
import { Team } from "../../state/Player";
import RosterPanel from "../elements/RosterPanel";

function RightPanel() {
    const context = useContext(GameStateContext);

    return (
        <div className="rPanel">
            <div className="container rostercontainer">
                <RosterPanel
                    teamRoster={context.gameRoster.getRoster(Team.home)}
                    team={0}
                />
            </div>
            <div className="container rostercontainer">
                <RosterPanel
                    teamRoster={context.gameRoster.getRoster(Team.away)}
                    team={1}
                />
            </div>
        </div>
    );
}

export default observer(RightPanel);
