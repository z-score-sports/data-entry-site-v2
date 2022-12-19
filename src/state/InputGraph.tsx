import React, { FC, useContext } from 'react';
import {GameContext} from './GameState';
import { GameStateContext } from "../App";

// The information about the current action that is being added
type MonkeyState = {
    currNode: number, // Index of node where user is currently on graph
    primaryPlayNum: number //-100 by default in order to track if the first digit has been inputted yet
}

type Node = {
    nodeDescription: string;
    promptUI: FC<MonkeyState> // The UI that the user should see when on this node
    inputHandler: Map<string, Function> // The different responses to key presses
}

class InputGraph {
    inputGraph: Node[];

     

    public constructor() {
        this.inputGraph = [
            {
                nodeDescription: "Base Node",
                promptUI: () => { return (
                    <div><h1>Currently at base node</h1></div>
                )},
                inputHandler: new Map([
                    ['T', (monkey: MonkeyState, key: string, context: any) => {
                        monkey.currNode = 1
                    }],
                ])
            },
            {
                nodeDescription: "Turnover Node",
                promptUI: (monkey: MonkeyState) => { return (
                    <div>
                        <h1>Turnover</h1>
                        <h3>Input player #</h3>
                        <p>{monkey.primaryPlayNum == -100 ? "__" : monkey.primaryPlayNum}</p>
                    </div>
                )},
                inputHandler: new Map([
                    ['dig', (monkey: MonkeyState, key: string, context: any) => {
                        let numInp = parseInt(key)
                        if(monkey.primaryPlayNum === -100){
                            monkey.primaryPlayNum = 10 * numInp
                        } else {
                            monkey.primaryPlayNum = monkey.primaryPlayNum + numInp

                            // Second Number pressed -- Add Turnover
                            context.actionStack.addTurnover(monkey.primaryPlayNum)
                            monkey.currNode = 0
                            monkey.primaryPlayNum = -100
                        }
                    }],
                ])
            }
        ]
    }

    isDigit(k: string) {
        return k in ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    }

    getNodePrompt(monkey: MonkeyState) {
        return this.inputGraph[monkey.currNode].promptUI(monkey)
    }
    resetMonkey(monkey: MonkeyState) {
        console.log('Resetting monkey')
        monkey = {
            currNode: 0,
            primaryPlayNum: -100
        }
        return monkey
    }

    traverseGraph(monkey: MonkeyState, pressedKey: string, context: any) {
        
        let monkeyClone: MonkeyState = {currNode: monkey.currNode, primaryPlayNum: monkey.primaryPlayNum}
        let traverseAction: Function
        if(this.isDigit(pressedKey)) {
            traverseAction = this.inputGraph[monkey.currNode].inputHandler.get('dig')
        } else {
            traverseAction = this.inputGraph[monkey.currNode].inputHandler.get(pressedKey)
        }

        traverseAction(monkeyClone, pressedKey, context)
        return monkeyClone
    }

}

export {InputGraph}
export type {MonkeyState}