import React, { useContext } from 'react';
import { observer } from "mobx-react-lite"
import '../../App.css';
import { GameStateContext } from '../../App';
import { Shot } from '../../state/actions/Shot';

function TopBar() {

  const gameState = useContext(GameStateContext)

  

  return (
    <div className = 'tBar'>
      {gameState.scoreboard.quarter}
      <br/>
      {gameState.scoreboard.awayPoints} - {gameState.scoreboard.homePoints}

      
    </div>
  );
}

export default observer(TopBar);