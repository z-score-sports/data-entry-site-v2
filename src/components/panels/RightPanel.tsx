import React, { useContext } from 'react';
import { observer } from "mobx-react-lite"
import '../../App.css';
import GameState from '../../state/GameState';

function RightPanel() {

  const gameState = useContext(GameState)

  return (
    <div className = "rPanel">
      This is the right panel
    </div>
  );
}

export default observer(RightPanel);
