function createMap() {
    // Initialise mapData and other variables
    const WALLTHICKNESS = 100;
    mapWidth = 5;
    roomIndex = 0;
    wallCyanHorizontal = 'wall_cyan_horizontal';
    wallCyanVertical = 'wall_cyan_vertical';
    wallCyanSquare = 'wall_cyan_square';
    particleCyanSquare = 'particle_cyan_square';
    wallGreenHorizontal = 'wall_green_horizontal';
    wallGreenVertical = 'wall_green_vertical';
    wallGreenSquare = 'wall_green_square';
    particleGreenSquare = 'particle_green_square';
    wallRedHorizontal = 'wall_red_horizontal';
    wallRedVertical = 'wall_red_vertical';
    wallRedSquare = 'wall_red_square';
    particleRedSquare = 'particle_red_square';
    wallYellowHorizontal = 'wall_yellow_horizontal';
    wallYellowVertical = 'wall_yellow_vertical';
    wallYellowSquare = 'wall_yellow_square';
    particleYellowSquare = 'particle_yellow_square';
    mapData = [
        {
            color: 'green',
            walls: [
                [0, 0, wallGreenHorizontal],
                [0, game.world.height - WALLTHICKNESS, wallGreenHorizontal],
                [0, 0, wallGreenVertical]
            ]
        },
        {
            color: 'cyan',
            walls: [
                [0, 0, wallCyanHorizontal],
                [game.world.width - WALLTHICKNESS, 0, wallCyanVertical],
                [0, game.world.height - WALLTHICKNESS, wallCyanSquare]
            ]
        },
        {
            color: 'cyan',
            walls: [
                [0, 0, wallCyanHorizontal],
                [game.world.width - WALLTHICKNESS, 0, wallCyanVertical],
                [0, 0, wallCyanVertical]
            ]
        },
        {
            color: 'red',
            walls: [
                [0, 0, wallRedHorizontal],
                [game.world.width - WALLTHICKNESS, game.world.height - WALLTHICKNESS, wallRedSquare],
                [0, 0, wallRedVertical]
            ]
        },
        {
            color: 'cyan',
            walls: [
                [0, 0, wallCyanHorizontal],
                [game.world.width - WALLTHICKNESS, 0, wallCyanVertical],
                [0, game.world.height - WALLTHICKNESS, wallCyanSquare]

            ]
        },
        {
            color: 'red',
            walls: [
                [0, 0, wallRedHorizontal],
                [game.world.width - WALLTHICKNESS, game.world.height - WALLTHICKNESS, wallRedSquare],
                [0, 0, wallRedVertical]
            ]
        },
        {
            color: 'yellow',
            walls: [
                [0, 0, wallYellowSquare],
                [game.world.width - WALLTHICKNESS, 0, wallYellowSquare],
                [game.world.width - WALLTHICKNESS, game.world.height - WALLTHICKNESS, wallYellowSquare],
                [0, game.world.height - WALLTHICKNESS, wallYellowSquare]
            ]
        },
        {
            color: 'green',
            walls: [
                [0, 0, wallGreenSquare],
                [game.world.width - WALLTHICKNESS, 0, wallGreenSquare],
                [game.world.width - WALLTHICKNESS, game.world.height - WALLTHICKNESS, wallGreenSquare],
                [0, game.world.height - WALLTHICKNESS, wallGreenSquare]
            ]
        },
        {
            color: 'yellow',
            walls: [
                [0, 0, wallYellowSquare],
                [game.world.width - WALLTHICKNESS, 0, wallYellowVertical],
                [0, game.world.height - WALLTHICKNESS, wallYellowSquare]
            ]
        },
        {
            color: 'cyan',
            walls: [
                [0, 0, wallCyanVertical],
                [game.world.width - WALLTHICKNESS, 0, wallCyanVertical]
            ]
        },
        {
            color: 'yellow',
            walls: [
                [0, 0, wallYellowVertical],
                [game.world.width - WALLTHICKNESS, 0, wallYellowVertical]
            ]
        },
        {
            color: 'yellow',
            walls: [
                [game.world.width - WALLTHICKNESS, 0, wallYellowSquare],
                [0, game.world.height - WALLTHICKNESS, wallYellowHorizontal],
                [0, 0, wallYellowVertical]
            ]
        },
        {
            color: 'cyan',
            walls: [
                [0, 0, wallCyanSquare],
                [game.world.width - WALLTHICKNESS, 0, wallCyanSquare],
                [game.world.width - WALLTHICKNESS, game.world.height - WALLTHICKNESS, wallCyanSquare],
                [0, game.world.height - WALLTHICKNESS, wallCyanSquare]
            ]
        },
        {
            color: 'green',
            walls: [
                [0, 0, wallGreenSquare],
                [game.world.width - WALLTHICKNESS, 0, wallGreenSquare],
                [0, game.world.height - WALLTHICKNESS, wallGreenHorizontal]
            ]
        },
        {
            color: 'green',
            walls: [
                [0, 0, wallGreenSquare],
                [game.world.width - WALLTHICKNESS, 0, wallGreenVertical],
                [0, game.world.height - WALLTHICKNESS, wallGreenSquare]
            ]
        },
        {
            color: 'red',
            walls: [
                [game.world.width - WALLTHICKNESS, 0, wallRedVertical],
                [0, 0, wallRedVertical]
            ]
        },
        {
            color: 'green',
            walls: [
                [0, 0, wallGreenHorizontal],
                [game.world.width - WALLTHICKNESS, game.world.height - WALLTHICKNESS, wallGreenSquare],
                [0, 0, wallGreenVertical]
            ]
        },
        {
            color: 'red',
            walls: [
                [game.world.width - WALLTHICKNESS, 0, wallRedVertical],
                [0, game.world.height - WALLTHICKNESS, wallRedHorizontal],
                [0, 0, wallRedSquare]
            ]
        },
        {
            color: 'yellow',
            walls: [
                [0, 0, wallYellowHorizontal],
                [game.world.width - WALLTHICKNESS, game.world.height - WALLTHICKNESS, wallYellowSquare],
                [0, 0, wallYellowVertical]
            ]
        },
        {
            color: 'red',
            walls: [
                [0, 0, wallRedSquare],
                [game.world.width - WALLTHICKNESS, 0, wallRedVertical],
                [0, game.world.height - WALLTHICKNESS, wallRedSquare]
            ]
        },
        {
            color: 'yellow',
            walls: [
                [game.world.width - WALLTHICKNESS, 0, wallYellowSquare],
                [0, game.world.height - WALLTHICKNESS, wallYellowHorizontal],
                [0, 0, wallYellowVertical]
            ]
        },
        {
            color: 'cyan',
            walls: [
                [0, 0, wallCyanSquare],
                [game.world.width - WALLTHICKNESS, 0, wallCyanSquare],
                [0, game.world.height - WALLTHICKNESS, wallCyanHorizontal]
            ]
        },
        {
            color: 'green',
            walls: [
                [0, 0, wallGreenHorizontal],
                [game.world.width - WALLTHICKNESS, 0, wallGreenVertical],
                [0, game.world.height - WALLTHICKNESS, wallGreenHorizontal]
            ]
        },
        {
            color: 'cyan',
            walls: [
                [game.world.width - WALLTHICKNESS, 0, wallCyanVertical],
                [0, game.world.height - WALLTHICKNESS, wallCyanHorizontal],
                [0, 0, wallCyanVertical]
            ]
        },
        {
            color: 'red',
            walls: [
                [game.world.width - WALLTHICKNESS, 0, wallRedVertical],
                [0, game.world.height - WALLTHICKNESS, wallRedHorizontal],
                [0, 0, wallRedVertical]
            ]
        }
    ]
}