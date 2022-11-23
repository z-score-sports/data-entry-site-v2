import React, { useContext } from 'react';
import { observer } from "mobx-react-lite"
import '../../App.css';
import GameState from '../../state/GameState';
import { GameStateContext } from '../../App';

function MainPanel() {

  const gameState = useContext(GameStateContext)

  return (
    <div className = "mPanel">
      This is the main panel
    </div>
  );
}

export default observer(MainPanel);
