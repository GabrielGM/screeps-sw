var utils = {

    /**
     * Get the amount of worker that can be on the same target.
     * @param from Spawn position to deliver resource
     * @param to Mining position.
     * @param weight Multiplier between 0 and 1. Can reduce the amount returned for bigger harvester
     */
    getWorkerCountForTarget(from: RoomPosition, to: RoomPosition, weight: number = 1): number {
        let workerCount: number = 0;
        let openFields: number = 0;

        for(let i=-1; i<2; i++){
            for(let j=-1; j<2; j++){
                if(i===0 && j===0) { continue; }    // Target position not considered!

                let terrain = Game.map.getTerrainAt(to.x + i, to.y + j, to.roomName);
                if(terrain === 'plain'){
                    openFields++;
                }
                else if(terrain === 'swamp'){
                    openFields += 0.5;
                }
            }
        }

        let weightedDistance = from.getRangeTo(to) * 0.34;
        workerCount = (openFields + weightedDistance) * weight;

        return workerCount;
    }
}

module.exports = utils;