import React, { useContext } from 'react';
import { observer } from "mobx-react-lite"
import '../../App.css';
import { GameStateContext } from '../../App';


function LeftPanel() {

  

  return (
    <div className = "lPanel">
      <div className = "regionTooltip"></div>
      <div className = "keyTooltip">
        <div className = "playToolTip"></div>
        <div className = "actionToolTip"></div>
      </div>
    </div>
  );
}

export default observer(LeftPanel);
