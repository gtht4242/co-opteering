class Runner extends Menu {
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
        // Initialise globals
        this.WALLTHICKNESS = 100;
        this.colors = ['cyan', 'green', 'red', 'yellow'];
        this.mapWidth = 5; // Must be odd
        this.objectiveCount = this.levelData.objectiveNum;
        this.objectiveKilled = false;
        this.timeLimitLength = this.levelData.timeLimit;
        this.gameEnd = false;
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
        this.keys.up.onDown.add(this.changePlayerOrient, {that: this, orient: 'up'})
        this.keys.down.onDown.add(this.changePlayerOrient, {that: this, orient: 'down'})
        this.keys.left.onDown.add(this.changePlayerOrient, {that: this, orient: 'left'})
        this.keys.right.onDown.add(this.changePlayerOrient, {that: this, orient: 'right'})
        this.keys.w.onDown.add(this.changePlayerOrient, {that: this, orient: 'up'})
        this.keys.s.onDown.add(this.changePlayerOrient, {that: this, orient: 'down'})
        this.keys.a.onDown.add(this.changePlayerOrient, {that: this, orient: 'left'})
        this.keys.d.onDown.add(this.changePlayerOrient, {that: this, orient: 'right'})
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
        // Create player object and animations
        this.player = {
            spriteVert: this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'chameleon_spritesheet', this.colorChameleonVert(this.room.color)),
            spriteHori: this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'chameleon_spritesheet', this.colorChameleonHori(this.room.color)),
            color: this.room.color
        };
        this.initSpritePlayer(this.player.spriteVert, 'vertical');
        this.initSpritePlayer(this.player.spriteHori, 'horizontal');
        this.player.spriteCurrent = this.player.spriteVert;
        this.player.spriteHori.kill();
        // Create objective sprite and randomise location
        this.objective = {
            sprite: this.game.add.sprite(this.game.world.width / 2 - 35, this.game.world.height / 2 - 25, 'objective_fly'),
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
        // Create objective count text
        this.objectiveCountText = this.game.add.text(25, 20, this.formatObjectiveCount(this.objectiveCount));
        this.objectiveCountText.fontSize = 50;
        // Create time limit
        if (this.timeLimitLength > 0) {
            this.timeLimit = this.game.time.create();
            this.timeLimit.add(Phaser.Timer.SECOND * this.timeLimitLength, this.startLose, this);
            this.timeLimitText = this.game.add.text(this.game.world.width - 140, 20, this.formatTimeLimit(this.timeLimit.duration));
            this.timeLimitText.fontSize = 50;
            this.timeLimit.start();
        }
    }
    update() {
        // Update time limit text
        if (this.timeLimitLength > 0 && !this.gameEnd) {
            this.timeLimitText.text = this.formatTimeLimit(this.timeLimit.duration);
        }
        // Check if all objectives collected then start win sequence
        if (this.objectiveCount <= 0) {
            this.startWin();
        }
        // Check for wall collision
        var hitWall = this.game.physics.arcade.collide(this.player.spriteCurrent, this.walls);
        if (hitWall) {
            this.emitWallParticles(this.player.spriteCurrent);
        }
        // Check for wall overlap and reposition the player in bounds
        var overlapWall = this.game.physics.arcade.overlap(this.player.spriteCurrent, this.walls);
        if (overlapWall) {
            if (this.player.spriteCurrent.body.x < this.WALLTHICKNESS) {
                this.player.spriteCurrent.body.x = this.WALLTHICKNESS;
            } else if (this.player.spriteCurrent.body.x > this.game.world.width - this.WALLTHICKNESS - this.player.spriteCurrent.width) {
                this.player.spriteCurrent.body.x = this.game.world.width - this.WALLTHICKNESS - this.player.spriteCurrent.width;
            } else if (this.player.spriteCurrent.body.y < this.WALLTHICKNESS) {
                this.player.spriteCurrent.body.y = this.WALLTHICKNESS;
            } else if (this.player.spriteCurrent.body.y > this.game.world.height - this.WALLTHICKNESS - this.player.spriteCurrent.height) {
                this.player.spriteCurrent.body.y = this.game.world.height - this.WALLTHICKNESS - this.player.spriteCurrent.height;
            }
        }
        // Check for objective overlap and kill it
        if (this.objective.sprite.visible === true && !this.objectiveKilled && !this.gameEnd) {
            var hitObjective = this.game.physics.arcade.overlap(this.player.spriteCurrent, this.objective.sprite, this.killObjective, null, this);
        }
        // Reduce player velocity
        if (this.player.spriteCurrent.body.velocity.x > 0) {
            this.player.spriteCurrent.body.velocity.x -= 5;
        } else if (this.player.spriteCurrent.body.velocity.x < 0) {
            this.player.spriteCurrent.body.velocity.x += 5;
        }
        if (this.player.spriteCurrent.body.velocity.y > 0) {
            this.player.spriteCurrent.body.velocity.y -= 5;
        } else if (this.player.spriteCurrent.body.velocity.y < 0) {
            this.player.spriteCurrent.body.velocity.y += 5;
        }
        // Detect input then increase player velocity
        if (this.keys.right.isDown || this.keys.d.isDown) {
            this.player.spriteCurrent.body.velocity.x += 15;
        } else if (this.keys.left.isDown || this.keys.a.isDown) {
            this.player.spriteCurrent.body.velocity.x -= 15;
        }
        if (this.keys.up.isDown || this.keys.w.isDown) {
            this.player.spriteCurrent.body.velocity.y -= 15;
        } else if (this.keys.down.isDown || this.keys.s.isDown) {
            this.player.spriteCurrent.body.velocity.y += 15;
        }
        // Stop all animations if velocity is zero
        if (this.player.spriteCurrent.body.velocity.x === 0 && this.player.spriteCurrent.body.velocity.y === 0) {
            this.player.spriteCurrent.animations.stop();
        }
        // Play animation if velocity is greater than zero
        if (this.player.spriteCurrent.body.velocity.x !== 0 || this.player.spriteCurrent.body.velocity.y !== 0) {
            this.player.spriteCurrent.animations.play(this.colorAnimationWalk(this.player.color), 10, true);
        }
    }
    startWin() {
        // Start win sequence
        if (!this.gameEnd) {
            this.gameEnd = true;
            var winText = this.game.add.text(this.game.world.width / 2, this.game.world.height / 2, 'You win!');
            winText.anchor.setTo(0.5, 0.5);
            winText.fontSize = 100;
            setTimeout(this.startLevelSelect.bind(this), 3000);
        }
    }
    startLose() {
        // Start lose sequence
        if (!this.gameEnd) {
            this.gameEnd = true;
            var loseText = this.game.add.text(this.game.world.width / 2, this.game.world.height / 2, 'Game over');
            loseText.anchor.setTo(0.5, 0.5);
            loseText.fontSize = 100;
            setTimeout(this.startLevelSelect.bind(this), 3000);
        }
    }
    initSpritePlayer(sprite, type) {
        // Sets variables for player sprite
        if (type === 'vertical') {
            this.game.physics.arcade.enable(sprite);
            sprite.anchor.setTo(0.5, 0.5);
            sprite.height = 125;
            sprite.width = 70;
            sprite.body.maxVelocity.x = 400;
            sprite.body.maxVelocity.y = 400;
            sprite.checkWorldBounds = true;
            sprite.events.onOutOfBounds.add(this.changeRoom, this);
            this.walkCyanAnimation = sprite.animations.add('walk_cyan', ['chameleon_left_cyan_vert', 'chameleon_right_cyan_vert']);
            this.walkGreenAnimation = sprite.animations.add('walk_green', ['chameleon_left_green_vert', 'chameleon_right_green_vert']);
            this.walkRedAnimation = sprite.animations.add('walk_red', ['chameleon_left_red_vert', 'chameleon_right_red_vert']);
            this.walkYellowAnimation = sprite.animations.add('walk_yellow', ['chameleon_left_yellow_vert', 'chameleon_right_yellow_vert']);
        } else if (type === 'horizontal') {
            this.game.physics.arcade.enable(sprite);
            sprite.anchor.setTo(0.5, 0.5);
            sprite.height = 70;
            sprite.width = 125;
            sprite.body.maxVelocity.x = 400;
            sprite.body.maxVelocity.y = 400;
            sprite.checkWorldBounds = true;
            sprite.events.onOutOfBounds.add(this.changeRoom, this);
            this.walkCyanAnimation = sprite.animations.add('walk_cyan', ['chameleon_left_cyan_hori', 'chameleon_right_cyan_hori']);
            this.walkGreenAnimation = sprite.animations.add('walk_green', ['chameleon_left_green_hori', 'chameleon_right_green_hori']);
            this.walkRedAnimation = sprite.animations.add('walk_red', ['chameleon_left_red_hori', 'chameleon_right_red_hori']);
            this.walkYellowAnimation = sprite.animations.add('walk_yellow', ['chameleon_left_yellow_hori', 'chameleon_right_yellow_hori']);
        }
    }
    randomIndex() {
        // Return random index in mapData
        this.game.rnd.sow([Math.random()]);
        return this.game.rnd.integerInRange(0, this.mapData.length - 1)
    }
    formatObjectiveCount(objectiveCount) {
        // Return objective count as a formatted string
        return 'Objectives left: ' + objectiveCount.toString();
    }
    formatTimeLimit(timeLimit) {
        // Return time limit as a string in m:ss format
        var minutes = Math.floor((timeLimit / 1000) / 60);
        var seconds = Math.floor((timeLimit / 1000) % 60);
        if (seconds < 10) {
            return minutes.toString() + ':0' + seconds.toString();
        } else {
            return minutes.toString() + ':' + seconds.toString();
        }
    }
    changePlayerOrient() {
        // Changes player sprite and rotation to orient
        switch (this.orient) {
            case 'up':
                this.that.player.spriteHori.kill();
                this.that.player.spriteVert.revive();
                this.that.player.spriteVert.body.velocity.x = this.that.player.spriteCurrent.body.velocity.x;
                this.that.player.spriteVert.body.velocity.y = this.that.player.spriteCurrent.body.velocity.y;
                this.that.player.spriteVert.x = this.that.player.spriteCurrent.x;
                this.that.player.spriteVert.y = this.that.player.spriteCurrent.y;
                this.that.player.spriteVert.angle = 0;
                this.that.player.spriteCurrent = this.that.player.spriteVert;
                break;
            case 'down':
                this.that.player.spriteHori.kill();
                this.that.player.spriteVert.revive();
                this.that.player.spriteVert.body.velocity.x = this.that.player.spriteCurrent.body.velocity.x;
                this.that.player.spriteVert.body.velocity.y = this.that.player.spriteCurrent.body.velocity.y;
                this.that.player.spriteVert.x = this.that.player.spriteCurrent.x;
                this.that.player.spriteVert.y = this.that.player.spriteCurrent.y;
                this.that.player.spriteVert.angle = 180;
                this.that.player.spriteCurrent = this.that.player.spriteVert;
                break;
            case 'left':
                this.that.player.spriteVert.kill();
                this.that.player.spriteHori.revive();
                this.that.player.spriteHori.body.velocity.x = this.that.player.spriteCurrent.body.velocity.x;
                this.that.player.spriteHori.body.velocity.y = this.that.player.spriteCurrent.body.velocity.y;
                this.that.player.spriteHori.x = this.that.player.spriteCurrent.x;
                this.that.player.spriteHori.y = this.that.player.spriteCurrent.y;
                this.that.player.spriteHori.angle = 180;
                this.that.player.spriteCurrent = this.that.player.spriteHori;
                break;
            case 'right':
                this.that.player.spriteVert.kill();
                this.that.player.spriteHori.revive();
                this.that.player.spriteHori.body.velocity.x = this.that.player.spriteCurrent.body.velocity.x;
                this.that.player.spriteHori.body.velocity.y = this.that.player.spriteCurrent.body.velocity.y;
                this.that.player.spriteHori.x = this.that.player.spriteCurrent.x;
                this.that.player.spriteHori.y = this.that.player.spriteCurrent.y;
                this.that.player.spriteHori.angle = 0;
                this.that.player.spriteCurrent = this.that.player.spriteHori;
                break;
        }
    }
    changePlayerColor() {
        // Changes player texture and attribute to color based on left or right pose
        if (this.that.player.spriteCurrent.frameName.slice(10, 14) === 'left') {
            switch (this.color) {
                case 'cyan':
                    this.that.player.spriteCurrent.loadTexture('chameleon_spritesheet', this.that.colorChameleonLeft(this.color));
                    this.that.player.color = 'cyan';
                    break;
                case 'green':
                    this.that.player.spriteCurrent.loadTexture('chameleon_spritesheet', this.that.colorChameleonLeft(this.color));
                    this.that.player.color = 'green';
                    break;
                case 'red':
                    this.that.player.spriteCurrent.loadTexture('chameleon_spritesheet', this.that.colorChameleonLeft(this.color));
                    this.that.player.color = 'red';
                    break;
                case 'yellow':
                    this.that.player.spriteCurrent.loadTexture('chameleon_spritesheet', this.that.colorChameleonLeft(this.color));
                    this.that.player.color = 'yellow';
                    break;
            }
        } else if (this.that.player.spriteCurrent.frameName.slice(10, 15) === 'right') {
            switch (this.color) {
                case 'cyan':
                    this.that.player.spriteCurrent.loadTexture('chameleon_spritesheet', this.that.colorChameleonRight(this.color));
                    this.that.player.color = 'cyan';
                    break;
                case 'green':
                    this.that.player.spriteCurrent.loadTexture('chameleon_spritesheet', this.that.colorChameleonRight(this.color));
                    this.that.player.color = 'green';
                    break;
                case 'red':
                    this.that.player.spriteCurrent.loadTexture('chameleon_spritesheet', this.that.colorChameleonRight(this.color));
                    this.that.player.color = 'red';
                    break;
                case 'yellow':
                    this.that.player.spriteCurrent.loadTexture('chameleon_spritesheet', this.that.colorChameleonRight(this.color));
                    this.that.player.color = 'yellow';
                    break;
            }
        }
    }
    colorChameleonHori(color) {
        // Return frame_index for chameleon_hori of color
        if (color === 'cyan') {
            return 'chameleon_left_cyan_hori';
        } else if (color === 'green') {
            return 'chameleon_left_green_hori';
        } else if (color === 'red') {
            return 'chameleon_left_red_hori';
        } else if (color === 'yellow') {
            return 'chameleon_left_yellow_hori';
        }
    }
    colorChameleonVert(color) {
        // Return frame_index for chameleon_vert of color
        if (color === 'cyan') {
            return 'chameleon_left_cyan_vert';
        } else if (color === 'green') {
            return 'chameleon_left_green_vert';
        } else if (color === 'red') {
            return 'chameleon_left_red_vert';
        } else if (color === 'yellow') {
            return 'chameleon_left_yellow_vert';
        }
    }
    colorChameleonLeft(color) {
        // Return frame_index for chameleon_left of color
        if (this.player.spriteCurrent === this.player.spriteVert) {
            if (color === 'cyan') {
                return 'chameleon_left_cyan_vert';
            } else if (color === 'green') {
                return 'chameleon_left_green_vert';
            } else if (color === 'red') {
                return 'chameleon_left_red_vert';
            } else if (color === 'yellow') {
                return 'chameleon_left_yellow_vert';
            }
        } else if (this.player.spriteCurrent === this.player.spriteHori) {
            if (color === 'cyan') {
                return 'chameleon_left_cyan_hori';
            } else if (color === 'green') {
                return 'chameleon_left_green_hori';
            } else if (color === 'red') {
                return 'chameleon_left_red_hori';
            } else if (color === 'yellow') {
                return 'chameleon_left_yellow_hori';
            }
        }
    }
    colorChameleonRight(color) {
        // Return frame_index for chameleon_right of color
        if (this.player.spriteCurrent === this.player.spriteVert) {
            if (color === 'cyan') {
                return 'chameleon_right_cyan_vert';
            } else if (color === 'green') {
                return 'chameleon_right_green_vert';
            } else if (color === 'red') {
                return 'chameleon_right_red_vert';
            } else if (color === 'yellow') {
                return 'chameleon_right_yellow_vert';
            }
        } else if (this.player.spriteCurrent === this.player.spriteHori) {
            if (color === 'cyan') {
                return 'chameleon_right_cyan_hori';
            } else if (color === 'green') {
                return 'chameleon_right_green_hori';
            } else if (color === 'red') {
                return 'chameleon_right_red_hori';
            } else if (color === 'yellow') {
                return 'chameleon_right_yellow_hori';
            }
        }
    }
    colorAnimationWalk(color) {
        // Return key for walk animation of color
        if (color === 'cyan') {
            return 'walk_cyan';
        } else if (color === 'green') {
            return 'walk_green';
        } else if (color === 'red') {
            return 'walk_red';
        } else if (color === 'yellow') {
            return 'walk_yellow';
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
    emitWallParticles(player) {
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
        this.objectiveCountText.text = this.formatObjectiveCount(this.objectiveCount);
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
    changeRoom() {
        // Change roomIndex based on player color, kill old room and then load new room
        var currentRoom = this.roomIndex;
        var newRoom = this.roomIndex;
        if (this.player.spriteCurrent.body.x < 0) {
            newRoom--;
            this.player.spriteCurrent.x += this.game.world.width;
        } else if (this.player.spriteCurrent.body.x > this.game.world.width) {
            newRoom++;
            this.player.spriteCurrent.x -= this.game.world.width;
        } else if (this.player.spriteCurrent.body.y < 0) {
            newRoom -= this.mapWidth;
            this.player.spriteCurrent.y += this.game.world.height;
        } else if (this.player.spriteCurrent.body.y > this.game.world.height) {
            newRoom += this.mapWidth;
            this.player.spriteCurrent.y -= this.game.world.height;
        }
        if (this.player.color !== this.mapData[newRoom].color) {
            this.player.spriteCurrent.x = this.game.world.width / 2;
            this.player.spriteCurrent.y = this.game.world.height / 2;
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