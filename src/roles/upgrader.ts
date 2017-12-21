var upgrader = {
    doWork(creep: Creep) {
        let target: StructureController = Game.getObjectById(creep.memory.targetId);
        let result = creep.upgradeController(target);
        if(result === ERR_NOT_IN_RANGE){
            
        }
        else if(result === OK){
            // TODO: Do I need to check if it's empty or it empties 
            if(creep.carry.energy === 0){
                creep.memory.state = "";
            }
        }
        else{
            console.log("Upgrader error. CreepName=" + creep.name + " ErrorCode=" + result)
        }
    }
}

module.exports = upgrader;