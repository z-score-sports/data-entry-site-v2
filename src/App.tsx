import { observer } from "mobx-react-lite";
import { createContext, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import AnalyticsPage from "./components/panels/AnalyticsPage";
import LeftPanel from "./components/panels/LeftPanel";
import MainPanel from "./components/panels/MainPanel";
import RightPanel from "./components/panels/RightPanel";
import RosterMgmtPanel from "./components/panels/RosterMgmtPanel";
import TopBar from "./components/panels/TopBar";
import { GameContext } from "./state/GameState";

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
                        <Route
                            path="/"
                            element={
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
                            }
                        />
                        <Route path="/roster" element={<RosterMgmtPanel />} />
                        <Route path="/analytics" element={<AnalyticsPage />} />
                    </Routes>
                </div>
            </Router>
        </GameStateContext.Provider>
    );
}

export { GameStateContext };
export default observer(App);
