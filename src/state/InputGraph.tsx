import React, { FC, useContext } from 'react';


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
                    ['T', (monkey: MonkeyState, key: string, context: any) => { // Turnover
                        monkey.currNode = 1
                    }],
                    ['Q', (monkey: MonkeyState, key: string, context: any) => { // Defensive Foul
                        monkey.currNode = 2
                        console.log(monkey)
                    }],
                    ['W', (monkey: MonkeyState, key: string, context: any) => { // Offensive Foul
                        monkey.currNode = 3
                    }],
                    ['A', (monkey: MonkeyState, key: string, context: any) => { // Assist
                        monkey.currNode = 4
                    }],
                    ['E', (monkey: MonkeyState, key: string, context: any) => { // Defensive Rebound
                        monkey.currNode = 5
                    }],
                    ['R', (monkey: MonkeyState, key: string, context: any) => { // Offensive Rebound
                        monkey.currNode = 6
                    }],
                    ['B', (monkey: MonkeyState, key: string, context: any) => { // Offensive Rebound
                        monkey.currNode = 7
                    }],
                ])
            },
            {
                nodeDescription: "Turnover Node",
                promptUI: (monkey: MonkeyState) => { return (
                    <div>
                        <h1>Turnover Node</h1>
                        <h3>Input player #</h3>
                        <p>{monkey.primaryPlayNum == -100 ? "__" : monkey.primaryPlayNum}</p>
                    </div>
                )},
                inputHandler: new Map([
                    ['dig', (monkey: MonkeyState, key: string, context: any) => {
                        this.handleDigInput(monkey, key, true, () => {
                            context.actionStack.addTurnover(monkey.primaryPlayNum)
                        })
                    }],
                ])
            },
            {
                nodeDescription: "Defensive Foul Node",
                promptUI: (monkey: MonkeyState) => { return (
                    <div>
                        <h1>Defensive Foul</h1>
                        <h3>Input player #</h3>
                        <p>{monkey.primaryPlayNum == -100 ? "__" : monkey.primaryPlayNum}</p>
                    </div>
                )},
                inputHandler: new Map([
                    ['dig', (monkey: MonkeyState, key: string, context: any) => {
                        this.handleDigInput(monkey, key, true, () => {
                            let defTeam = (context.actionStack.curPos + 1) % 2 // Sets 0 -> 1, 1 -> 0
                            context.actionStack.addFoul(monkey.primaryPlayNum, defTeam)
                        })
                    }],
                ])
            },
            {
                nodeDescription: "Offensive Foul Node",
                promptUI: (monkey: MonkeyState) => { return (
                    <div>
                        <h1>Offensive Foul</h1>
                        <h3>Input player #</h3>
                        <p>{monkey.primaryPlayNum == -100 ? "__" : monkey.primaryPlayNum}</p>
                    </div>
                )},
                inputHandler: new Map([
                    ['dig', (monkey: MonkeyState, key: string, context: any) => {
                        this.handleDigInput(monkey, key, true, () => {
                            let offTeam = context.actionStack.curPos
                            context.actionStack.addFoul(monkey.primaryPlayNum, offTeam)
                        })
                    }],
                ])
            },
            {
                nodeDescription: "Assist Node",
                promptUI: (monkey: MonkeyState) => { return (
                    <div>
                        <h1>Assist</h1>
                        <h3>Input player #</h3>
                        <p>{monkey.primaryPlayNum == -100 ? "__" : monkey.primaryPlayNum}</p>
                    </div>
                )},
                inputHandler: new Map([
                    ['dig', (monkey: MonkeyState, key: string, context: any) => {
                        this.handleDigInput(monkey, key, true, () => {
                            context.actionStack.addAssist(monkey.primaryPlayNum)
                        })
                    }],
                ])
            },
            {
                nodeDescription: "Defensive Rebound Node",
                promptUI: (monkey: MonkeyState) => { return (
                    <div>
                        <h1>Defensive Rebound</h1>
                        <h3>Input player #</h3>
                        <p>{monkey.primaryPlayNum == -100 ? "__" : monkey.primaryPlayNum}</p>
                    </div>
                )},
                inputHandler: new Map([
                    ['dig', (monkey: MonkeyState, key: string, context: any) => {
                        this.handleDigInput(monkey, key, true, () => {
                            let defTeam = (context.actionStack.curPos + 1) % 2 // Sets 0 -> 1, 1 -> 0
                            context.actionStack.addRebound(monkey.primaryPlayNum, defTeam)
                        })
                    }],
                ])
            },
            {
                nodeDescription: "Offensive Rebound Node",
                promptUI: (monkey: MonkeyState) => { return (
                    <div>
                        <h1>Offensive Rebound</h1>
                        <h3>Input player #</h3>
                        <p>{monkey.primaryPlayNum == -100 ? "__" : monkey.primaryPlayNum}</p>
                    </div>
                )},
                inputHandler: new Map([
                    ['dig', (monkey: MonkeyState, key: string, context: any) => {
                        this.handleDigInput(monkey, key, true, () => {
                            let offTeam = context.actionStack.curPos
                            context.actionStack.addRebound(monkey.primaryPlayNum, offTeam)
                        })
                    }],
                ])
            },
            {
                nodeDescription: "Block Node",
                promptUI: (monkey: MonkeyState) => { return (
                    <div>
                        <h1>Block</h1>
                        <h3>Input player #</h3>
                        <p>{monkey.primaryPlayNum == -100 ? "__" : monkey.primaryPlayNum}</p>
                    </div>
                )},
                inputHandler: new Map([
                    ['dig', (monkey: MonkeyState, key: string, context: any) => {
                        this.handleDigInput(monkey, key, true, () => {
                            context.actionStack.addBlock(monkey.primaryPlayNum)
                        })
                    }],
                ])
            },
        ]
    }

    handleDigInput(monkey: MonkeyState, key: string, terminal: boolean, completionFunc: Function) {
        let numInp = parseInt(key)
        if(monkey.primaryPlayNum === -100){ // Enter first digit
            monkey.primaryPlayNum = 10 * numInp
        } else {
            monkey.primaryPlayNum = monkey.primaryPlayNum + numInp
            // Second Number pressed -- Add Turnover
            completionFunc()
            if(terminal) {
                //Reset MonkeyState
                monkey.currNode = 0
                monkey.primaryPlayNum = -100
            }
        }
    }

    isDigit(k: string) {
        return k in ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    }

    getNodePrompt(monkey: MonkeyState) {
        return this.inputGraph[monkey.currNode].promptUI(monkey)
    }
    


    traverseGraph(monkey: MonkeyState, pressedKey: string, context: any) {
        // Deep clone of MonkeyState
        let monkeyClone: MonkeyState = {currNode: monkey.currNode, primaryPlayNum: monkey.primaryPlayNum}

        // Find and execute the correct response to the input
        let traverseAction: Function
        if(this.isDigit(pressedKey)) {
            traverseAction = this.inputGraph[monkey.currNode].inputHandler.get('dig')
            traverseAction(monkeyClone, pressedKey, context)
        } else if(this.inputGraph[0].inputHandler.has(pressedKey)){
            console.log(this.inputGraph[monkey.currNode])
            traverseAction = this.inputGraph[monkey.currNode].inputHandler.get(pressedKey)
            traverseAction(monkeyClone, pressedKey, context)
        }
        // Pass the new Monkey State back to the InputPanel
        return monkeyClone
    }

}

export {InputGraph}
export type {MonkeyState}