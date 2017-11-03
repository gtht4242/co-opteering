const game = new Phaser.Game('99', '99', Phaser.AUTO, "", {preload: preload, create: create, update: update});
function preload() {
    createMap();
    // Set Phaser constants
    game.stage.backgroundColor = "#ffffff";
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    // Load images
    game.load.image('player_black', 'images/square_black.png');
    game.load.image('wall_cyan_horizontal', 'images/rect_cyan_hori.png');
    game.load.image('wall_cyan_vertical', 'images/rect_cyan_vert.png');
    game.load.image('wall_cyan_square', 'images/square_cyan.png');
    game.load.image('wall_green_horizontal', 'images/rect_green_hori.png');
    game.load.image('wall_green_vertical', 'images/rect_green_vert.png');
    game.load.image('wall_green_square', 'images/square_green.png');
    game.load.image('wall_red_horizontal', 'images/rect_red_hori.png');
    game.load.image('wall_red_vertical', 'images/rect_red_vert.png');
    game.load.image('wall_red_square', 'images/square_red.png');
    game.load.image('wall_yellow_horizontal', 'images/rect_yellow_hori.png');
    game.load.image('wall_yellow_vertical', 'images/rect_yellow_vert.png');
    game.load.image('wall_yellow_square', 'images/square_yellow.png');
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
    wallEmitter.makeParticles('player_black');
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
}