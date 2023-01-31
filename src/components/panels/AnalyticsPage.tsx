import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { GameStateContext } from "../../App";
import "../../App.css";
import { getTeamLineupStats } from "../../state/functions";
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
            <table>
                <tr className="headerRow">
                    <th>#</th>
                    <th>Name</th>
                    <th>PTS</th>
                    <th>REB</th>
                    <th>AST</th>
                    <th>TO</th>
                    <th>Min</th>
                    <th>F</th>
                    <th>+/-</th>
                    <th>3PT%</th>
                    <th>FG%</th>
                    <th>TS%</th>
                    <th>R1</th>
                    <th>R2</th>
                    <th>R3</th>
                    <th>R4</th>
                    <th>R5</th>
                    <th>R6</th>
                    <th>R7</th>
                    <th>R8</th>
                    <th>R9</th>
                </tr>
                {context.gameRoster
                    .getRoster(team)
                    .getPlayerArr()
                    .map((p) => {
                        return (
                            <tr className={"pRow"}>
                                <th>{p.num}</th>
                                <th>{p.lastName}</th>
                                <th>{p.points}</th>
                                <th>{p.rebounds}</th>
                                <th>{p.assists}</th>
                                <th>{p.turnovers}</th>
                                <th>{(p.playerMinutes || 0).toFixed(0)}</th>
                                <th>{p.fouls}</th>
                                <th>{p.plusminus}</th>
                                <th>
                                    {p.threePointersAttempted &&
                                        Math.round(
                                            (100 * p.threePointersMade) /
                                                p.threePointersAttempted
                                        )}
                                    %
                                </th>
                                <th>
                                    {p.fga && Math.round((100 * p.fgm) / p.fga)}
                                    %
                                </th>
                                <th>
                                    {p.fga &&
                                        Math.round(
                                            100 *
                                                (p.points /
                                                    (2 * p.fga + 0.88 * p.fta))
                                        )}
                                    %
                                </th>

                                <th>{p.shotTracker.getRegionString(1)}</th>
                                <th>{p.shotTracker.getRegionString(2)}</th>
                                <th>{p.shotTracker.getRegionString(3)}</th>
                                <th>{p.shotTracker.getRegionString(4)}</th>
                                <th>{p.shotTracker.getRegionString(5)}</th>
                                <th>{p.shotTracker.getRegionString(6)}</th>
                                <th>{p.shotTracker.getRegionString(7)}</th>
                                <th>{p.shotTracker.getRegionString(8)}</th>
                                <th>{p.shotTracker.getRegionString(9)}</th>
                            </tr>
                        );
                    })}
                <tr className="headerRow">
                    <th></th>
                    <th>Team</th>
                    <th>{context.gameRoster.getRoster(team).rosterPoints}</th>
                    <th>{context.gameRoster.getRoster(team).rosterRebounds}</th>
                    <th>{context.gameRoster.getRoster(team).rosterAssists}</th>
                    <th>
                        {context.gameRoster.getRoster(team).rosterTurnovers}
                    </th>
                    <th></th>
                    <th>{context.gameRoster.getRoster(team).rosterFouls}</th>
                    <th></th>
                    <th>
                        {context.gameRoster.getRoster(team)
                            .threePointPercentage || "0"}
                        %
                    </th>
                    <th>
                        {context.gameRoster.getRoster(team).fgPercentage || "0"}
                        %
                    </th>
                    <th>
                        {context.gameRoster.getRoster(team).tsPercentage || "0"}
                        %
                    </th>
                    <th>
                        {context.gameRoster
                            .getRoster(team)
                            .getRegionShotString(1)}
                    </th>
                    <th>
                        {context.gameRoster
                            .getRoster(team)
                            .getRegionShotString(2)}
                    </th>
                    <th>
                        {context.gameRoster
                            .getRoster(team)
                            .getRegionShotString(3)}
                    </th>
                    <th>
                        {context.gameRoster
                            .getRoster(team)
                            .getRegionShotString(4)}
                    </th>
                    <th>
                        {context.gameRoster
                            .getRoster(team)
                            .getRegionShotString(5)}
                    </th>
                    <th>
                        {context.gameRoster
                            .getRoster(team)
                            .getRegionShotString(6)}
                    </th>
                    <th>
                        {context.gameRoster
                            .getRoster(team)
                            .getRegionShotString(7)}
                    </th>
                    <th>
                        {context.gameRoster
                            .getRoster(team)
                            .getRegionShotString(8)}
                    </th>
                    <th>
                        {context.gameRoster
                            .getRoster(team)
                            .getRegionShotString(9)}
                    </th>
                </tr>
            </table>
            <h2>Lineup Comparison</h2>
            <table>
                <tr className="headerRow">
                    <th>Lineup</th>
                    <th>Off PPP</th>
                    <th>Def PPP</th>
                    <th>Assists</th>
                    <th>Rebounds</th>
                    <th>Turnovers</th>
                    <th>FG%</th>
                    <th>3PT%</th>
                    <th>Def FG%</th>
                    <th>Def 3PT%</th>
                </tr>
                {getTeamLineupStats(
                    context.actionStack.mainStack,
                    team,
                    team === Team.home
                        ? context.homeStartLineup
                        : context.awayStartLineup
                ).map((data) => (
                    <tr className="pRow">
                        <th>{data.lineupString}</th>
                        <th>
                            {data.offensivePossessions &&
                                data.pointsScored / data.offensivePossessions}
                        </th>
                        <th>
                            {data.defensivePossessions &&
                                data.pointsAllowed / data.defensivePossessions}
                        </th>
                        <th>{data.assists}</th>
                        <th>{data.rebounds}</th>
                        <th>{data.turnovers}</th>
                        <th>
                            {data.offensiveFGA &&
                                Math.round(
                                    (100 * data.offensiveFGM) /
                                        data.offensiveFGA
                                )}
                            %
                        </th>
                        <th>
                            {data.offensive3PA &&
                                Math.round(
                                    (100 * data.offensive3PM) /
                                        data.offensive3PA
                                )}
                            %
                        </th>
                        <th>
                            {data.defensiveFGA &&
                                Math.round(
                                    (100 * data.defensiveFGM) /
                                        data.defensiveFGA
                                )}
                            %
                        </th>
                        <th>
                            {data.defensive3PA &&
                                Math.round(
                                    (100 * data.defensive3PM) /
                                        data.defensive3PA
                                )}
                            %
                        </th>
                    </tr>
                ))}
            </table>
        </div>
    );
}

function AnalyticsPage() {
    const context = useContext(GameStateContext);
    return (
        <div>
            <TeamAnalytics team={Team.home}></TeamAnalytics>
            <TeamAnalytics team={Team.away}></TeamAnalytics>
        </div>
    );
}

export default observer(AnalyticsPage);
