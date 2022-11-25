import React, { useContext } from 'react';
import { observer } from "mobx-react-lite"
import '../../App.css';
import { GameStateContext } from '../../App';


function TopBar() {

  const gameState = useContext(GameStateContext)
  

  return (
    <div className = 'tBar'>
      {gameState.scoreboard.quarter}
      <br/>
      {gameState.scoreboard.awayPoints} - {gameState.scoreboard.homePoints}
      <button >Click please</button>
      
    </div>
  );
}

export default observer(TopBar);