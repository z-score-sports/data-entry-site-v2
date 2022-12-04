class GameTime {
    // assumption: 12 minute quarters, 5 minute overtime, any number of quarters
    quarter: number;
    minutes: number;
    seconds: number;

    constructor(quarter: number, minutes: number, seconds: number) {
        this.quarter = quarter;
        this.minutes = minutes;
        this.seconds = seconds;
    }

    public totalTime() {
        if (this.quarter <= 4) {
            return (
                (this.quarter - 1) * 12 +
                (12 - (this.minutes + this.seconds / 60))
            );
        } else {
            return (
                48 +
                Math.max(this.quarter - 5, 0) * 5 +
                (5 - (this.minutes + this.seconds / 60))
            );
        }
    }

    public minutesBetween(other: GameTime): number {
        let totalSelf: number = this.totalTime();
        let totalOther: number = other.totalTime();

        return Math.abs(totalOther - totalSelf);
    }

    public lte(other: GameTime) {
        let totalSelf: number = this.totalTime();
        let totalOther: number = other.totalTime();

        return totalSelf <= totalOther;
    }
}

export { GameTime };
