import React, { createContext, useContext } from 'react';
import { observer } from "mobx-react-lite"
import './App.css';
import TopBar from './components/panels/TopBar';
import LeftPanel from './components/panels/LeftPanel';
import MainPanel from './components/panels/MainPanel';
import RightPanel from './components/panels/RightPanel';
import {GameContext} from './state/GameState';


const context = GameContext

const GameStateContext = createContext(context);




function App() {

  return (
    <GameStateContext.Provider value={context}>
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
