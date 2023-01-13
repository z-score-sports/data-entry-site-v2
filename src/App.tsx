import { observer } from "mobx-react-lite";
import { createContext, useContext } from "react";
import "./App.css";
import LeftPanel from "./components/panels/LeftPanel";
import MainPanel from "./components/panels/MainPanel";
import RightPanel from "./components/panels/RightPanel";
import TopBar from "./components/panels/TopBar";
import RosterMgmtPanel from "./components/panels/RosterMgmtPanel";
import { GameContext } from "./state/GameState";
import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";


const context = GameContext;

const GameStateContext = createContext(context);

function App() {
    const gContext = useContext(GameStateContext);

    return (
        <GameStateContext.Provider value={context}>
           <Router>
            <div className="App">
                <TopBar />
                <Routes>
                    <Route path = "/" element = {                
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
                </div>}/>
                    <Route path = "/roster" element = {<RosterMgmtPanel/>}/>
                </Routes>
            </div>
            </Router>
        </GameStateContext.Provider>
    );
}

export { GameStateContext };
export default observer(App);
