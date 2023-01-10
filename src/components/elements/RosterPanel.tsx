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
            <table className="rosterPanel">
                <tr className="headerRow">
                    <th></th>
                    <th>Player</th>
                    <th>PTS</th>
                    <th>Min</th>
                    <th>F</th>
                </tr>
                {teamRoster.getPlayerArr().map((p) => {
                    return (
                        <tr className={"pRow"}>
                            <th>
                               {p.inGame ? <span className="inGameTri"></span> : <span className="outGameTri"></span>}{p.num}
                            </th>
                            <th>
                                {p.lastName}
                            </th>
                            <th>{p.points}</th>
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
