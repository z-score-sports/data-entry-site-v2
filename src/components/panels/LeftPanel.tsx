import React, { useContext } from 'react';
import { observer } from "mobx-react-lite"
import '../../App.css';
import { GameStateContext } from '../../App';
import RosterPanel from '../elements/RosterPanel'
import { Team } from '../../state/Player'; 

function LeftPanel() {

  const gameState = useContext(GameStateContext)

  return (
    <div className = "lPanel">
      <RosterPanel team={gameState.gameRoster.getRoster(Team.home)}/>
      <RosterPanel team={gameState.gameRoster.getRoster(Team.away)}/>
    </div>
  );
}

export default observer(LeftPanel);
