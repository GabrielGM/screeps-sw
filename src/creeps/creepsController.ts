var Harvester = require("harvester");
var Carrier = require("carrier");
var Fighter = require("fighter");
var CreepsStates = require("states");

var creepsController = {
    execute() {
        assignNewJob();
        allCreepsDoWork();
        
        // if cpu limit allows it, assign job for next tick
        //assignNewJob();
    }
}

function assignNewJob(){
    
    for(var creepName in Game.creeps)
    {
        var creep = Game.creeps[creepName];
        
        if(!creep.memory.state){
            creep.memory.state = HARVEST;
            // BUG: Set targetId!!
            creep.memory.targetId = /////////////////////////////////////////////////////////////////////////////;
            // TODO: Find something to do!!
        }
    }
}

function allCreepsDoWork(){
    // TODO: Implement priority of work!
    // TODO: We should coordinate creeps by type!

    for(var creepName in Game.creeps)
    {
        var creep = Game.creeps[creepName];

        if(creep.memory.state == HARVEST)
        {
            Harvester.doWork(creep);
        }
        else if (creep.memory.state == TRANSFER){
            Carrier.doWork(creep);
        }
        else if (creep.memory.state == FIGHT){
            Fighter.doWork(creep);
        }
        else{
            console.log("Creep doesn't have a state. CreepName=" + creep.name)
        }
    }
}

module.exports = creepsController;
