import React, { createContext, useContext } from 'react';
import { observer } from "mobx-react-lite"
import './App.css';
import TopBar from './components/panels/TopBar';
import LeftPanel from './components/panels/LeftPanel';
import MainPanel from './components/panels/MainPanel';
import RightPanel from './components/panels/RightPanel';
import { GameState } from './state/GameState';
import { Team } from './state/Player';

const GameStateContext = createContext<GameState>(new GameState(Team.home));


function App() {

  return (
    <GameStateContext.Provider value={new GameState(Team.home)}>
      <div className="App">
        <TopBar/>
        <div className='MainSection'>
          <LeftPanel/>
          <MainPanel/>
          <RightPanel/>
        </div>
      </div>
    </GameStateContext.Provider>
  );
}

export {GameStateContext}
export default observer(App);
