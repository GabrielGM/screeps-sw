var HarvesterService = require('harvesterService');
var SpawnService = require('spawnService');

var gameManager = {
    /**
     * Initialize the game manager
     */
    initialize(){

    },
    
    /**
     * Run the game. Use inside main loop.
     */
    run(){

        SpawnService.execute();
        
        for(var creepName in Game.creeps)
        {
            var creep = Game.creeps[creepName];
            HarvesterService.doWork(creep);
        }
    }
}

module.exports = gameManager;