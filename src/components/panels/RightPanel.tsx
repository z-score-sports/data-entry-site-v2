import React, { useContext } from 'react';
import { observer } from "mobx-react-lite"
import '../../App.css';
import GameState from '../../state/GameState';
import { GameStateContext } from '../../App';

function RightPanel() {

  const gameState = useContext(GameStateContext)

  return (
    <div className = "rPanel">
      This is the right panel
    </div>
  );
}

export default observer(RightPanel);
