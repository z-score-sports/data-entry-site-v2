import React, { useContext } from 'react';
import { observer } from "mobx-react-lite"
import './App.css';
import GameState from './state/GameState';
import TopBar from './components/panels/TopBar';
import LeftPanel from './components/panels/LeftPanel';
import MainPanel from './components/panels/MainPanel';
import RightPanel from './components/panels/RightPanel';

function App() {

  const gameState = useContext(GameState)


  return (
    <div className="App">
      <TopBar/>
      <div className='MainSection'>
        <LeftPanel/>
        <MainPanel/>
        <RightPanel/>
      </div>
    </div>
  );
}

export default observer(App);
