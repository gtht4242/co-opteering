const game = new Phaser.Game(1250, 550, Phaser.AUTO, "", {preload: preload, create: create, update: update});
function preload() {
    createMap();
    // Set Phaser constants
    game.stage.backgroundColor = "#ffffff";
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    // Load images
    game.load.path = 'src/images/';
    game.load.image(particleBlackSquare, 'small_square_black.png');
    game.load.image(wallCyanHorizontal, 'rect_cyan_hori.png');
    game.load.image(wallCyanVertical, 'rect_cyan_vert.png');
    game.load.image(wallCyanSquare, 'square_cyan.png');
    game.load.image(particleCyanSquare, 'small_square_cyan.png');
    game.load.image(wallGreenHorizontal, 'rect_green_hori.png');
    game.load.image(wallGreenVertical, 'rect_green_vert.png');
    game.load.image(wallGreenSquare, 'square_green.png');
    game.load.image(particleGreenSquare, 'small_square_green.png');
    game.load.image(wallRedHorizontal, 'rect_red_hori.png');
    game.load.image(wallRedVertical, 'rect_red_vert.png');
    game.load.image(wallRedSquare, 'square_red.png');
    game.load.image(particleRedSquare, 'small_square_red.png');
    game.load.image(wallYellowHorizontal, 'rect_yellow_hori.png');
    game.load.image(wallYellowVertical, 'rect_yellow_vert.png');
    game.load.image(wallYellowSquare, 'square_yellow.png');
    game.load.image(particleYellowSquare, 'small_square_yellow.png');
}
function create() {
    // Initialise core systems
    game.physics.startSystem(Phaser.Physics.ARCADE);
    keys = game.input.keyboard.addKeys({
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
    // Create walls group and load starting room
    walls = game.add.group();
    walls.enableBody = true;
    roomIndex = game.rnd.integerInRange(0, mapData.length - 1);
    loadRoom();
    // Create wall emitter
    wallEmitter = game.add.emitter(0, 0, 10);
    wallEmitter.makeParticles(colorWallParticles());
    wallEmitter.gravity = 0;
    wallEmitter.setAlpha(0.4, 0.6);
    // Create player object and set variables
    player = {
        sprite: game.add.sprite(game.world.centerX, game.world.centerY, colorWallParticles()),
        color: room.color
    };
    game.physics.arcade.enable(player.sprite);
    player.sprite.anchor.setTo(0.5, 0.5);
    player.sprite.body.maxVelocity.x = 400;
    player.sprite.body.maxVelocity.y = 400;
    player.sprite.checkWorldBounds = true;
    player.sprite.events.onOutOfBounds.add(roomChange);
    // Create objective sprite and randomise location
    objective = {
        sprite: game.add.sprite(game.world.width / 2, game.world.height / 2, particleBlackSquare),
        index: game.rnd.integerInRange(0, mapData.length - 1)
    }
    while (roomIndex === objective.index)
        objective.index = game.rnd.integerInRange(0, mapData.length - 1);
    game.physics.arcade.enable(objective.sprite);
    objective.sprite.anchor.setTo(0.5, 0.5);
    objective.sprite.visible = false;
    // Create objective text
    objectiveText = game.add.text(game.world.width - 85, game.world.height - 78, roomIndexToXY(objective.index));
    objectiveText.fontSize = 50;
}
function update() {
    // Check for wall collision
    var hitWall = game.physics.arcade.collide(player.sprite, walls);
    if (hitWall)
        wallParticles(player.sprite);
    // Check for objective collision
    if (objective.sprite.visible === true)
        var hitObjective = game.physics.arcade.overlap(player.sprite, objective.sprite, getObjective);
    // Slow down player naturally
    if (player.sprite.body.velocity.x > 0)
        player.sprite.body.velocity.x -= 5;
    else if (player.sprite.body.velocity.x < 0)
        player.sprite.body.velocity.x += 5;
    if (player.sprite.body.velocity.y > 0)
        player.sprite.body.velocity.y -= 5;
    else if (player.sprite.body.velocity.y < 0)
        player.sprite.body.velocity.y += 5;
    // Move player
    if (keys.right.isDown || keys.d.isDown)
        player.sprite.body.velocity.x += 15;
    else if (keys.left.isDown || keys.a.isDown)
        player.sprite.body.velocity.x -= 15;
    if (keys.up.isDown || keys.w.isDown)
        player.sprite.body.velocity.y -= 15;
    else if (keys.down.isDown || keys.s.isDown)
        player.sprite.body.velocity.y += 15;
    // Change player color
    if (keys.one.isDown) {
        player.sprite.loadTexture(particleCyanSquare);
        player.color = 'cyan';
    } else if (keys.two.isDown) {
        player.sprite.loadTexture(particleGreenSquare);
        player.color = 'green';
    } else if (keys.three.isDown) {
        player.sprite.loadTexture(particleRedSquare);
        player.color = 'red';
    } else if (keys.four.isDown) {
        player.sprite.loadTexture(particleYellowSquare);
        player.color = 'yellow';
    }
}
function colorWallParticles() {
    // Return image key for room's wall particles
    if (room.color === 'cyan')
        return particleCyanSquare;
    else if (room.color === 'green')
        return particleGreenSquare;
    else if (room.color === 'red')
        return particleRedSquare;
    else if (room.color === 'yellow')
        return particleYellowSquare;
}
function wallParticles(player) {
    // Emit wall particles at current location
    wallEmitter.x = player.body.x;
    wallEmitter.y = player.body.y;
    wallEmitter.start(true, 500, null, 10);
}
function getObjective() {
    // Kill objective once collected
    objective.sprite.kill();
}
function loadRoom() {
    // Load data for room
    room = mapData[roomIndex];
    for (var i = 0; i < room.walls.length; i++) {
        var wall = walls.create(room.walls[i][0], room.walls[i][1], room.walls[i][2]);
        wall.body.immovable = true;
    }
}
function roomChange() {
    // Change roomIndex, kill old room and then load new room
    if (player.sprite.body.x < 0) {
        roomIndex -= 1;
        player.sprite.x += game.world.width;
    } else if (player.sprite.body.x > game.world.width) {
        roomIndex += 1;
        player.sprite.x -= game.world.width;
    } else if (player.sprite.body.y < 0) {
        roomIndex -= mapWidth;
        player.sprite.y += game.world.height;
    } else if (player.sprite.body.y > game.world.height) {
        roomIndex += mapWidth;
        player.sprite.y -= game.world.height;
    }
    walls.forEach(function(child) {child.kill();});
    objective.sprite.visible = false;
    loadRoom();
    wallEmitter.forEach(function(child) {child.loadTexture(colorWallParticles());});
    if (objective.index === roomIndex && objective.sprite.alive)
        objective.sprite.visible = true;
}
function roomIndexToXY(index) {
    // Return XY coordinates for given room index as an array
    return [index % mapWidth + 1, Phaser.Math.floorTo(index / mapWidth) + 1];
}