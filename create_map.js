function createMap() {
    // Initialise mapData and other variables
    const WALLTHICKNESS = 100;
    mapWidth = 5;
    roomIndex = 0;
    wallCyanHorizontal = 'wall_cyan_horizontal';
    wallCyanVertical = 'wall_cyan_vertical';
    wallCyanSquare = 'wall_cyan_square';
    wallGreenHorizontal = 'wall_green_horizontal';
    wallGreenVertical = 'wall_green_vertical';
    wallGreenSquare = 'wall_green_square';
    wallRedHorizontal = 'wall_red_horizontal';
    wallRedVertical = 'wall_red_vertical';
    wallRedSquare = 'wall_red_square';
    wallYellowHorizontal = 'wall_yellow_horizontal';
    wallYellowVertical = 'wall_yellow_vertical';
    wallYellowSquare = 'wall_yellow_square';
    mapData = [
        {
            colour: 'cyan',
            walls: [
                [0, 0, wallCyanHorizontal],
                [0, game.world.height - WALLTHICKNESS, wallCyanHorizontal],
                [0, 0, wallCyanVertical]
            ]
        },
        {
            colour: 'green',
            walls: [
                [0, 0, wallGreenHorizontal],
                [0, game.world.height - WALLTHICKNESS, wallGreenHorizontal]
            ]
        },
        {
            colour: 'red',
            walls: [
                [0, 0, wallRedHorizontal],
                [0, game.world.height - WALLTHICKNESS, wallRedSquare],
                [game.world.width - WALLTHICKNESS, game.world.height - WALLTHICKNESS, wallRedSquare]
            ]
        },
        {
            colour: 'green',
            walls: [
                [0, 0, wallGreenHorizontal],
                [0, game.world.height - WALLTHICKNESS, wallGreenHorizontal]
            ]
        },
        {
            colour: 'yellow',
            walls: [
                [0, 0, wallYellowHorizontal],
                [0, game.world.height - WALLTHICKNESS, wallYellowHorizontal],
                [game.world.width - WALLTHICKNESS, 0, wallYellowVertical]
            ]
        },
        {
            colour: 'red',
            walls: [
                [0, 0, wallRedHorizontal],
                [0, game.world.height - WALLTHICKNESS, wallRedHorizontal],
                [0, 0, wallRedVertical]
            ]
        },
        {
            colour: 'cyan',
            walls: [
                [0, 0, wallCyanHorizontal],
                [0, game.world.height - WALLTHICKNESS, wallCyanHorizontal]
            ]
        },
        {
            colour: 'yellow',
            walls: [
                [0, game.world.height - WALLTHICKNESS, wallYellowHorizontal],
                [0, 0, wallYellowSquare],
                [game.world.width - WALLTHICKNESS, 0, wallYellowSquare]
            ]
        },
        {
            colour: 'cyan',
            walls: [
                [0, 0, wallCyanHorizontal],
                [0, game.world.height - WALLTHICKNESS, wallCyanHorizontal]
            ]
        },
        {
            colour: 'green',
            walls: [
                [0, 0, wallGreenHorizontal],
                [0, game.world.height - WALLTHICKNESS, wallGreenHorizontal],
                [game.world.width - WALLTHICKNESS, 0, wallGreenVertical]
            ]
        }
    ];
}
