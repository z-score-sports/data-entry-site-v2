import React, { useContext } from 'react';
import { observer } from "mobx-react-lite"
import '../../App.css';
import { GameStateContext } from '../../App';


function TopBar() {

  const context = useContext(GameStateContext)
  

  return (
    <div className = 'tBar'>
      {context.scoreboard.quarter}
      <br/>
      {context.scoreboard.awayPoints} - {context.scoreboard.homePoints}
      <button >Click please</button>
      
    </div>
  );
}

export default observer(TopBar);