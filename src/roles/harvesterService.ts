var harvesterService = {
    doWork(creep: Creep) {
        let target: Source | Mineral = Game.getObjectById(creep.memory.targetId);
        let home: StructureSpawn = Game.getObjectById(creep.memory.homeId);
        
        if(creep.carryCapacity > creep.carry.energy){
            if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);   // improve movement using path!
            }
        }
        else{
            let transfer = creep.transfer(home, RESOURCE_ENERGY);
            if(transfer == ERR_NOT_IN_RANGE){
                creep.moveTo(home);
            }
            else if(transfer == ERR_FULL){
                console.log("Creep cannot transfer resource CreepName=" + creep.name + " StructureName=" + home.name);
            }
        }
    }
}

module.exports = harvesterService;