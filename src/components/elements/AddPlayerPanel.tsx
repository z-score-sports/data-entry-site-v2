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

function AddPlayerPanel({handleClose, teamRoster}: propsType) {

    const context = useContext(GameStateContext);
    const [num, setNum] = useState("")
    const [fName, setFName] = useState("")
    const [lName, setLName] = useState("")

    const addPlayer = () => {
        teamRoster.addPlayer(+num, fName, lName)
        handleClose()
    }

    return (<div className = "popupPanel AddPlayerPanel">
        <h1>Add Player</h1>

        <TextField onChange = {(e) => {setNum(e.target.value)}} id="standard-basic" label="Number" variant="standard" autoComplete="off"/>

        <div>
        <TextField onChange = {(e) => {setFName(e.target.value)}} id="standard-basic" label="First Name" variant="standard" autoComplete="off"/>
        <TextField onChange = {(e) => {setLName(e.target.value)}} style = {{marginLeft: 30}} id="standard-basic" label="Last Name" variant="standard" autoComplete="off"/>
        </div>
        <div>
            
        </div>

        <div className = "AddPlayerRowWrapper">
        <Button onClick = {addPlayer} variant="contained">Add +</Button>
        <Button onClick = {handleClose} style = {{marginLeft: 30}} variant="outlined" color="error">Cancel</Button>
        </div>
    </div>)
} 
export default observer(AddPlayerPanel);