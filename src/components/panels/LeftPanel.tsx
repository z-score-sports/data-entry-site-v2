import React, { useContext } from 'react';
import { observer } from "mobx-react-lite"
import '../../App.css';
import GameState from '../../state/GameState';

function LeftPanel() {

  const gameState = useContext(GameState)

  return (
    <div className = "lPanel">
      This is the left panel
    </div>
  );
}

export default observer(LeftPanel);
