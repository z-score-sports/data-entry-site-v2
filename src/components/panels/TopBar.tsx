import React from 'react';
import { observer } from "mobx-react-lite"
import '../../App.css';
import '../../css/panels/TopBar.css';

import ScoreBoard from '../ScoreBoard';


function TopBar() {

  return (
    <div className = 'tBar'>
        <ScoreBoard />
    </div>
  );
}

export default TopBar;