import { observer } from "mobx-react-lite";
import { createContext, useContext } from "react";
import "./App.css";
import LeftPanel from "./components/panels/LeftPanel";
import MainPanel from "./components/panels/MainPanel";
import RightPanel from "./components/panels/RightPanel";
import TopBar from "./components/panels/TopBar";
import { GameContext } from "./state/GameState";

const context = GameContext;

const GameStateContext = createContext(context);

function App() {
    const gContext = useContext(GameStateContext);

    return (
        <GameStateContext.Provider value={context}>
            <div className="App">
                <TopBar />
                <div className="MainSection">
                    <div className="panel leftwrapper">
                        <LeftPanel />
                    </div>
                    <div className="panel mainwrapper">
                        <MainPanel />
                    </div>
                    <div className="panel rightwrapper">
                        <RightPanel />
                    </div>
                </div>
            </div>
        </GameStateContext.Provider>
    );
}

export { GameStateContext };
export default observer(App);
