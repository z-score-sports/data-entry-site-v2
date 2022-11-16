import React, { useContext } from 'react';
import { observer } from "mobx-react-lite"
import '../../App.css';
import GameState from '../../state/GameState';

function MainPanel() {

  const gameState = useContext(GameState)

  return (
    <div className = "mPanel">
      This is the main panel
    </div>
  );
}

export default observer(MainPanel);
