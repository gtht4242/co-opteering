class Mapper extends Phaser.State {
    create() {
        // Initialise mapData and other variables
        this.WALLTHICKNESS = 100;
        this.mapWidth = 5;
        this.objectiveCount = 1;
        this.particleBlackSquare = 'particle_black_square';
        this.wallCyanHorizontal = 'wall_cyan_horizontal';
        this.wallCyanVertical = 'wall_cyan_vertical';
        this.wallCyanSquare = 'wall_cyan_square';
        this.particleCyanSquare = 'particle_cyan_square';
        this.wallGreenHorizontal = 'wall_green_horizontal';
        this.wallGreenVertical = 'wall_green_vertical';
        this.wallGreenSquare = 'wall_green_square';
        this.particleGreenSquare = 'particle_green_square';
        this.wallRedHorizontal = 'wall_red_horizontal';
        this.wallRedVertical = 'wall_red_vertical';
        this.wallRedSquare = 'wall_red_square';
        this.particleRedSquare = 'particle_red_square';
        this.wallYellowHorizontal = 'wall_yellow_horizontal';
        this.wallYellowVertical = 'wall_yellow_vertical';
        this.wallYellowSquare = 'wall_yellow_square';
        this.particleYellowSquare = 'particle_yellow_square';
        this.mapData = [
            {
                color: 'green',
                walls: [
                    [0, 0, this.wallGreenHorizontal, 'up'],
                    [0, this.game.world.height - this.WALLTHICKNESS, this.wallGreenHorizontal, 'down'],
                    [0, 0, this.wallGreenVertical, 'left']
                ]
            },
            {
                color: 'cyan',
                walls: [
                    [0, 0, this.wallCyanHorizontal, 'up'],
                    [this.game.world.width - this.WALLTHICKNESS, 0, this.wallCyanVertical, 'right'],
                    [0, this.game.world.height - this.WALLTHICKNESS, this.wallCyanSquare]
                ]
            },
            {
                color: 'cyan',
                walls: [
                    [0, 0, this.wallCyanHorizontal, 'up'],
                    [this.game.world.width - this.WALLTHICKNESS, 0, this.wallCyanVertical, 'right'],
                    [0, 0, this.wallCyanVertical, 'left']
                ]
            },
            {
                color: 'red',
                walls: [
                    [0, 0, this.wallRedHorizontal, 'up'],
                    [this.game.world.width - this.WALLTHICKNESS, this.game.world.height - this.WALLTHICKNESS, this.wallRedSquare],
                    [0, 0, this.wallRedVertical, 'left']
                ]
            },
            {
                color: 'cyan',
                walls: [
                    [0, 0, this.wallCyanHorizontal, 'up'],
                    [this.game.world.width - this.WALLTHICKNESS, 0, this.wallCyanVertical, 'right'],
                    [0, this.game.world.height - this.WALLTHICKNESS, this.wallCyanSquare]

                ]
            },
            {
                color: 'red',
                walls: [
                    [0, 0, this.wallRedHorizontal, 'up'],
                    [this.game.world.width - this.WALLTHICKNESS, this.game.world.height - this.WALLTHICKNESS, this.wallRedSquare],
                    [0, 0, this.wallRedVertical, 'left']
                ]
            },
            {
                color: 'yellow',
                walls: [
                    [0, 0, this.wallYellowSquare],
                    [this.game.world.width - this.WALLTHICKNESS, 0, this.wallYellowSquare],
                    [this.game.world.width - this.WALLTHICKNESS, this.game.world.height - this.WALLTHICKNESS, this.wallYellowSquare],
                    [0, this.game.world.height - this.WALLTHICKNESS, this.wallYellowSquare]
                ]
            },
            {
                color: 'green',
                walls: [
                    [0, 0, this.wallGreenSquare],
                    [this.game.world.width - this.WALLTHICKNESS, 0, this.wallGreenSquare],
                    [this.game.world.width - this.WALLTHICKNESS, this.game.world.height - this.WALLTHICKNESS, this.wallGreenSquare],
                    [0, this.game.world.height - this.WALLTHICKNESS, this.wallGreenSquare]
                ]
            },
            {
                color: 'yellow',
                walls: [
                    [0, 0, this.wallYellowSquare],
                    [this.game.world.width - this.WALLTHICKNESS, 0, this.wallYellowVertical, 'right'],
                    [0, this.game.world.height - this.WALLTHICKNESS, this.wallYellowSquare]
                ]
            },
            {
                color: 'cyan',
                walls: [
                    [0, 0, this.wallCyanVertical, 'left'],
                    [this.game.world.width - this.WALLTHICKNESS, 0, this.wallCyanVertical, 'right']
                ]
            },
            {
                color: 'yellow',
                walls: [
                    [0, 0, this.wallYellowVertical, 'left'],
                    [this.game.world.width - this.WALLTHICKNESS, 0, this.wallYellowVertical, 'right']
                ]
            },
            {
                color: 'yellow',
                walls: [
                    [this.game.world.width - this.WALLTHICKNESS, 0, this.wallYellowSquare],
                    [0, this.game.world.height - this.WALLTHICKNESS, this.wallYellowHorizontal, 'down'],
                    [0, 0, this.wallYellowVertical, 'left']
                ]
            },
            {
                color: 'cyan',
                walls: [
                    [0, 0, this.wallCyanSquare],
                    [this.game.world.width - this.WALLTHICKNESS, 0, this.wallCyanSquare],
                    [this.game.world.width - this.WALLTHICKNESS, this.game.world.height - this.WALLTHICKNESS, this.wallCyanSquare],
                    [0, this.game.world.height - this.WALLTHICKNESS, this.wallCyanSquare]
                ]
            },
            {
                color: 'green',
                walls: [
                    [0, 0, this.wallGreenSquare],
                    [this.game.world.width - this.WALLTHICKNESS, 0, this.wallGreenSquare],
                    [0, this.game.world.height - this.WALLTHICKNESS, this.wallGreenHorizontal, 'down']
                ]
            },
            {
                color: 'green',
                walls: [
                    [0, 0, this.wallGreenSquare],
                    [this.game.world.width - this.WALLTHICKNESS, 0, this.wallGreenVertical, 'right'],
                    [0, this.game.world.height - this.WALLTHICKNESS, this.wallGreenSquare]
                ]
            },
            {
                color: 'red',
                walls: [
                    [this.game.world.width - this.WALLTHICKNESS, 0, this.wallRedVertical, 'right'],
                    [0, 0, this.wallRedVertical, 'left']
                ]
            },
            {
                color: 'green',
                walls: [
                    [0, 0, this.wallGreenHorizontal, 'up'],
                    [this.game.world.width - this.WALLTHICKNESS, this.game.world.height - this.WALLTHICKNESS, this.wallGreenSquare],
                    [0, 0, this.wallGreenVertical, 'left']
                ]
            },
            {
                color: 'red',
                walls: [
                    [this.game.world.width - this.WALLTHICKNESS, 0, this.wallRedVertical, 'right'],
                    [0, this.game.world.height - this.WALLTHICKNESS, this.wallRedHorizontal, 'down'],
                    [0, 0, this.wallRedSquare]
                ]
            },
            {
                color: 'yellow',
                walls: [
                    [0, 0, this.wallYellowHorizontal, 'up'],
                    [this.game.world.width - this.WALLTHICKNESS, this.game.world.height - this.WALLTHICKNESS, this.wallYellowSquare],
                    [0, 0, this.wallYellowVertical, 'left']
                ]
            },
            {
                color: 'red',
                walls: [
                    [0, 0, this.wallRedSquare],
                    [this.game.world.width - this.WALLTHICKNESS, 0, this.wallRedVertical, 'right'],
                    [0, this.game.world.height - this.WALLTHICKNESS, this.wallRedSquare]
                ]
            },
            {
                color: 'yellow',
                walls: [
                    [this.game.world.width - this.WALLTHICKNESS, 0, this.wallYellowSquare],
                    [0, this.game.world.height - this.WALLTHICKNESS, this.wallYellowHorizontal, 'down'],
                    [0, 0, this.wallYellowVertical, 'left']
                ]
            },
            {
                color: 'cyan',
                walls: [
                    [0, 0, this.wallCyanSquare],
                    [this.game.world.width - this.WALLTHICKNESS, 0, this.wallCyanSquare],
                    [0, this.game.world.height - this.WALLTHICKNESS, this.wallCyanHorizontal, 'down']
                ]
            },
            {
                color: 'green',
                walls: [
                    [0, 0, this.wallGreenHorizontal, 'up'],
                    [this.game.world.width - this.WALLTHICKNESS, 0, this.wallGreenVertical, 'right'],
                    [0, this.game.world.height - this.WALLTHICKNESS, this.wallGreenHorizontal, 'down']
                ]
            },
            {
                color: 'cyan',
                walls: [
                    [this.game.world.width - this.WALLTHICKNESS, 0, this.wallCyanVertical, 'right'],
                    [0, this.game.world.height - this.WALLTHICKNESS, this.wallCyanHorizontal, 'down'],
                    [0, 0, this.wallCyanVertical, 'left']
                ]
            },
            {
                color: 'red',
                walls: [
                    [this.game.world.width - this.WALLTHICKNESS, 0, this.wallRedVertical, 'right'],
                    [0, this.game.world.height - this.WALLTHICKNESS, this.wallRedHorizontal, 'down'],
                    [0, 0, this.wallRedVertical, 'left']
                ]
            }
        ]
        // Add ESC to menu key callback
        var exitKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        exitKey.onDown.add(this.startMenu, this);
        this.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.ESC);
        // Draw map
        this.game.world.scale.set(0.2);
        this.map = this.game.add.group();
        var wallX = 0;
        var wallY = 0;
        for (var roomIndex = 0; roomIndex < Math.pow(this.mapWidth, 2); roomIndex++) {
            var room = this.mapData[roomIndex];
            if (roomIndex % this.mapWidth === 0 && roomIndex !== 0) {
                wallX = 0;
                wallY += 550; // 108, 540
            }
            for (var wallIndex = 0; wallIndex < room.walls.length; wallIndex++) {
                var wall = this.map.create(room.walls[wallIndex][0] + wallX, room.walls[wallIndex][1] + wallY, room.walls[wallIndex][2]);
            }
            wallX += 1250; // 385, 1925
        }
    }
    startMenu() {
        // Start menu state
        this.game.state.start('Menu');
    }
}