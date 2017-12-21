module utils {

    /**
     * Get the amount of worker that can be on the same target.
     * @param from Spawn position to deliver resource
     * @param to Mining position.
     * @param weight Multiplier between 0 and 1. Can reduce the amount returned for bigger harvester
     */
    export function getWorkerCountForTarget(from: RoomPosition, to: RoomPosition, weight: number = 1): number {
        let workerCount: number = 0;
        let openFields: number = getOpenFieldsAroundPosition(to);

        

        let weightedDistance = from.getRangeTo(to) * 0.34;
        workerCount = (openFields + weightedDistance) * weight;

        return workerCount;
    }

    export function getWorkerCountForRoom(room: Room): number {
        // TODO: Code this!
        // consider :
        // - path to upgrader (swamp, plain, distance)
        // - path to resources (swamp, plain, distance)
        // - open fields around resource

        throw "NotImplementedException";
    }

    export function getOptimalSpawnPosition(room: Room): RoomPosition {
        // TODO: Code this!
        // Triangulate position between resources
        // consider :
        // - path to resources (swamp, plain, distance)
        // - Weight in resource type?

        throw "NotImplementedException";
    }

    export function getOpenFieldsAround(position: RoomPosition): number {
        return getOpenFieldsAroundPosition(position);
    }
}

function getOpenFieldsAroundPosition(position: RoomPosition): number {
    let openFields: number = 0;
    for(let i=-1; i<2; i++){
        for(let j=-1; j<2; j++){
            if(i===0 && j===0) { continue; }    // Target position not considered!
            let terrain = Game.map.getTerrainAt(position.x + i, position.y + j, position.roomName);
            if(terrain === 'plain'){
                openFields++;
            }
            else if(terrain === 'swamp'){
                openFields += 0.5;
            }
        }
    }

    return openFields;
}

module.exports = utils;