var Harvester = require('harvester');
var SpawnService = require('spawnService');
var PriorityController = require('priorityController');

var gameManager = {
    /**
     * Initialize the game manager
     */
    initialize(){
        PriorityController.initialize();
    },
    
    /**
     * Run the game. Use inside main loop.
     */
    run(){
        console.log("=====================================================")
        console.log("Starting execution. GameTick=" + Game.time)

        SpawnService.execute();

    }
}

module.exports = gameManager;