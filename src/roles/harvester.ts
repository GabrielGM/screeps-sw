var harvester = {
    doWork(creep: Creep) {
        
        let target: Source | Mineral = Game.getObjectById(creep.memory.targetId);
        let result = creep.harvest(target);
        if(result == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);   // TODO: improve movement using path!
        }
        else if(result == OK){
            // harvest until full
            if((creep.carry.energy + creep.carry.power) >= creep.carryCapacity){
                creep.memory.state = "";
            }
        }
        else{
            console.log("Harvester error. CreepName=" + creep.name + " ErrorCode=" + result)
        }
    }
}

module.exports = harvester;