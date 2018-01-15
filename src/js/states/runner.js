class Runner extends Phaser.State {
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
        // Initialise keys
        this.keys = this.game.input.keyboard.addKeys({
            'up': Phaser.KeyCode.UP,
            'down': Phaser.KeyCode.DOWN,
            'left': Phaser.KeyCode.LEFT,
            'right': Phaser.KeyCode.RIGHT,
            'w': Phaser.KeyCode.W,
            's': Phaser.KeyCode.S,
            'a': Phaser.KeyCode.A,
            'd': Phaser.KeyCode.D,
            'one': Phaser.KeyCode.ONE,
            'two': Phaser.KeyCode.TWO,
            'three': Phaser.KeyCode.THREE,
            'four': Phaser.KeyCode.FOUR
        });
        this.game.input.keyboard.addKeyCapture([Phaser.KeyCode.UP, Phaser.KeyCode.DOWN, Phaser.KeyCode.LEFT, Phaser.KeyCode.RIGHT]);
        // Create walls and hint squares group
        this.walls = this.game.add.group();
        this.walls.enableBody = true;
        this.hintSquares = this.game.add.group();
        // Randomise starting room index and load room
        this.roomIndex = this.game.rnd.integerInRange(0, this.mapData.length - 1);
        this.loadRoom();
        // Create wall emitter
        this.wallEmitter = this.game.add.emitter(0, 0, 10);
        this.wallEmitter.makeParticles(this.colorWallParticles(this.room));
        this.wallEmitter.gravity = 0;
        this.wallEmitter.setAlpha(0.4, 0.6);
        // Create player object and set variables
        this.player = {
            sprite: this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, this.colorWallParticles(this.room)),
            color: this.room.color
        };
        this.game.physics.arcade.enable(this.player.sprite);
        this.player.sprite.anchor.setTo(0.5, 0.5);
        this.player.sprite.body.maxVelocity.x = 400;
        this.player.sprite.body.maxVelocity.y = 400;
        this.player.sprite.checkWorldBounds = true;
        this.player.sprite.events.onOutOfBounds.add(this.roomChange, this);
        // Create objective sprite and randomise location
        this.objective = {
            sprite: this.game.add.sprite(this.game.world.width / 2, this.game.world.height / 2, this.particleBlackSquare),
            index: this.game.rnd.integerInRange(0, this.mapData.length - 1)
        }
        while (this.roomIndex === this.objective.index)
            this.objective.index = this.game.rnd.integerInRange(0, this.mapData.length - 1);
        this.game.physics.arcade.enable(this.objective.sprite);
        this.objective.sprite.anchor.setTo(0.5, 0.5);
        this.objective.sprite.visible = false;
        // Create objective text
        var objectiveText = this.game.add.text(this.game.world.width - 85, this.game.world.height - 78,
        this.roomIndexToXY(this.objective.index));
        objectiveText.fontSize = 50;
    }
    update() {
        // Check for all objectives collected
        if (this.objectiveCount <= 0) {
            var winText = this.game.add.text(this.game.world.width / 2, this.game.world.height / 2, 'You win!');
            winText.anchor.setTo(0.5, 0.5);
            winText.fontSize = 100;
            setTimeout(this.startMenu.bind(this), 3000);
        }
        // Check for wall collision
        var hitWall = this.game.physics.arcade.collide(this.player.sprite, this.walls);
        if (hitWall)
            this.wallParticles(this.player.sprite);
        // Check for objective collision
        if (this.objective.sprite.visible === true)
            var hitObjective = this.game.physics.arcade.overlap(this.player.sprite, this.objective.sprite,
            this.killObjective, null, this);
        // Slow down player naturally
        if (this.player.sprite.body.velocity.x > 0)
            this.player.sprite.body.velocity.x -= 5;
        else if (this.player.sprite.body.velocity.x < 0)
            this.player.sprite.body.velocity.x += 5;
        if (this.player.sprite.body.velocity.y > 0)
            this.player.sprite.body.velocity.y -= 5;
        else if (this.player.sprite.body.velocity.y < 0)
            this.player.sprite.body.velocity.y += 5;
        // Move player
        if (this.keys.right.isDown || this.keys.d.isDown)
            this.player.sprite.body.velocity.x += 15;
        else if (this.keys.left.isDown || this.keys.a.isDown)
            this.player.sprite.body.velocity.x -= 15;
        if (this.keys.up.isDown || this.keys.w.isDown)
            this.player.sprite.body.velocity.y -= 15;
        else if (this.keys.down.isDown || this.keys.s.isDown)
            this.player.sprite.body.velocity.y += 15;
        // Change player color
        if (this.keys.one.isDown) {
            this.player.sprite.loadTexture(this.particleCyanSquare);
            this.player.color = 'cyan';
        } else if (this.keys.two.isDown) {
            this.player.sprite.loadTexture(this.particleGreenSquare);
            this.player.color = 'green';
        } else if (this.keys.three.isDown) {
            this.player.sprite.loadTexture(this.particleRedSquare);
            this.player.color = 'red';
        } else if (this.keys.four.isDown) {
            this.player.sprite.loadTexture(this.particleYellowSquare);
            this.player.color = 'yellow';
        }
    }
    startMenu() {
        // Start menu state
        this.game.state.start('Menu');
    }
    colorWallParticles(room) {
        // Return image key for room's wall particles
        if (room.color === 'cyan')
            return this.particleCyanSquare;
        else if (room.color === 'green')
            return this.particleGreenSquare;
        else if (room.color === 'red')
            return this.particleRedSquare;
        else if (room.color === 'yellow')
            return this.particleYellowSquare;
    }
    wallParticles(player) {
        // Emit wall particles at current location
        this.wallEmitter.x = player.body.x;
        this.wallEmitter.y = player.body.y;
        this.wallEmitter.start(true, 500, null, 10);
    }
    killObjective() {
        // Kill objective and decrement objectiveCount once collected
        this.objective.sprite.kill();
        this.objectiveCount -= 1;
    }
    getPossibleHints(roomIndex, direction) {
        // Return possible room indexes for hint squares
        var result = [];
        switch (direction) {
            case 'right':
                for (var i = roomIndex + 1; !(i % this.mapWidth === 0); i++) {
                    result.push(i);
                }
                break;
            case 'left':
                for (var i = roomIndex - 1; (!(i % this.mapWidth === 4) && i >= 0); i -= 1) {
                    result.push(i);
                }
                break;
            case 'down':
                for (var i = roomIndex + this.mapWidth; !(i > this.mapWidth ** 2 - 1); i += this.mapWidth) {
                    result.push(i);
                }
                break;
            case 'up':
                for (var i = roomIndex - this.mapWidth; !(i < 0); i -= this.mapWidth) {
                    result.push(i);
                }
                break;
            default:
                console.log('Invalid direction for hint squares');
        }
        return result;
    }
    createHintSquares(roomIndex, x, y, direction) {
        // Create hint squares for roomIndex at XY position in direction side of screen
        var possibleHints = this.getPossibleHints(roomIndex, direction);
        var hintIndex;
        var hintDistance;
        var hintX = x;
        var hintY = y;
        if (possibleHints.length !== 0) {
            hintIndex = this.game.rnd.pick(possibleHints);
            if (direction === 'left' || direction === 'right')
                hintDistance = Math.abs(hintIndex - roomIndex);
            else if (direction === 'up' || direction === 'down')
                hintDistance = Math.abs(hintIndex - roomIndex) / this.mapWidth;
            for (var i = 0; i < hintDistance; i++) {
                var hintSquare = this.hintSquares.create(hintX, hintY, this.colorWallParticles(this.mapData[hintIndex]));
                hintSquare.alpha = 0.4;
                if (direction === 'left' || direction === 'right')
                    hintY += 48;
                else if (direction === 'up' || direction === 'down')
                    hintX += 48;
            }
        }

    }
    loadRoom() {
        // Load data for room
        var wallDirections = [];
        this.room = this.mapData[this.roomIndex];
        for (var i = 0; i < this.room.walls.length; i++) {
            var wall = this.walls.create(this.room.walls[i][0], this.room.walls[i][1], this.room.walls[i][2]);
            wall.body.immovable = true;
            if (this.room.walls[i][3])
                wallDirections.push(this.room.walls[i][3]);
        }
        if (!wallDirections.includes('up'))
            this.createHintSquares(this.roomIndex, this.game.world.width / 3 + 110, 132, 'up');
        if (!wallDirections.includes('right'))
            this.createHintSquares(this.roomIndex, this.game.world.width - this.WALLTHICKNESS - 64, 207, 'right');
        if (!wallDirections.includes('down'))
            this.createHintSquares(this.roomIndex, this.game.world.width / 3 + 110, this.game.world.height - this.WALLTHICKNESS - 64, 'down');
        if (!wallDirections.includes('left'))
            this.createHintSquares(this.roomIndex, 132, 207, 'left');
    }
    roomChange() {
        // Change roomIndex, kill old room and then load new room
        var currentRoom = this.roomIndex;
        var newRoom = this.roomIndex;
        if (this.player.sprite.body.x < 0) {
            newRoom -= 1;
            this.player.sprite.x += this.game.world.width;
        } else if (this.player.sprite.body.x > this.game.world.width) {
            newRoom += 1;
            this.player.sprite.x -= this.game.world.width;
        } else if (this.player.sprite.body.y < 0) {
            newRoom -= this.mapWidth;
            this.player.sprite.y += this.game.world.height;
        } else if (this.player.sprite.body.y > this.game.world.height) {
            newRoom += this.mapWidth;
            this.player.sprite.y -= this.game.world.height;
        }
        if (this.player.color !== this.mapData[newRoom].color) {
            this.player.sprite.x = this.game.world.width / 2;
            this.player.sprite.y = this.game.world.height / 2;
            this.game.camera.shake(0.03, 250);
            while (this.roomIndex === currentRoom || this.roomIndex === newRoom || this.roomIndex === this.objective.index)
                this.roomIndex = this.game.rnd.integerInRange(0, this.mapData.length - 1);
        }
        else
            this.roomIndex = newRoom;
        this.walls.forEach(function(child) {child.kill();});
        this.hintSquares.forEach(function(child) {child.kill();});
        this.objective.sprite.visible = false;
        this.loadRoom();
        this.wallEmitter.forEach(function(child) {child.loadTexture(this.colorWallParticles(this.room));}, this);
        if (this.objective.index === this.roomIndex && this.objective.sprite.alive)
            this.objective.sprite.visible = true;
    }
    roomIndexToXY(roomIndex) {
        // Return XY coordinates for given room index as an array
        return [roomIndex % this.mapWidth + 1, Phaser.Math.floorTo(roomIndex / this.mapWidth) + 1];
    }
}