class Load extends Phaser.State {
    preload() {
        // Display loading bar
        var loadingBar = this.game.add.sprite(this.game.world.width / 2, this.game.world.height / 2, 'loading_bar');
        loadingBar.anchor.setTo(0.5, 0.5);
        this.game.load.setPreloadSprite(loadingBar);
        // Load images
        this.game.load.path = 'src/images/';
        this.game.load.image('button_runner', 'runner_button.png');
        this.game.load.image('button_mapper', 'mapper_button.png');
        this.game.load.image('HUD_indicator_cyan', 'HUD_indicator_cyan.png');
        this.game.load.image('HUD_indicator_green', 'HUD_indicator_green.png');
        this.game.load.image('HUD_indicator_red', 'HUD_indicator_red.png');
        this.game.load.image('HUD_indicator_yellow', 'HUD_indicator_yellow.png');
        this.game.load.image('particle_black_square', 'small_square_black.png');
        this.game.load.image('wall_cyan_horizontal', 'NEW_rect_cyan_hori.png');
        this.game.load.image('wall_cyan_vertical', 'NEW_rect_cyan_vert.png');
        this.game.load.image('wall_cyan_square', 'square_cyan.png');
        this.game.load.image('particle_cyan_square', 'small_square_cyan.png');
        this.game.load.image('wall_green_horizontal', 'NEW_rect_green_hori.png');
        this.game.load.image('wall_green_vertical', 'NEW_rect_green_vert.png');
        this.game.load.image('wall_green_square', 'square_green.png');
        this.game.load.image('particle_green_square', 'small_square_green.png');
        this.game.load.image('wall_red_horizontal', 'NEW_rect_red_hori.png');
        this.game.load.image('wall_red_vertical', 'NEW_rect_red_vert.png');
        this.game.load.image('wall_red_square', 'square_red.png');
        this.game.load.image('particle_red_square', 'small_square_red.png');
        this.game.load.image('wall_yellow_horizontal', 'NEW_rect_yellow_hori.png');
        this.game.load.image('wall_yellow_vertical', 'NEW_rect_yellow_vert.png');
        this.game.load.image('wall_yellow_square', 'square_yellow.png');
        this.game.load.image('particle_yellow_square', 'small_square_yellow.png');
    }
    create () {
        // Start menu state
        this.game.state.start('Menu');
    }
}