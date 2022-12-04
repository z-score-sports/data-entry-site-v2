class GameTime {
    // assumption: 12 minute quarters, any number of quarters
    quarter: number;
    minutes: number;
    seconds: number;

    constructor(quarter: number, minutes: number, seconds: number) {
        this.quarter = quarter;
        this.minutes = minutes;
        this.seconds = seconds;
    }

    public minutesBetween(other: GameTime) {
        let totalSelf: number =
            (this.quarter - 1) * 12 + this.minutes + this.seconds / 60;
        let totalOther: number =
            (this.quarter - 1) * 12 + this.minutes + this.seconds / 60;

        return Math.abs(totalOther - totalSelf);
    }
}

export { GameTime };
