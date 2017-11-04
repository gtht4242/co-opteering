const game = new Phaser.Game('99', '99', Phaser.AUTO, "", {preload: preload, create: create, update: update});
function preload() {
    createMap();
    // Set Phaser constants
    game.stage.backgroundColor = "#ffffff";
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    // Load images
    game.load.image('player_black', 'images/small_square_black.png');
    game.load.image(wallCyanHorizontal, 'images/rect_cyan_hori.png');
    game.load.image(wallCyanVertical, 'images/rect_cyan_vert.png');
    game.load.image(wallCyanSquare, 'images/square_cyan.png');
    game.load.image(particleCyanSquare, 'images/small_square_cyan.png');
    game.load.image(wallGreenHorizontal, 'images/rect_green_hori.png');
    game.load.image(wallGreenVertical, 'images/rect_green_vert.png');
    game.load.image(wallGreenSquare, 'images/square_green.png');
    game.load.image(particleGreenSquare, 'images/small_square_green.png');
    game.load.image(wallRedHorizontal, 'images/rect_red_hori.png');
    game.load.image(wallRedVertical, 'images/rect_red_vert.png');
    game.load.image(wallRedSquare, 'images/square_red.png');
    game.load.image(particleRedSquare, 'images/small_square_red.png');
    game.load.image(wallYellowHorizontal, 'images/rect_yellow_hori.png');
    game.load.image(wallYellowVertical, 'images/rect_yellow_vert.png');
    game.load.image(wallYellowSquare, 'images/square_yellow.png');
    game.load.image(particleYellowSquare, 'images/small_square_yellow.png');
}
function create() {
    // Initialise core systems
    game.physics.startSystem(Phaser.Physics.ARCADE);
    cursors = game.input.keyboard.createCursorKeys();
    // Create walls group and load starting room
    walls = game.add.group();
    walls.enableBody = true;
    loadRoom();
    // Create wall emitter
    wallEmitter = game.add.emitter(0, 0, 10);
    wallEmitter.makeParticles(colorWallParticles());
    wallEmitter.gravity = 0;
    wallEmitter.setAlpha(0.4, 0.6);
    // Create player sprite and variables
    player = game.add.sprite(game.world.centerX, game.world.centerY, 'player_black');
    game.physics.arcade.enable(player);
    player.anchor.x = 0.5;
    player.anchor.y = 0.5;
    player.body.maxVelocity.x = 400;
    player.body.maxVelocity.y = 400;
    player.checkWorldBounds = true;
    player.events.onOutOfBounds.add(roomChange);
}
function update() {
    // Check for wall collision
    var hitWall = game.physics.arcade.collide(player, walls);
    if (hitWall)
        wallParticles(player);
    // Slow down player naturally
    if (player.body.velocity.x > 0)
        player.body.velocity.x -= 5;
    else if (player.body.velocity.x < 0)
        player.body.velocity.x += 5;
    if (player.body.velocity.y > 0)
        player.body.velocity.y -= 5;
    else if (player.body.velocity.y < 0)
        player.body.velocity.y += 5;
    // Move player
    if (cursors.right.isDown)
        player.body.velocity.x += 15;
    else if (cursors.left.isDown)
        player.body.velocity.x -= 15;
    if (cursors.up.isDown)
        player.body.velocity.y -= 15;
    else if (cursors.down.isDown)
        player.body.velocity.y += 15;
}
function colorWallParticles() {
    // Determines key to use for wall particles
    if (room.colour === 'cyan')
        return particleCyanSquare;
    else if (room.colour === 'green')
        return particleGreenSquare;
    else if (room.colour === 'red')
        return particleRedSquare;
    else if (room.colour === 'yellow')
        return particleYellowSquare;
}
function wallParticles(player) {
    // Emit wall particles at current location
    wallEmitter.x = player.body.x;
    wallEmitter.y = player.body.y;
    wallEmitter.start(true, 500, null, 10);
}
function loadRoom() {
    // Loads variables for room
    room = mapData[roomIndex];
    walls.forEach(function(child) {child.kill();});
    for (var i = 0; i < room.walls.length; i++) {
        var wall = walls.create(room.walls[i][0], room.walls[i][1], room.walls[i][2]);
        wall.body.immovable = true;
    }
}
function roomChange() {
    // Change roomIndex then call loadRoom
    if (player.body.x < 0) {
        roomIndex -= 1;
        player.x += game.world.width;
    } else if (player.body.x > game.world.width) {
        roomIndex += 1;
        player.x -= game.world.width;
    } else if (player.body.y < 0) {
        roomIndex -= mapWidth;
        player.y += game.world.height;
    } else if (player.body.y > game.world.height) {
        roomIndex += mapWidth;
        player.y -= game.world.height;
    }
    loadRoom();
    wallEmitter.forEach(function(child) {child.loadTexture(colorWallParticles());});
}