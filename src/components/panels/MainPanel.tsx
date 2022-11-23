import React, { useContext } from 'react';
import { observer } from "mobx-react-lite"
import '../../App.css';
import GameState from '../../state/GameState';
import { GameStateContext } from '../../App';

function MainPanel() {

  const gameState = useContext(GameStateContext)

  const addShot = () => {
      console.log("Add shot clicked")
      gameState.actionStack.addShot(0, 3, true)
  }

  return (
    <div className = "mPanel">
      <p>{gameState.actionStack.curPos}</p>
      This is the main panel
      <button onClick={addShot}>Add shot to player 0</button>
    </div>
  );
}

export default observer(MainPanel);
