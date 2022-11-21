import React, { useContext } from 'react';
import { observer } from "mobx-react-lite"
import '../../App.css';
import { GameStateContext } from '../../App';
import { Shot } from '../../state/actions/Shot';
import { GameTime } from '../../state/Player';

function TopBar() {

  const gameState = useContext(GameStateContext)

  const sub = () => {
    gameState.homeRoster.substitute(5, 0, new GameTime(1, 10, 0))
    
    console.log(gameState.homeRoster.lineupString)
    gameState.homeRoster.lineupArray.forEach((player) => {
      console.log(player.num + " " + player.minutes)
    })
  }
  

  return (
    <div className = 'tBar'>
      {gameState.scoreboard.quarter}
      <br/>
      {gameState.scoreboard.awayPoints} - {gameState.scoreboard.homePoints}
      <button onClick={sub}>Click please</button>
      
    </div>
  );
}

export default observer(TopBar);