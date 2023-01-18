import { observer } from "mobx-react-lite";
import "../../App.css";
import TeamMgmtPanel from "../elements/TeamMgmtPanel";
import { Team } from "../../state/Player";
import { useContext } from "react";
import { GameStateContext } from "../../App";

function RosterMgmtPanel() {

    const context = useContext(GameStateContext);


    return (<div className = "rosterMgmtPanel">
    <TeamMgmtPanel 
            teamRoster={context.gameRoster.getRoster(Team.home)}
            team={0}/>
    <TeamMgmtPanel 
            teamRoster={context.gameRoster.getRoster(Team.away)}
            team={1}/>
    </div>)
} 
export default observer(RosterMgmtPanel);