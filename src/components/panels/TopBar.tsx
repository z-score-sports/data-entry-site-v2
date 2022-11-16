import React, { useContext } from 'react';
import { observer } from "mobx-react-lite"
import '../../App.css';
import GameState from '../../state/GameState';

function TopBar() {

  const gameState = useContext(GameState)

  return (
    <div className = 'tBar'>
        <button onClick={() => {gameState.increaseQuarter()}}>Click to increase quarter.</button>
      {gameState.quarter}
      <br/>
      {gameState.awayTimeouts}
      <br/>
      {gameState.homeTimeouts}
    </div>
  );
}

export default observer(TopBar);