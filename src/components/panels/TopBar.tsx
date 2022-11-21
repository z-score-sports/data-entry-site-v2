import React, { useContext } from 'react';
import { observer } from "mobx-react-lite"
import '../../App.css';
import GameState from '../../state/GameState';
import { GameStateContext } from '../../App';

function TopBar() {

  const gameState = useContext(GameStateContext)

  return (
    <div className = 'tBar'>
      {gameState.scoreboard.quarter}
      
    </div>
  );
}

export default observer(TopBar);