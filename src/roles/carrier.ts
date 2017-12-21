var carrier = {
    doWork(creep: Creep) {
        let target: StructureSpawn = Game.getObjectById(creep.memory.targetId);
        let result = creep.transfer(target, RESOURCE_ENERGY);
        if(result == ERR_NOT_IN_RANGE){
            creep.moveTo(target);
        }
        else if(result == OK){
            creep.memory.state = "";
        }
        else if(result == ERR_FULL){
            console.log("Creep cannot transfer resource CreepName=" + creep.name + " TargetName=" + target.name);
        }
        else{
            console.log("Harvester error. CreepName=" + creep.name + " ErrorCode=" + result)
        }
    }
}

module.exports = carrier;