import React, { useContext } from 'react';
import { observer } from "mobx-react-lite"
import '../../App.css';
import { GameStateContext } from '../../App';
import RosterPanel from '../elements/RosterPanel'
import { Team } from '../../state/Player'; 

function LeftPanel() {

  const context = useContext(GameStateContext)

  return (
    <div className = "lPanel">
      <RosterPanel team={context.gameRoster.getRoster(Team.home)}/>
      <RosterPanel team={context.gameRoster.getRoster(Team.away)} />
    </div>
  );
}

export default observer(LeftPanel);
