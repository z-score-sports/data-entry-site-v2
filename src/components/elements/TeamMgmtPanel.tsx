import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { GameStateContext } from "../../App";
import "../../App.css";
import { Roster } from "../../state/Roster";
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import AddPlayerPanel from "./AddPlayerPanel";
import {useState} from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { Player } from "../../state/Player";

type propsType = {
    teamRoster: Roster;
    team: number;
};

function TeamMgmtPanel({ teamRoster, team }: propsType) {
    const context = useContext(GameStateContext);

    const [adding, setAdding] = useState(false);


    const deletePlayer = (player: Player) => {
        teamRoster.removePlayer(player.num)
    }

    const handleClose = () => {
        setAdding(false);
    };
    const handleAdd = () => {
        setAdding(!adding);
    };




    return (
        <div className="teamMgmtPanel">
            {/* <h2 className="rptitle">{team === Team.home ? "Home" : "Away"}</h2> */}
            <table>
                <tr className="headerRow">
                    <th>Number</th>
                    <th>Player</th>
                    <th>PTS</th>
                    <th>REB</th>
                    <th>AST</th>
                    <th>+/-</th>
                    <th>3PT</th>
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
                                {p.num}
                            </th>
                            <th>{p.lastName}</th>
                            <th>{p.points}</th>
                            <th>{p.rebounds}</th>
                            <th>{p.assists}</th>
                            <th>{p.plusminus}</th>
                            <th>{p.threePointers}</th>
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
                            <th><IconButton onClick = {() => {deletePlayer(p)}}style = {{padding: 0}} aria-label="delete"><DeleteIcon /></IconButton></th>
                        </tr>
                    );
                })}
            </table>
            <Button variant="contained"  onClick={handleAdd} style = {{backgroundColor: '#F1F1F1', color: 'black'}}>Add Player +</Button>
            <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={adding}
      ><AddPlayerPanel teamRoster = {teamRoster} handleClose={handleClose}/></Backdrop>
        </div>
    );
}

export default observer(TeamMgmtPanel);
