import React, { useContext } from 'react';
import { observer } from "mobx-react-lite"
import '../../App.css';
import GameState from '../../state/GameState';
import { GameStateContext } from '../../App';
import RosterPanel from '../elements/RosterPanel'
import { Team } from '../../state/Player'; 

function RightPanel() {

  const context = useContext(GameStateContext)

  return (
    <div className = "rPanel">
      <RosterPanel teamRoster={context.gameRoster.getRoster(Team.home)} team = {0}/>
      <RosterPanel teamRoster={context.gameRoster.getRoster(Team.away)} team = {1}/>
    </div>
  );
}

export default observer(RightPanel);
