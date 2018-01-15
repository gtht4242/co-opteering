class Boot extends Phaser.State {
    preload() {
        // Load loading bar image
        this.game.load.path = 'src/images/';
        this.game.load.image('loading_bar', 'loading_bar.png');
    }
    create() {
        // Set Phaser constants
        this.game.stage.backgroundColor = "#ffffff";
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        // Initialise core systems
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        // Start load state
        this.game.state.start('Load');
    }
}