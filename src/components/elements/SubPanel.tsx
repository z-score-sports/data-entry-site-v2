import { observer } from "mobx-react-lite";
import "../../App.css";

import { useContext, useState } from "react";
import { GameStateContext } from "../../App";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Roster } from "../../state/Roster";
import { Player } from "../../state/Player";
import { GameTime } from "../../state/GameTime";
type propsType = {
    handleClose: any;
    teamRoster: Roster;
};

function SubPanel({handleClose, teamRoster}: propsType) {

    const context = useContext(GameStateContext);
    const [minutes, setMinutes] = useState("")
    const [seconds, setSeconds] = useState("")

    const [subOut, setSubOut] = useState(-1)
    const [subIn, setSubIn] = useState(-1)


    const handleInSelect = (p: Player) => {
        setSubIn(p.num)
        if(subOut > -1) {
            let gt = new GameTime(context.scoreboard.getQuarter(), +minutes, +seconds)
            context.actionStack.addSubstitution(teamRoster.team, p.num, subOut, gt)
            setSubIn(-1)
            setSubOut(-1)
        }
    }

    
    const handleOutSelect = (p: Player) => {
        setSubOut(p.num)
        if(subIn > -1) {
            let gt = new GameTime(context.scoreboard.getQuarter(), +minutes, +seconds)
            context.actionStack.addSubstitution(teamRoster.team, subIn, p.num, gt)
            setSubIn(-1)
            setSubOut(-1)
        }
    }



    return (<div className = "popupPanel SubPlayerPanel">
        <h1>Substitute</h1>
        <div className = "timeInputWrapper">
        <TextField onChange = {(e) => {setMinutes(e.target.value)}} id="standard-basic" label="Minute" variant="standard" autoComplete="off"/>
        <TextField onChange = {(e) => {setSeconds(e.target.value)}} id="standard-basic" label="Second" variant="standard" autoComplete="off"/>
        </div>
        <div className = "subPlayerSelectorWrapper">
            <div>
                <h3>Sub Out</h3>
            {teamRoster.getPlayerArr().map((p) => {
                return <>{p.inGame && <div className = {subOut == p.num ? "playerCell selPlayer": "playerCell"} onClick ={() => {handleOutSelect(p)}}>
                    {p.num} {p.firstName + " "} {p.lastName}
                    </div>}</>
           })}  
           </div>
           <div>
           <h3>Sub In</h3>
           {teamRoster.getPlayerArr().map((p) => {
                return <>{!p.inGame && <div className = {subIn == p.num ? "playerCell selPlayer": "playerCell"} onClick={() => {handleInSelect(p)}}>
                    {p.num} {p.firstName} {p.lastName}
                    </div>}</>
           })} 
           </div>
        </div>
        <Button onClick = {handleClose} variant="contained">Done</Button>
    </div>)
} 
export default observer(SubPanel);