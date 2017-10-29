var game = new Phaser.Game('99', '99', Phaser.AUTO, "", {preload: preload, create: create, update: update});
function preload() {
    // Set constants
    game.stage.backgroundColor = "#ffffff";
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    // Load images
    game.load.image('player_black', 'images/square_black.png');
    game.load.image('wall_cyan', 'images/rect_cyan.png');
}
function create() {
    // Initialise core systems
    game.physics.startSystem(Phaser.Physics.ARCADE);
    cursors = game.input.keyboard.createCursorKeys();
    // Create walls
    walls = game.add.group();
    walls.enableBody = true;
    var upWall = walls.create(0, 0, 'wall_cyan');
    var downWall = walls.create(0, game.world.height - 100, 'wall_cyan');
    upWall.body.immovable = true;
    downWall.body.immovable = true;
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
    wallEmitter.x = player.body.x;
    wallEmitter.y = player.body.y;
    wallEmitter.start(true, 500, null, 10);
}
