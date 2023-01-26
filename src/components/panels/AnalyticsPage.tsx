import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { GameStateContext } from "../../App";
import { Team } from "../../state/Player";

type TeamAnalyticsProps = {
    team: Team;
};

function TeamAnalytics({ team }: TeamAnalyticsProps) {
    const context = useContext(GameStateContext);

    return (
        <div>
            <h1>Home Analytics</h1>
            <h2>General Team</h2>

            <h2>Player v. Player</h2>
            <h2>Lineup Comparison</h2>
        </div>
    );
}

function AnalyticsPage() {
    const context = useContext(GameStateContext);
    return (
        <div>
            <TeamAnalytics team={Team.home}></TeamAnalytics>
            <TeamAnalytics team={Team.away}></TeamAnalytics>
            {JSON.stringify(context.actionStack.getStats())}
        </div>
    );
}

export default observer(AnalyticsPage);
