type RegionInfo = {
    shotsMade: number;
    shotsAttempted: number;
};

function getBlankRegionInfo(): RegionInfo {
    return {
        shotsMade: 0,
        shotsAttempted: 0,
    };
}

class ShotRegionTracker {
    allRegions: Array<RegionInfo> = [
        getBlankRegionInfo(),
        getBlankRegionInfo(),
        getBlankRegionInfo(),
        getBlankRegionInfo(),
        getBlankRegionInfo(),
        getBlankRegionInfo(),
        getBlankRegionInfo(),
        getBlankRegionInfo(),
        getBlankRegionInfo(),
    ];

    constructor() {}

    addShot(made: boolean, region: number) {
        let index = region - 1;
        this.allRegions[index].shotsAttempted += 1;
        if (made) {
            this.allRegions[index].shotsMade += 1;
        }
    }

    removeShot(made: boolean, region: number) {
        let index = region - 1;
        this.allRegions[index].shotsAttempted -= 1;
        if (made) {
            this.allRegions[index].shotsMade -= 1;
        }
    }

    getRegionShotsMade(region: number): number {
        return this.allRegions[region - 1].shotsMade;
    }

    getRegionShotsAttempted(region: number): number {
        return this.allRegions[region - 1].shotsAttempted;
    }

    getRegionString(region: number) {
        return (
            this.getRegionShotsMade(region) +
            "/" +
            this.getRegionShotsAttempted(region)
        );
    }
}

export { ShotRegionTracker };
