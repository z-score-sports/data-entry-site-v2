import React, { FC, useContext } from "react";

// The information about the current action that is being added
type MonkeyState = {
  currNode: string; // Index of node where user is currently on graph
  primaryPlayNum: number; //-100 by default in order to track if the first digit has been inputted yet
  secondaryPlayNum: number;
};

type Node = {
  nodeDescription: string;
  promptUI: FC<MonkeyState>; // The UI that the user should see when on this node
  inputHandler: Map<string, Function>; // The different responses to key presses
};

class InputGraph {
  inputGraph: Map<string, Node>;

  public constructor() {
    this.inputGraph = new Map([
      [
        "base",
        {
          nodeDescription: "Base Node",
          promptUI: () => {
            return (
              <div>
                <h1>Currently at base node</h1>
              </div>
            );
          },
          inputHandler: new Map([
            [
              "T",
              (monkey: MonkeyState, key: string, context: any) => {
                // Turnover
                monkey.currNode = "turnover";
              },
            ],
            [
              "Q",
              (monkey: MonkeyState, key: string, context: any) => {
                // Defensive Foul
                monkey.currNode = "defFoul";
              },
            ],
            [
              "W",
              (monkey: MonkeyState, key: string, context: any) => {
                // Offensive Foul
                monkey.currNode = "offFoul";
              },
            ],
            [
              "A",
              (monkey: MonkeyState, key: string, context: any) => {
                // Assist
                monkey.currNode = "assist";
              },
            ],
            [
              "E",
              (monkey: MonkeyState, key: string, context: any) => {
                // Defensive Rebound
                monkey.currNode = "defReb";
              },
            ],
            [
              "R",
              (monkey: MonkeyState, key: string, context: any) => {
                // Offensive Rebound
                monkey.currNode = "offReb";
              },
            ],
            [
              "B",
              (monkey: MonkeyState, key: string, context: any) => {
                // Offensive Rebound
                monkey.currNode = 'block';
              },
            ],
            [
              "J",
              (monkey: MonkeyState, key: string, context: any) => {
                // Steal
                monkey.currNode = 'steal-inpStealing#';
              },
            ],
          ]),
        },
      ],
      [
        "turnover",
        {
          nodeDescription: "Turnover Node",
          promptUI: (monkey: MonkeyState) => {
            return (
              <div>
                <h1>Turnover Node</h1>
                <h3>Input player #</h3>
                <p>
                  {monkey.primaryPlayNum == -100 ? "__" : monkey.primaryPlayNum}
                </p>
              </div>
            );
          },
          inputHandler: new Map([
            [
              "dig",
              (monkey: MonkeyState, key: string, context: any) => {
                this.handleDigInput(monkey, key, true, true, () => {
                  context.actionStack.addTurnover(monkey.primaryPlayNum);
                });
              },
            ],
          ]),
        },
      ], ["defFoul", {
        nodeDescription: "Defensive Foul Node",
        promptUI: (monkey: MonkeyState) => {
          return (
            <div>
              <h1>Defensive Foul</h1>
              <h3>Input player #</h3>
              <p>
                {monkey.primaryPlayNum == -100 ? "__" : monkey.primaryPlayNum}
              </p>
            </div>
          );
        },
        inputHandler: new Map([
          [
            "dig",
            (monkey: MonkeyState, key: string, context: any) => {
              this.handleDigInput(monkey, key, true, true, () => {
                let defTeam = (context.actionStack.curPos + 1) % 2; // Sets 0 -> 1, 1 -> 0
                context.actionStack.addFoul(monkey.primaryPlayNum, defTeam);
              });
            },
          ],
        ]),
      }
      ], ["offFoul", {
        nodeDescription: "Offensive Foul Node",
        promptUI: (monkey: MonkeyState) => {
          return (
            <div>
              <h1>Offensive Foul</h1>
              <h3>Input player #</h3>
              <p>
                {monkey.primaryPlayNum == -100 ? "__" : monkey.primaryPlayNum}
              </p>
            </div>
          );
        },
        inputHandler: new Map([
          [
            "dig",
            (monkey: MonkeyState, key: string, context: any) => {
              this.handleDigInput(monkey, key, true, true, () => {
                let offTeam = context.actionStack.curPos;
                context.actionStack.addFoul(monkey.primaryPlayNum, offTeam);
              });
            },
          ],
        ]),
      }
    ], ["assist", {
        nodeDescription: "Assist Node",
        promptUI: (monkey: MonkeyState) => {
          return (
            <div>
              <h1>Assist</h1>
              <h3>Input player #</h3>
              <p>
                {monkey.primaryPlayNum == -100 ? "__" : monkey.primaryPlayNum}
              </p>
            </div>
          );
        },
        inputHandler: new Map([
          [
            "dig",
            (monkey: MonkeyState, key: string, context: any) => {
              this.handleDigInput(monkey, key, true, true, () => {
                context.actionStack.addAssist(monkey.primaryPlayNum);
              });
            },
          ],
        ]),
      }
    ], ["defReb", {
        nodeDescription: "Defensive Rebound Node",
        promptUI: (monkey: MonkeyState) => {
          return (
            <div>
              <h1>Defensive Rebound</h1>
              <h3>Input player #</h3>
              <p>
                {monkey.primaryPlayNum == -100 ? "__" : monkey.primaryPlayNum}
              </p>
            </div>
          );
        },
        inputHandler: new Map([
          [
            "dig",
            (monkey: MonkeyState, key: string, context: any) => {
              this.handleDigInput(monkey, key, true, true, () => {
                let defTeam = (context.actionStack.curPos + 1) % 2; // Sets 0 -> 1, 1 -> 0
                context.actionStack.addRebound(monkey.primaryPlayNum, defTeam);
              });
            },
          ],
        ]),
      }
    ], ["offReb",  {
        nodeDescription: "Offensive Rebound Node",
        promptUI: (monkey: MonkeyState) => {
          return (
            <div>
              <h1>Offensive Rebound</h1>
              <h3>Input player #</h3>
              <p>
                {monkey.primaryPlayNum == -100 ? "__" : monkey.primaryPlayNum}
              </p>
            </div>
          );
        },
        inputHandler: new Map([
          [
            "dig",
            (monkey: MonkeyState, key: string, context: any) => {
              this.handleDigInput(monkey, key, true, true, () => {
                let offTeam = context.actionStack.curPos;
                context.actionStack.addRebound(monkey.primaryPlayNum, offTeam);
              });
            },
          ],
        ]),
      }], ['block',  {
        nodeDescription: "Block Node",
        promptUI: (monkey: MonkeyState) => {
          return (
            <div>
              <h1>Block</h1>
              <h3>Input player #</h3>
              <p>
                {monkey.primaryPlayNum == -100 ? "__" : monkey.primaryPlayNum}
              </p>
            </div>
          );
        },
        inputHandler: new Map([
          [
            "dig",
            (monkey: MonkeyState, key: string, context: any) => {
              this.handleDigInput(monkey, key, true, true, () => {
                context.actionStack.addBlock(monkey.primaryPlayNum);
              });
            },
          ],
        ]),
      }], ['steal-inpStealing#',  {
        nodeDescription: "Steal Node-Input Stealing #",
        promptUI: (monkey: MonkeyState) => {
          return (
            <div>
              <h1>Steal</h1>
              <h3>Input Stealing Player #</h3>
              <p>
                {monkey.primaryPlayNum == -100 ? "__" : monkey.primaryPlayNum}
              </p>
            </div>
          );
        },
        inputHandler: new Map([
          [
            "dig",
            (monkey: MonkeyState, key: string, context: any) => {
              this.handleDigInput(monkey, key, false, true, () => {
                monkey.currNode = 'steal-inpStolen#';
              });
            },
          ],
        ]),
      }], ['steal-inpStolen#',       {
        nodeDescription: "Steal Node-Input Stolen #",
        promptUI: (monkey: MonkeyState) => {
          return (
            <div>
              <h1>Steal</h1>
              <h3>Input Player # who Turned Over</h3>
              <p>
                {monkey.secondaryPlayNum == -100
                  ? "__"
                  : monkey.secondaryPlayNum}
              </p>
            </div>
          );
        },
        inputHandler: new Map([
          [
            "dig",
            (monkey: MonkeyState, key: string, context: any) => {
              this.handleDigInput(monkey, key, true, false, () => {
                context.actionStack.addSteal(
                  monkey.secondaryPlayNum,
                  monkey.primaryPlayNum
                );
              });
            },
          ],
        ]),
      }], ['shot',  {
        nodeDescription: "Shot",
        promptUI: (monkey: MonkeyState) => {
          return (
            <div>
              <h1>Shot</h1>
              <h3>Input Shooting Player #</h3>
              <p>
                {monkey.primaryPlayNum == -100 ? "__" : monkey.primaryPlayNum}
              </p>
            </div>
          );
        },
        inputHandler: new Map([
          [
            "dig",
            (monkey: MonkeyState, key: string, context: any) => {
              this.handleDigInput(monkey, key, false, true, () => {
                monkey.currNode = 'steal-inpStolen#';
              });
            },
          ],
        ]),
      }]
    ]);
  }

  handleDigInput(
    monkey: MonkeyState,
    key: string,
    terminal: boolean,
    primaryNum: boolean,
    completionFunc: Function
  ) {
    if (primaryNum) {
      if(key == "ENTER") {
        completionFunc();
        if (terminal) {
          //Reset MonkeyState
          monkey.currNode = "base";
          monkey.primaryPlayNum = 0;
          monkey.secondaryPlayNum = 0;
        }
      } else if(key == "BACKSPACE") {
        monkey.primaryPlayNum = Math.floor(monkey.primaryPlayNum / 10)
      } else {
        let numInp = parseInt(key);
        if(monkey.primaryPlayNum > 9) {
            monkey.primaryPlayNum = Math.floor(monkey.primaryPlayNum / 10)
        }
        monkey.primaryPlayNum = 10 * monkey.primaryPlayNum + numInp
      }
    } else {
        if(key == "ENTER") {
            completionFunc();
            if (terminal) {
              //Reset MonkeyState
              monkey.currNode = "base";
              monkey.primaryPlayNum = 0;
              monkey.secondaryPlayNum = 0;
            }
          } else if(key == "BACKSPACE") {
            monkey.secondaryPlayNum = Math.floor(monkey.secondaryPlayNum / 10)
          } else {
            let numInp = parseInt(key);
            if(monkey.secondaryPlayNum > 9) {
                monkey.secondaryPlayNum = Math.floor(monkey.secondaryPlayNum / 10)
            }
            monkey.secondaryPlayNum = 10 * monkey.secondaryPlayNum + numInp
          }
    }
  }

  isDigit(k: string) {
    let validDigit: boolean = false;
    ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "ENTER", "BACKSPACE"].forEach((dig) => {
       if(k == dig) {
        validDigit = true
       }
    })
    return validDigit
  }

  getNodePrompt(monkey: MonkeyState) {
    return this.inputGraph.get(monkey.currNode).promptUI(monkey);
  }

  traverseGraph(monkey: MonkeyState, pressedKey: string, context: any) {
    // Deep clone of MonkeyState
    let monkeyClone: MonkeyState = {
      currNode: monkey.currNode,
      primaryPlayNum: monkey.primaryPlayNum,
      secondaryPlayNum: monkey.secondaryPlayNum,
    };
    

        // Find and execute the correct response to the input
        let traverseAction: Function
        if(this.isDigit(pressedKey)) {
            traverseAction = this.inputGraph.get(monkey.currNode).inputHandler.get('dig')
            traverseAction(monkeyClone, pressedKey, context)
        } else if(this.inputGraph.get(monkey.currNode).inputHandler.has(pressedKey)){
            traverseAction = this.inputGraph.get(monkey.currNode).inputHandler.get(pressedKey)
            traverseAction(monkeyClone, pressedKey, context)
        }
        
    // Pass the new Monkey State back to the InputPanel
    return monkeyClone;
  }
}

export { InputGraph };
export type { MonkeyState };
