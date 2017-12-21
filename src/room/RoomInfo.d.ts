interface RoomInfo {
    Name: string;
    SourcePositions: RoomPosition[];
    EnergyPositions: RoomPosition[];
    BuildingPositions: RoomPosition[];
    // EnemyBuildingPositions???
    LastUpdate: number;
}