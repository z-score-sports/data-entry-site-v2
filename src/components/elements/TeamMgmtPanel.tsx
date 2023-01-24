import DeleteIcon from "@mui/icons-material/Delete";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { GameStateContext } from "../../App";
import "../../App.css";
import { Player } from "../../state/Player";
import { Roster } from "../../state/Roster";
import AddPlayerPanel from "./AddPlayerPanel";
import SubPanel from "./SubPanel";

type propsType = {
    teamRoster: Roster;
    team: number;
};

function TeamMgmtPanel({ teamRoster, team }: propsType) {
    const context = useContext(GameStateContext);

    const [adding, setAdding] = useState(false);
    const [subbing, setSubbing] = useState(false);

    const deletePlayer = (player: Player) => {
        teamRoster.removePlayer(player.num);
    };

    const handleClose = () => {
        setAdding(false);
        setSubbing(false);
    };
    const handleAdd = () => {
        setAdding(true);
    };

    const handleSub = () => {
        setSubbing(true);
    };

    return (
        <div className="teamMgmtPanel">
            {/* <h2 className="rptitle">{team === Team.home ? "Home" : "Away"}</h2> */}
            <table>
                <tr className="headerRow">
                    <th></th>
                    <th>Number</th>
                    <th>Player</th>
                    <th>PTS</th>
                    <th>REB</th>
                    <th>AST</th>
                    <th>+/-</th>
                    <th>3PT</th>
                    <th>FG</th>
                    <th>FT</th>
                    <th>S</th>
                    <th>TO</th>
                    <th>B</th>
                    <th>Min</th>
                    <th>F</th>
                    <th></th>
                </tr>
                {teamRoster.getPlayerArr().map((p) => {
                    return (
                        <tr className={"pRow"}>
                            <th>
                                {p.inGame ? (
                                    <span className="inGameTri"></span>
                                ) : (
                                    <span className="outGameTri"></span>
                                )}
                            </th>
                            <th>{p.num}</th>
                            <th>{p.lastName}</th>
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
                            <th>{p.turnovers}</th>
                            <th>{p.blocks}</th>
                            <th>
                                {(
                                    p.minutesKeeper.getMinutes(
                                        context.actionStack.getLastGameTime()
                                    ) || 0
                                ).toFixed(0)}
                            </th>
                            <th>{p.fouls}</th>
                            <th>
                                <IconButton
                                    onClick={() => {
                                        deletePlayer(p);
                                    }}
                                    style={{ padding: 0 }}
                                    aria-label="delete"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </th>
                        </tr>
                    );
                })}
            </table>
            <div>
                <Button
                    variant="contained"
                    onClick={handleAdd}
                    style={{ backgroundColor: "#F1F1F1", color: "black" }}
                >
                    Add Player +
                </Button>
                <Button
                    variant="contained"
                    onClick={handleSub}
                    style={{ marginLeft: 20, color: "white" }}
                >
                    Substitute
                </Button>
            </div>
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={adding}
            >
                <AddPlayerPanel
                    teamRoster={teamRoster}
                    handleClose={handleClose}
                />
            </Backdrop>
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={subbing}
            >
                <SubPanel teamRoster={teamRoster} handleClose={handleClose} />
            </Backdrop>
        </div>
    );
}

export default observer(TeamMgmtPanel);
