import { observer } from "mobx-react-lite";
import "../../App.css";
import { GameTime } from "../../state/GameTime";
import { Roster } from "../../state/Roster";

type propsType = {
    team: Roster;
};

function RosterPanel({ team }: propsType) {
    return (
        <div>
            <h2>{team.teamName}</h2>
            <table className="rosterPanel">
                <tr className="headerRow">
                    <th>Player</th>
                    <th>PTS</th>
                    <th>REB</th>
                    <th>AST</th>
                    <th>+/-</th>
                    <th>3PT</th>
                    <th>FG</th>
                    <th>FT</th>
                    <th>S</th>
                    <th>B</th>
                    <th>TO</th>
                    <th>Min</th>
                    <th>F</th>
                </tr>
                {team.getPlayerArr().map((p) => {
                    return (
                        <tr className={"pRow" + p.inGame}>
                            <th>
                                {p.num}|{p.lastName}
                            </th>
                            <th>{p.points}</th>
                            <th>{p.rebounds}</th>
                            <th>{p.assists}</th>
                            <th>{p.plusminus}</th>
                            <th>{p.threePointers}</th>
                            <th>
                                {p.fgm}/{p.fga}
                            </th>
                            <th>
                                {p.ftm}/{p.fta}
                            </th>
                            <th>{p.steals}</th>
                            <th>{p.blocks}</th>
                            <th>{p.turnovers}</th>
                            <th>
                                {p.minutesKeeper.getMinutes(
                                    new GameTime(1, 6, 0)
                                ) || 0}
                            </th>
                            <th>{p.fouls}</th>
                        </tr>
                    );
                })}
            </table>
        </div>
    );
}

export default observer(RosterPanel);
