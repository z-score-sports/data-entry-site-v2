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




    return (<div className = "AddPlayerPanel">
        <h1>Substitute</h1>
        <TextField onChange = {(e) => {setMinutes(e.target.value)}} id="standard-basic" label="Minute" variant="standard" autoComplete="off"/>
        <TextField onChange = {(e) => {setMinutes(e.target.value)}} id="standard-basic" label="Second" variant="standard" autoComplete="off"/>


        <Button variant="contained">Complete</Button>
        <Button onClick = {handleClose} variant="outlined" color="error">Cancel</Button>
    </div>)
} 
export default observer(SubPanel);