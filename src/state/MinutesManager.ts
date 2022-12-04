import { GameTime } from "./GameTime";

type GameInterval = {
    timeIn: GameTime;
    timeOut: GameTime;
};

class MinutesManager {
    prefSum: number[] = [];
    intervals: GameInterval[] = [];
    lastTimeIn: GameTime = null;

    addTimeGoingIn(gameTime: GameTime) {
        if (this.lastTimeIn !== null) {
            return;
        }
        this.lastTimeIn = gameTime;
    }

    addTimeGoingOut(gameTime: GameTime) {
        if (this.lastTimeIn === null) {
            return;
        }

        let newInterval: GameInterval = {
            timeIn: this.lastTimeIn,
            timeOut: gameTime,
        };
        this.intervals.push(newInterval);
        this.prefSum.push(
            newInterval.timeIn.minutesBetween(newInterval.timeOut)
        );
        this.lastTimeIn = null;
    }

    getTotalMinutes(curTime: GameTime): number {
        if (this.lastTimeIn && this.lastTimeIn.lte(curTime)) {
            return (
                this.prefSum[this.prefSum.length - 1] +
                this.lastTimeIn.minutesBetween(curTime)
            );
        }

        for (let i = this.intervals.length - 1; i >= 0; i -= 1) {
            // three cases -> either greater than the time out, between, or less than
            if (this.intervals[i].timeOut.lte(curTime)) {
                return this.prefSum[i];
            } else if (
                this.intervals[i].timeIn.lte(curTime) &&
                curTime.lte(this.intervals[i].timeOut)
            ) {
                let prevSum = i > 0 ? this.prefSum[i - 1] : 0;
                return (
                    prevSum + this.intervals[i].timeIn.minutesBetween(curTime)
                );
            }
        }
        return 0;
    }

    undo() {
        // if last time in exists, then just remove it
        // if it doesn't exist, need to remove one from the intervals and update last time in
        if (this.lastTimeIn !== null) {
            this.lastTimeIn = null;
        } else {
            this.prefSum.pop();
            let oldInterval = this.intervals.pop();
            this.lastTimeIn = oldInterval.timeIn;
        }
    }
}

export { MinutesManager };
