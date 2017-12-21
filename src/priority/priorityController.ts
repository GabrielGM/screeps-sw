const ROOM_REFRESH_RATE = 100;   // Refresh room infos every X ticks

var priorityController = {
    initialize(){
        Memory.roomInfos = {};
    },

    update() {
        refreshRoomInfos();
    }
}

function refreshRoomInfos(){
    
    for(let roomName in Game.rooms)
    {
        let roomInfo: RoomInfo = Memory.roomInfos[roomName];
        if(!roomInfo){
            roomInfo = createRoomInfo(roomName);
        }

        if((roomInfo.LastUpdate + ROOM_REFRESH_RATE) < Game.time){
            let room = Game.rooms[roomName];

        }
    }
}

function createRoomInfo(roomName: string): RoomInfo{
    let roomInfo = <RoomInfo>{};
    roomInfo.Name = roomName;
    roomInfo.LastUpdate = -ROOM_REFRESH_RATE -1;    // Make sure it is updated
    roomInfo.SourcePositions = <RoomPosition[]>[];
    roomInfo.EnergyPositions = <RoomPosition[]>[];
    roomInfo.BuildingPositions = <RoomPosition[]>[];

    return roomInfo;
}

module.exports = priorityController;