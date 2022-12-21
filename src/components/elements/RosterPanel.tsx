import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { GameStateContext } from "../../App";
import "../../App.css";
import { Roster } from "../../state/Roster";

type propsType = {
    teamRoster: Roster;
    team: number
};

function RosterPanel({ teamRoster, team }: propsType) {
    const context = useContext(GameStateContext);

    return (
        <div>
            <h2>{teamRoster.teamName}</h2>
            {context.actionStack.curPos == team && <p>Possesing</p>}
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
                {teamRoster.getPlayerArr().map((p) => {
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
                                {(
                                    p.minutesKeeper.getMinutes(
                                        context.actionStack.getLastGameTime()
                                    ) || 0
                                ).toFixed(0)}
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
