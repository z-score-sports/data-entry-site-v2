import { observer } from "mobx-react-lite";
import React, { useContext, useState, useEffect } from "react";
import { GameStateContext } from "../../App";
import {InputGraph, MonkeyState} from "../../state/InputGraph"
import "../../App.css";


function InputPanel() {

    const context = useContext(GameStateContext);

    const [currentPrompt, changePrompt] = useState(() => <p>Hi</p>) // Current UI to show
    const [mState, setmState] = useState({currNode: -5, primaryPlayNum: -500}) // Current Monkey State
    const [iGraph, setiGraph] = useState(new InputGraph()) // Input Graph Object

    // Set initial values
    useEffect(() => {
      let initialMonkey = {currNode: 0, primaryPlayNum: -100}
      setmState(mState => ({...initialMonkey}))
      changePrompt(iGraph.getNodePrompt(initialMonkey))
    }, []) 


    /*
    The KeyEventListener needs to be reset each time the monkey state changes. 
    This is because when the eventlistener is set, it copies the handleKeyPress() 
    function based on the monkey state at the time
    */
    useEffect(() => {
      document.addEventListener("keypress", handleKeyPress);
      return () => { // On Cleanup
        document.removeEventListener("keypress", handleKeyPress);
      };
    }, [mState])    

    

    function handleKeyPress(e: KeyboardEvent) {
      // Traverse the input graph and update the MonkeyState
      let newMState = iGraph.traverseGraph(mState, e.key.toUpperCase(), context)
      setmState(mState => ({...mState, ...newMState}))
      // Update the UI
      changePrompt(iGraph.getNodePrompt(newMState))
    }

    return (
        <div>
          {currentPrompt}
        </div>
      );
}

export default observer(InputPanel);