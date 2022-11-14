import React, { useContext } from 'react';
import { observer } from "mobx-react-lite"
import './App.css';
import GameState from './state/GameState';

function App() {

  const gameState = useContext(GameState)

  return (
    <div className="App">
      This is our app.
      <br/>
      {gameState.homeRoster.getLineupString()}
      <br/>
      {gameState.awayRoster.getLineupString()}
    </div>
  );
}

export default observer(App);
