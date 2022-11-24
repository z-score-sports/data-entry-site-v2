import React, { useContext } from 'react';
import { observer } from "mobx-react-lite"
import '../../App.css';
import GameState from '../../state/GameState';
import { GameStateContext } from '../../App';
import { Team } from '../../state/Player';

function MainPanel() {

  const gameState = useContext(GameStateContext)

  const addShot = () => {
      gameState.actionStack.addShot(0, 3, true)
  }

  const undoAction = () => {
      gameState.actionStack.undo()

  }

  const redoAction = () => {
      gameState.actionStack.redo();
  }

  const addFoul = () => {
    gameState.actionStack.addFoul(0, Team.home)
  }

  const addRebound = () => {
    gameState.actionStack.addRebound(1, Team.home)
  }
  const addAssist = () => {
    gameState.actionStack.addAssist(1)
  }

  return (
    <div className = "mPanel">
      <p>{gameState.actionStack.curPos}</p>
      This is the main panel
      <div>
        <button onClick={addShot}>Add shot to player 0</button>
        <button onClick={undoAction}>Undo</button>
        <button onClick={redoAction}>Redo</button>
      </div>
      <div>
        <button onClick={addFoul}>Add foul to player 0</button>
      </div>
      <div>
        <button onClick={addRebound}>Add rebound to player 1</button>
      </div>
      <div>
        <button onClick={addAssist}>Add assist to player 1</button>
      </div>
    </div>
  );
}

export default observer(MainPanel);
