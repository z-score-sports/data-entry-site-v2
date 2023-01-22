import { observer } from "mobx-react-lite";
import { useContext, useRef, useState } from "react";
import { GameStateContext } from "../../App";
import "./ScoreView.css";

function ScoreView() {
    const context = useContext(GameStateContext);
    const [homeTimeouts, setHomeTimeouts] = useState(4);
    const [awayTimeouts, setAwayTimeouts] = useState(4);

    const homeIncrease = useRef(null);
    const awayIncrease = useRef(null);
    const homeDecrease = useRef(null);
    const awayDecrease = useRef(null);

    const handleHomeIncrease = () => {
        setHomeTimeouts(Math.min(homeTimeouts + 1, 4));
        homeIncrease.current.blur();
    };
    const handleAwayIncrease = () => {
        setAwayTimeouts(Math.min(awayTimeouts + 1, 4));
        awayIncrease.current.blur();
    };
    const handleHomeDecrease = () => {
        setHomeTimeouts(Math.max(0, homeTimeouts - 1));
        homeDecrease.current.blur();
    };
    const handleAwayDecrease = () => {
        setAwayTimeouts(Math.max(0, awayTimeouts - 1));
        awayDecrease.current.blur();
    };

    return (
        <>
            <div className="sideLblSect">
                <p>
                    HOME
                    {context.actionStack.curPos == 0 && (
                        <span className="posCirc"></span>
                    )}
                </p>
                <img src="homeLogo.jpg" />
            </div>
            <div className="midSect">
                <p className="qrtLbl">{context.scoreboard.getQuarter()}</p>
                <p className="scoreLbl">
                    {context.scoreboard.homePoints} -{" "}
                    {context.scoreboard.awayPoints}
                </p>
                <div className="foulCombinedSect">
                    <div className="foulSect">
                        <p className="foulLbl">FOULS: 5</p>
                    </div>
                    <div className="foulSect">
                        <p className="foulLbl">FOULS: 5</p>
                    </div>
                </div>
                <div className="scoreTimeoutSect">
                    <div className="timeoutSect">
                        <button
                            ref={homeDecrease}
                            className="timeoutButton"
                            onClick={handleHomeDecrease}
                        >
                            -
                        </button>
                        {[...Array(4)].map((val, i) => (
                            <div
                                className={`circle ${
                                    i + 1 <= homeTimeouts
                                        ? "filled"
                                        : "unfilled"
                                }`}
                            ></div>
                        ))}
                        <button
                            ref={homeIncrease}
                            className="timeoutButton"
                            onClick={handleHomeIncrease}
                        >
                            +
                        </button>
                    </div>
                    <div className="timeoutSect">
                        <button
                            ref={awayDecrease}
                            className="timeoutButton"
                            onClick={handleAwayDecrease}
                        >
                            -
                        </button>
                        {[...Array(4)].map((val, i) => (
                            <div
                                className={`circle ${
                                    i + 1 <= awayTimeouts
                                        ? "filled"
                                        : "unfilled"
                                }`}
                            ></div>
                        ))}
                        <button
                            ref={awayIncrease}
                            className="timeoutButton"
                            onClick={handleAwayIncrease}
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
            <div className="sideLblSect">
                <p>
                    AWAY
                    {context.actionStack.curPos == 1 && (
                        <span className="posCirc"></span>
                    )}
                </p>
                <img src="awayLogo.jpg" />
            </div>
        </>
    );
}

export default observer(ScoreView);
