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
      <button onClick={() => {gameState.increaseQuarter()}}>Click to increase quarter.</button>
      {gameState.quarter}
      <br/>
      {gameState.awayTimeouts}
      <br/>
      {gameState.homeTimeouts}
    </div>
  );
}

export default observer(App);
