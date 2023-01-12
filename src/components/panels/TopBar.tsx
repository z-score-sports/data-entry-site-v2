import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { GameStateContext } from "../../App";
import {NavLink} from "react-router-dom"
import "../../App.css";

function TopBar() {
    const context = useContext(GameStateContext);

 

    return (
        <div className="tBar">
            <img src = "logo.jpg"/>
            <div className = "navbar">
                <NavLink style = {{}}to="/">Dashboard</NavLink>
                <NavLink to="/analytics">Analytics</NavLink>
                <NavLink to="/roster">Roster Management</NavLink>
            </div>
        </div>
    );
}

export default observer(TopBar);
