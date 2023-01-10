import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { GameStateContext } from "../../App";
import "../../App.css";

function TopBar() {
    const context = useContext(GameStateContext);

 

    return (
        <div className="tBar">

        </div>
    );
}

export default observer(TopBar);
