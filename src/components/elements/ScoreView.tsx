import { useContext, useState } from "react";
import { GameStateContext } from "../../App";
import { observer } from "mobx-react-lite";
import "./ScoreView.css";

function ScoreView() {
    const context = useContext(GameStateContext);


    return (<>
        <div className = "sideLblSect">
            <p>HOME{context.actionStack.curPos == 0 && <span className = "posCirc"></span>}</p>
            <img src="homeLogo.jpg"/>
        </div>
        <div className = "midSect">
            <p className = "qrtLbl">{context.scoreboard.getQuarter()}</p>
            <p className = "scoreLbl">{context.scoreboard.homePoints} - {context.scoreboard.awayPoints}</p>
            <div className = "foulCombinedSect">
                <div className = "foulSect">
                    <p className = "foulLbl">FOULS: 5</p>
                </div>
                <div className = "foulSect">
                    <p className = "foulLbl">FOULS: 5</p>
                </div>
            </div>
        </div>
        <div className = "sideLblSect">
            <p>AWAY{context.actionStack.curPos == 1 && <span className = "posCirc"></span>}</p>
            <img src="awayLogo.jpg"/>
        </div>
    </>)
}

export default observer(ScoreView)