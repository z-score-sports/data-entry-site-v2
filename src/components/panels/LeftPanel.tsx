import React, { useContext } from 'react';
import { observer } from "mobx-react-lite"
import '../../App.css';
import GameState from '../../state/GameState';
import RosterPanel from '../elements/RosterPanel'

function LeftPanel() {

  const gameState = useContext(GameState)

  return (
    <div className = "lPanel">
      <RosterPanel team={gameState.homeRoster}/>
      <RosterPanel team={gameState.awayRoster}/>
    </div>
  );
}

export default observer(LeftPanel);
