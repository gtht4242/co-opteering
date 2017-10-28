var game = new Phaser.Game('99', '99', Phaser.AUTO, "", {preload: preload, create: create, update: update});
function preload() {
    // Set constants
    game.stage.backgroundColor = "#ffffff";
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    // Load images
    game.load.image('player_black', 'images/square_black.png');
}
function create() {
    // Initialise core systems
    game.physics.startSystem(Phaser.Physics.ARCADE);
    cursors = game.input.keyboard.createCursorKeys();
    // Initialise player sprite and variables
    player = game.add.sprite(game.world.centerX, game.world.centerY, 'player_black');
    game.physics.arcade.enable(player);
    player.anchor.x = 0.5;
    player.anchor.y = 0.5;
    player.body.maxVelocity.x = 400;
    player.body.maxVelocity.y = 400;
}
function update() {
    // Slow down player
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