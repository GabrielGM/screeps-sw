var Utils = require('utils')

var spawnService = {

    execute: function(){
        _.forEach(Game.spawns, spawn => {
            if(spawn.spawning){ return; }

            let sources = spawn.room.find<Source>(FIND_SOURCES);
            let targetDistances: TargetDistance[] = [];
            
            _.forEach(sources, (source, i) => {
                let distance = spawn.pos.getRangeTo(source.pos);
                targetDistances[i] = new TargetDistance(source, distance);
            });

            let sortedDistances = _.sortBy(targetDistances, ['distance']);
            _.forEach(sortedDistances, targetDistance => {
                let workerOnTarget = _.filter(Game.creeps, 
                    creep => creep.memory.targetId == targetDistance.target.id).length;
                let maxWorkerCount = Utils.getWorkerCountForTarget(spawn.pos, targetDistance.target.pos);

                if(workerOnTarget < maxWorkerCount){
                    if(spawnService.trySpawnHarvester(spawn, targetDistance.target.id)){
                        return false;   // A spawner can only spawn 1 at a time!
                    }
                }
            });
        });
    },

    trySpawnHarvester: function(spawn: StructureSpawn, targetId: string): boolean{
        var bodyParts: string[];

        if(spawn.energyCapacity >= HARVESTER_COST_BIG){
            if(spawn.energy >= HARVESTER_COST_BIG){
                bodyParts = HARVESTER_BODY_BIG;
            }
        } else
        if(spawn.energyCapacity >= HARVESTER_COST_MEDIUM){
            if(spawn.energy >= HARVESTER_COST_MEDIUM){
                bodyParts = HARVESTER_BODY_MEDIUM;
            }
        } else
        if(spawn.energyCapacity >= HARVESTER_COST_SMALL){
            if(spawn.energy >= HARVESTER_COST_SMALL){
                bodyParts = HARVESTER_BODY_SMALL;
            }
        } else{
            console.log("Spawner will never be able to produce any harvester. SpawnName=" + spawn.name)
        }        

        if(!!bodyParts){
            var fullName = 'Harv' + Game.time.toString();
            spawn.spawnCreep(bodyParts, fullName)
            var creep = Game.creeps[fullName];

            if(!!creep){
                creep.memory.role = HARVESTER;
                creep.memory.targetId = targetId;
                creep.memory.homeId = spawn.id;

                return true;
            }
        }

        return false;
    }
};

class TargetDistance {
    target: Source | Mineral;
    distance: number;

    constructor(target: Source | Mineral, distance: number){
        this.target = target;
        this.distance = distance;
    }
}

const HARVESTER = 'Harvester';

const HARVESTER_BODY_SMALL = [WORK, WORK, 
                            CARRY, 
                            MOVE];
const HARVESTER_COST_SMALL = 300;

const HARVESTER_BODY_MEDIUM = [WORK, WORK, WORK, WORK, 
                             CARRY, CARRY, CARRY, 
                             MOVE, MOVE, MOVE];
const HARVESTER_COST_MEDIUM = 700;

const HARVESTER_BODY_BIG = [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, 
                          CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, 
                          MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
const HARVESTER_COST_BIG = 1400;

module.exports = spawnService;