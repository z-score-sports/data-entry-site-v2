import { makeAutoObservable } from "mobx";
import { GameTime } from "./GameTime";

type GameInterval = {
    timeIn: GameTime;
    timeOut: GameTime;
};

class MinutesKeeper {
    prefSum: number[] = [];
    intervals: GameInterval[] = [];
    lastTimeIn: GameTime = null;

    constructor() {
        makeAutoObservable(this);
    }

    getMinutes(currentGameTIme: GameTime): number {
        if (this.lastTimeIn && this.lastTimeIn.lte(currentGameTIme)) {
            return (
                this.prefSum[this.prefSum.length - 1] +
                this.lastTimeIn.minutesBetween(currentGameTIme)
            );
        }
        for (let i = this.intervals.length - 1; i >= 0; i -= 1) {
            if (this.intervals[i].timeOut.lte(currentGameTIme)) {
                return this.prefSum[i];
            } else if (this.intervals[i].timeIn.lte(currentGameTIme)) {
                let previousTime: number = i > 0 ? this.prefSum[i - 1] : 0;
                return (
                    previousTime +
                    this.intervals[i].timeIn.minutesBetween(currentGameTIme)
                );
            }
        }
        return 0;
    }

    addSubIn(gameTime: GameTime) {
        if (this.lastTimeIn !== null) {
            console.log(
                "warning: subbing in a player that's already in the game"
            );
            return;
        }
        this.lastTimeIn = gameTime;
    }

    addSubOut(gameTime: GameTime) {
        if (this.lastTimeIn === null) {
            console.log("warning: subbing out a player that isn't in the game");
            return;
        }

        let newInterval: GameInterval = {
            timeIn: this.lastTimeIn,
            timeOut: gameTime,
        };
        this.intervals.push(newInterval);
        let previousSum =
            this.prefSum.length > 0 ? this.prefSum[this.prefSum.length - 1] : 0;
        this.prefSum.push(
            previousSum + newInterval.timeIn.minutesBetween(newInterval.timeOut)
        );
        this.lastTimeIn = null;
    }

    removeSubIn() {
        if (this.lastTimeIn === null) {
            console.log(
                "warning: removing a sub in action from a player that isn't in the game"
            );
            return;
        }
        this.lastTimeIn = null;
    }

    removeSubOut() {
        if (this.lastTimeIn !== null) {
            console.log(
                "warning: removing a sub out action from a player who is in the game"
            );
            return;
        }

        this.prefSum.pop();
        let oldInterval = this.intervals.pop();
        this.lastTimeIn = oldInterval.timeIn;
    }
}

export { MinutesKeeper };
