class Runner extends Phaser.State {
    init(seed, level) {
        // Set passed-in state variables
        this.mapSeed = [seed];
        this.level = level;
        console.log('Seed: ' + this.mapSeed);
        console.log('Level: ' + this.level);
    }
    create() {
        // Reset world scale
        this.game.world.scale.set(1);
        // Load level data from JSON
        this.levelData = this.game.cache.getJSON('level_data')[this.level];
        // Create mapData and other variables
        this.WALLTHICKNESS = 100;
        this.colors = ['cyan', 'green', 'red', 'yellow'];
        this.mapWidth = 5; // Must be odd
        this.objectiveCount = this.levelData.objectiveNum;
        this.objectiveKilled = false;
        this.mapData = this.generateMap(this.mapSeed);
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
        // Add key event callbacks
        this.keys.one.onDown.add(this.changePlayerColor, {that: this, color: 'cyan'})
        this.keys.two.onDown.add(this.changePlayerColor, {that: this, color: 'green'})
        this.keys.three.onDown.add(this.changePlayerColor, {that: this, color: 'red'})
        this.keys.four.onDown.add(this.changePlayerColor, {that: this, color: 'yellow'})
        // Create walls and hint squares group
        this.walls = this.game.add.group();
        this.walls.enableBody = true;
        this.hintSquares = this.game.add.group();
        // Randomise starting room index and load room
        this.roomIndex = this.randomIndex();
        this.loadRoom();
        // Create wall emitter
        this.wallEmitter = this.game.add.emitter(0, 0, 10);
        this.wallEmitter.makeParticles(this.colorWallParticles(this.room.color));
        this.wallEmitter.gravity = 0;
        this.wallEmitter.setAlpha(0.4, 0.6);
        // Create player object and set variables
        this.player = {
            sprite: this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, this.colorWallParticles(this.room.color)),
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
            sprite: this.game.add.sprite(this.game.world.width / 2, this.game.world.height / 2, 'particle_black_square'),
            index: this.randomIndex()
        }
        while (this.roomIndex === this.objective.index) {
            this.objective.index = this.randomIndex();
        }
        this.game.physics.arcade.enable(this.objective.sprite);
        this.objective.sprite.anchor.setTo(0.5, 0.5);
        this.objective.sprite.visible = false;
        // Create objective text
        this.objectiveText = this.game.add.text(this.game.world.width - 85, this.game.world.height - 78, this.roomIndexToXY(this.objective.index));
        this.objectiveText.fontSize = 50;
        // Create player color buttons
        var playerCyanButton = this.game.add.button(20, this.game.world.height - 90, 'HUD_indicator_cyan', this.changePlayerColor, {that: this, color: 'cyan'});
        var playerGreenButton = this.game.add.button(120, this.game.world.height - 90, 'HUD_indicator_green', this.changePlayerColor, {that: this, color: 'green'});
        var playerRedButton = this.game.add.button(220, this.game.world.height - 90, 'HUD_indicator_red', this.changePlayerColor, {that: this, color: 'red'});
        var playerYellowButton = this.game.add.button(320, this.game.world.height - 90, 'HUD_indicator_yellow', this.changePlayerColor, {that: this, color: 'yellow'});
        playerCyanButton.alpha = 0.6;
        playerGreenButton.alpha = 0.6;
        playerRedButton.alpha = 0.6;
        playerYellowButton.alpha = 0.6;
    }
    update() {
        // Check if all objectives collected then start win sequence
        if (this.objectiveCount <= 0) {
            this.startWin();
        }
        // Check for wall collision
        var hitWall = this.game.physics.arcade.collide(this.player.sprite, this.walls);
        if (hitWall) {
            this.wallParticles(this.player.sprite);
        }
        // Check for objective collision
        if (this.objective.sprite.visible === true && !this.objectiveKilled) {
            var hitObjective = this.game.physics.arcade.overlap(this.player.sprite, this.objective.sprite, this.killObjective, null, this);
        }
        // Reduce player velocity
        if (this.player.sprite.body.velocity.x > 0) {
            this.player.sprite.body.velocity.x -= 5;
        } else if (this.player.sprite.body.velocity.x < 0) {
            this.player.sprite.body.velocity.x += 5;
        }
        if (this.player.sprite.body.velocity.y > 0) {
            this.player.sprite.body.velocity.y -= 5;
        } else if (this.player.sprite.body.velocity.y < 0) {
            this.player.sprite.body.velocity.y += 5;
        }
        // Detect input then increase player velocity
        if (this.keys.right.isDown || this.keys.d.isDown) {
            this.player.sprite.body.velocity.x += 15;
        } else if (this.keys.left.isDown || this.keys.a.isDown) {
            this.player.sprite.body.velocity.x -= 15;
        }
        if (this.keys.up.isDown || this.keys.w.isDown) {
            this.player.sprite.body.velocity.y -= 15;
        } else if (this.keys.down.isDown || this.keys.s.isDown) {
            this.player.sprite.body.velocity.y += 15;
        }
    }
    startMenu() {
        // Start menu state
        this.game.state.start('Menu');
    }
    startWin() {
        // Start win sequence
        var winText = this.game.add.text(this.game.world.width / 2, this.game.world.height / 2, 'You win!');
        winText.anchor.setTo(0.5, 0.5);
        winText.fontSize = 100;
        setTimeout(this.startMenu.bind(this), 3000);
    }
    randomIndex() {
        // Return random index in mapData
        this.game.rnd.sow([Math.random()]);
        return this.game.rnd.integerInRange(0, this.mapData.length - 1)
    }
    changePlayerColor() {
        // Changes player texture and attribute to color
        switch (this.color) {
            case 'cyan':
                this.that.player.sprite.loadTexture('particle_cyan_square');
                this.that.player.color = 'cyan';
                break;
            case 'green':
                this.that.player.sprite.loadTexture('particle_green_square');
                this.that.player.color = 'green';
                break;
            case 'red':
                this.that.player.sprite.loadTexture('particle_red_square');
                this.that.player.color = 'red';
                break;
            case 'yellow':
                this.that.player.sprite.loadTexture('particle_yellow_square');
                this.that.player.color = 'yellow';
                break;
        }
    }
    colorHorizontalWall(color) {
        // Return image key for horizontal wall of color
        if (color === 'cyan') {
            return 'wall_cyan_horizontal';
        } else if (color === 'green') {
            return 'wall_green_horizontal';
        } else if (color === 'red') {
            return 'wall_red_horizontal';
        } else if (color === 'yellow') {
            return 'wall_yellow_horizontal';
        }
    }
    colorVerticalWall(color) {
        // Return image key for vertical wall of color
        if (color === 'cyan') {
            return 'wall_cyan_vertical';
        } else if (color === 'green') {
            return 'wall_green_vertical';
        } else if (color === 'red') {
            return 'wall_red_vertical';
        } else if (color === 'yellow') {
            return 'wall_yellow_vertical';
        }
    }
    colorSquareWall(color) {
        // Return image key for square wall of color
        if (color === 'cyan') {
            return 'wall_cyan_square';
        } else if (color === 'green') {
            return 'wall_green_square';
        } else if (color === 'red') {
            return 'wall_red_square';
        } else if (color === 'yellow') {
            return 'wall_yellow_square';
        }
    }
    colorWallParticles(color) {
        // Return image key for wall particles of color
        if (color === 'cyan') {
            return 'particle_cyan_square';
        } else if (color === 'green') {
            return 'particle_green_square';
        } else if (color === 'red') {
            return 'particle_red_square';
        } else if (color === 'yellow') {
            return 'particle_yellow_square';
        }
    }
    wallParticles(player) {
        // Emit wall particles at player location
        this.wallEmitter.x = player.body.x;
        this.wallEmitter.y = player.body.y;
        this.wallEmitter.start(true, 500, null, 10);
    }
    killObjective() {
        // Kill objective and decrement objectiveCount
        this.objective.sprite.kill();
        this.objectiveCount--;
        if (this.objectiveCount > 0) {
            this.objectiveKilled = true
            this.objective.index = this.randomIndex();
            while (this.roomIndex === this.objective.index) {
                this.objective.index = this.randomIndex();
            }
            this.objectiveText.text = this.roomIndexToXY(this.objective.index);
        }
    }
    getPossibleHints(roomIndex, direction) {
        // Return possible room indexes for hint squares based on direction
        var result = [];
        switch (direction) {
            case 'right':
                for (var i = roomIndex + 1; !(i % this.mapWidth === 0); i++) {
                    result.push(i);
                }
                break;
            case 'left':
                for (var i = roomIndex - 1; (!(i % this.mapWidth === this.mapWidth - 1) && i >= 0); i -= 1) {
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
            if (direction === 'left' || direction === 'right') {
                hintDistance = Math.abs(hintIndex - roomIndex);
            } else if (direction === 'up' || direction === 'down') {
                hintDistance = Math.abs(hintIndex - roomIndex) / this.mapWidth;
            }
            for (var i = 0; i < hintDistance; i++) {
                var hintSquare = this.hintSquares.create(hintX, hintY, this.colorWallParticles(this.mapData[hintIndex].color));
                hintSquare.alpha = 0.4;
                if (direction === 'left' || direction === 'right') {
                    hintY += 48;
                } else if (direction === 'up' || direction === 'down') {
                    hintX += 48;
                }
            }
        }

    }
    loadRoom() {
        // Load walls and hint squares for current room
        var wallDirections = [];
        this.room = this.mapData[this.roomIndex];
        for (var i = 0; i < this.room.walls.length; i++) {
            var wall = this.walls.create(this.room.walls[i][0], this.room.walls[i][1], this.room.walls[i][2]);
            wall.body.immovable = true;
            if (this.room.walls[i][3]) {
                wallDirections.push(this.room.walls[i][3]);
            }
        }
        if (!wallDirections.includes('up')) {
            this.createHintSquares(this.roomIndex, this.game.world.width / 3 + 110, 132, 'up');
        }
        if (!wallDirections.includes('right')) {
            this.createHintSquares(this.roomIndex, this.game.world.width - this.WALLTHICKNESS - 64, 207, 'right');
        }
        if (!wallDirections.includes('down')) {
            this.createHintSquares(this.roomIndex, this.game.world.width / 3 + 110, this.game.world.height - this.WALLTHICKNESS - 64, 'down');
        }
        if (!wallDirections.includes('left')) {
            this.createHintSquares(this.roomIndex, 132, 207, 'left');
        }
    }
    roomChange() {
        // Change roomIndex based on player color, kill old room and then load new room
        var currentRoom = this.roomIndex;
        var newRoom = this.roomIndex;
        if (this.player.sprite.body.x < 0) {
            newRoom--;
            this.player.sprite.x += this.game.world.width;
        } else if (this.player.sprite.body.x > this.game.world.width) {
            newRoom++;
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
            while (this.roomIndex === currentRoom || this.roomIndex === newRoom || this.roomIndex === this.objective.index) {
                this.roomIndex = this.randomIndex();
            }
        } else {
            this.roomIndex = newRoom;
        }
        this.walls.forEach(function(child) {child.kill();});
        this.hintSquares.forEach(function(child) {child.kill();});
        this.objectiveKilled = false;
        this.objective.sprite.revive();
        this.objective.sprite.visible = false;
        this.loadRoom();
        this.wallEmitter.forEach(function(child) {child.loadTexture(this.colorWallParticles(this.room.color));}, this);
        if (this.objective.index === this.roomIndex && this.objective.sprite.alive)
            this.objective.sprite.visible = true;
    }
    roomIndexToXY(roomIndex) {
        // Return XY coordinates for given room index as an array
        return [roomIndex % this.mapWidth + 1, Phaser.Math.floorTo(roomIndex / this.mapWidth) + 1];
    }
    generateMap(seed) {
        // Return map data array for given seed
        var topWall;
        var rightWall;
        var bottomWall;
        var leftWall;
        var randomisedWall;
        var mapData = [];
        var roomWalls;
        var roomColor;
        this.game.rnd.sow(seed);
        for (var roomIndex = 0; roomIndex < this.mapWidth ** 2; roomIndex++) {
            roomWalls = [];
            roomColor = this.game.rnd.pick(this.colors);
            topWall = false;
            rightWall = false;
            bottomWall = false;
            leftWall = false;
            randomisedWall = false;
            if (roomIndex === 0) {
                // Top-left corner
                topWall = true;
                leftWall = true;
            } else if (roomIndex === this.mapWidth - 1) {
                // Top-right corner
                topWall = true;
                rightWall = true;
            } else if (roomIndex === this.mapWidth * (this.mapWidth - 1)) {
                // Bottom-left corner
                bottomWall = true;
                leftWall = true;
            } else if (roomIndex === this.mapWidth ** 2 - 1) {
                // Bottom-right corner
                bottomWall = true;
                rightWall = true;
            } else if (roomIndex < this.mapWidth) {
                // Top border
                topWall = true;
            } else if (roomIndex % this.mapWidth === this.mapWidth - 1) {
                // Right border
                rightWall = true;
            } else if (roomIndex > this.mapWidth * (this.mapWidth - 1) - 1) {
                // Bottom border
                bottomWall = true;
            } else if (roomIndex % this.mapWidth === 0) {
                // Left border
                leftWall = true;
            }
            if (leftWall) {
                roomWalls.push([0, 0, this.colorVerticalWall(roomColor), 'left']);
            } else {
                // Match left room's right wall
                if (roomIndex % this.mapWidth !== 0) {
                    for (let i = 0; i < mapData[roomIndex - 1].walls.length; i++) {
                        if (mapData[roomIndex - 1].walls[i].includes('right')) {
                            roomWalls.push([0, 0, this.colorVerticalWall(roomColor), 'left']);
                            break;                 
                        }
                    }
                }
            }
            if (topWall) {
                roomWalls.push([0, 0, this.colorHorizontalWall(roomColor), 'up']);
            } else {
                // Match up room's bottom wall
                if (roomIndex >= this.mapWidth) {
                    for (let i = 0; i < mapData[roomIndex - this.mapWidth].walls.length; i++) {
                        if (mapData[roomIndex - this.mapWidth].walls[i].includes('down')) {
                            roomWalls.push([0, 0, this.colorHorizontalWall(roomColor), 'up']);
                            break;         
                        }
                    }
                }
            }
            if (rightWall) {
                roomWalls.push([this.game.world.width - this.WALLTHICKNESS, 0, this.colorVerticalWall(roomColor), 'right']);
            } else if (roomIndex % 2 === 0) {
                // Pick randomly between wall/no wall
                if (roomIndex % this.mapWidth !== this.mapWidth - 1) {
                    if (this.game.rnd.frac() > 0.5) {
                        randomisedWall = true;
                        roomWalls.push([this.game.world.width - this.WALLTHICKNESS, 0, this.colorVerticalWall(roomColor), 'right']);
                    }
                }
            }
            if (bottomWall) {
                roomWalls.push([0, this.game.world.height - this.WALLTHICKNESS, this.colorHorizontalWall(roomColor), 'down']);
            } else if (roomIndex % 2 === 0) {
                // Pick randomly between wall/no wall
                if (roomIndex < this.mapWidth * (this.mapWidth - 1)) {
                    if (!randomisedWall) {
                        randomisedWall = true;
                        roomWalls.push([0, this.game.world.height - this.WALLTHICKNESS, this.colorHorizontalWall(roomColor), 'down']);
                    }
                }
            }
            if (roomWalls > 3 && roomIndex === this.mapWidth ** 2 - 1) {
                // Fix bottom-right corner closed in room
                if (this.game.rnd.frac() > 0.5) {
                    // Remove left walls
                    roomWalls.splice(0, 1);
                    for (let i = 0; i < mapData[roomIndex - 1].walls.length; i++) {
                        if (mapData[roomIndex - 1].walls[i].includes('right')) {
                            mapData[roomIndex - 1].walls.splice(i, 1);
                            break;
                        }
                    }
                } else {
                    // Remove right walls
                    roomWalls.splice(1, 1);
                    for (let i = 0; i < mapData[roomIndex - this.mapWidth].walls.length; i++) {
                        if (mapData[roomIndex - this.mapWidth].walls[i].includes('down')) {
                            mapData[roomIndex - this.mapWidth].walls.splice(i, 1);
                            break;
                        }
                    }
                }
            } else if (roomWalls.length > 3 && roomIndex % this.mapWidth === this.mapWidth - 1) {
                // Fix right border closed in room
                roomWalls.splice(3, 1);
            } else if (roomWalls.length > 3 && roomIndex > this.mapWidth * (this.mapWidth - 1) - 1) {
                // Fix bottom border closed in room
                roomWalls.splice(2, 1);
            } else if (roomWalls.length > 3) {
                // Fix closed in room
                if (this.game.rnd.frac() > 0.5) {
                    // Remove right wall
                    roomWalls.splice(2, 1);
                } else {
                    // Remove bottom wall
                    roomWalls.splice(3, 1);
                }
            }
            // Add square walls in all corners
            roomWalls.push([0, 0, this.colorSquareWall(roomColor)]);
            roomWalls.push([this.game.world.width - this.WALLTHICKNESS, 0, this.colorSquareWall(roomColor)]);
            roomWalls.push([this.game.world.width - this.WALLTHICKNESS, this.game.world.height - this.WALLTHICKNESS, this.colorSquareWall(roomColor)]);
            roomWalls.push([0, this.game.world.height - this.WALLTHICKNESS, this.colorSquareWall(roomColor)]);
            mapData.push({color: roomColor, walls: roomWalls});
        }
        return mapData;
    }
}