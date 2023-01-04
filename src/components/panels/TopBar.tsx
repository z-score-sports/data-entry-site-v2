import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { GameStateContext } from "../../App";
import "../../App.css";

function TopBar() {
    const context = useContext(GameStateContext);

 

    return (
        <div className="tBar">
            {context.scoreboard.getQuarter()}
            <br />
            {context.scoreboard.homeFouls.firstHalfFouls} -
            {context.scoreboard.homeFouls.secondHalfFouls}
            <br />
            {context.scoreboard.awayFouls.firstHalfFouls} -
            {context.scoreboard.awayFouls.secondHalfFouls}
            <br />
            {context.scoreboard.awayPoints} - {context.scoreboard.homePoints}
        </div>
    );
}

export default observer(TopBar);
