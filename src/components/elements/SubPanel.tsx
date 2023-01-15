import { observer } from "mobx-react-lite";
import "../../App.css";

import { useContext, useState } from "react";
import { GameStateContext } from "../../App";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Roster } from "../../state/Roster";


type propsType = {
    handleClose: any;
    teamRoster: Roster;
};

function SubPanel({handleClose, teamRoster}: propsType) {

    const context = useContext(GameStateContext);
    const [minutes, setMinutes] = useState("")
    const [seconds, Seconds] = useState("")

    const [subOut, setSubOut] = useState(-1)
    const [subIn, setSubIn] = useState(-1)




    return (<div className = "popupPanel SubPlayerPanel">
        <h1>Substitute</h1>
        <div className = "timeInputWrapper">
        <TextField onChange = {(e) => {setMinutes(e.target.value)}} id="standard-basic" label="Minute" variant="standard" autoComplete="off"/>
        <TextField onChange = {(e) => {setMinutes(e.target.value)}} id="standard-basic" label="Second" variant="standard" autoComplete="off"/>
        </div>
        <div className = "subPlayerSelectorWrapper">
            <div>
                <h3>Sub Out</h3>
            {teamRoster.getPlayerArr().map((p) => {
                return <>{p.inGame && <div className = "playerCell">
                    {p.num} {p.firstName + " "} {p.lastName}
                    </div>}</>
           })}  
           </div>
           <div>
           <h3>Sub In</h3>
           {teamRoster.getPlayerArr().map((p) => {
                return <>{!p.inGame && <div className = "playerCell">
                    {p.num} {p.firstName} {p.lastName}
                    </div>}</>
           })} 
           </div>
        </div>
        <Button variant="contained">Complete</Button>
        <Button onClick = {handleClose} variant="outlined" color="error">Cancel</Button>
    </div>)
} 
export default observer(SubPanel);