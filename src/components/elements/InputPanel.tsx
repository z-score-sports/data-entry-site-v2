import { observer } from "mobx-react-lite";
import React, { useContext, useState, useEffect } from "react";
import { GameStateContext } from "../../App";
import {InputGraph, MonkeyState} from "../../state/InputGraph"
import "../../App.css";


function InputPanel() {
    const context = useContext(GameStateContext);
    const [currentPrompt, changePrompt] = useState(() => <p>Hi</p>)
    const [mState, setmState] = useState({currNode: -5, primaryPlayNum: -500})
    const [iGraph, setiGraph] = useState(new InputGraph())

    useEffect(() => {
      console.log("Main Use Effect Triggered")
      let initialMonkey = {currNode: 0, primaryPlayNum: -100}
      setmState(mState => ({...initialMonkey}))
      changePrompt(iGraph.getNodePrompt(initialMonkey))
      document.addEventListener("keydown", handleKeyPress)
    }, []) 

    useEffect(() => {
      document.addEventListener("keyup", handleKeyPress);
      return () => {
        document.removeEventListener("keyup", handleKeyPress);
      };
    }, [mState])    

    function handleKeyPress(e: KeyboardEvent) {
      console.log("Key press event")
      console.log(mState)
      let newMState = iGraph.traverseGraph(mState, e.key.toUpperCase(), context)
      setmState(mState => ({...mState, ...newMState}))
      changePrompt(iGraph.getNodePrompt(newMState))
    }



    return (
        <div>
          {currentPrompt}
          <pre>{JSON.stringify(mState, null, 2)}</pre>
        </div>
      );
}

export default observer(InputPanel);