class DisplaySeed extends Menu {
    init (level) {
        // Set passed-in state variables
        this.level = level;
        console.log('Level: ' + this.level);
    }
    create() {
        // Reset world scale
        this.game.world.scale.set(1);
        // Load level data from JSON
        this.levelData = this.game.cache.getJSON('level_data')[this.level];
        // Generate seed for map code
        this.mapSeed = Math.floor(Math.random() * 999999);
        // Create level description text
        var descriptionText = this.game.add.text(25, 100, 'Level: ' + this.level.toString() + '\nNo. of objectives: ' + this.levelData.objectiveNum.toString() + '\nTime limit: ' + this.formatTimeLimit(this.levelData.timeLimit) + '\nMap code: ' + this.mapSeed.toString(),
        {fontSize: 50});
        // Create buttons
        var backButton = this.game.add.button(85, 50, 'button_back', this.startLevelSelect, this);
        this.configureButton(backButton);
        var confirmButton = this.game.add.button(this.game.world.width / 2, (this.game.world.height / 4) * 3, 'button_confirm', this.startRunner, this);
        this.configureButton(confirmButton);
        // Create esc and enter keys
        this.keys = this.game.input.keyboard.addKeys({
            'esc': Phaser.KeyCode.ESC,
            'enter': Phaser.KeyCode.ENTER
        });
        this.keys.esc.onDown.add(this.startLevelSelect, this);
        this.keys.enter.onDown.add(this.startRunner, this);
    }
    startRunner() {
        // Start runner state
        this.game.state.start('Runner', true, false, this.mapSeed, this.level);
    }
    formatTimeLimit(timeLimit) {
        // Return time limit as a string in m:ss format
        var minutes = Math.floor(timeLimit / 60);
        var seconds = Math.floor(timeLimit % 60);
        if (timeLimit === 0) {
            return 'None';
        } else if (seconds < 10) {
            return minutes.toString() + ':0' + seconds.toString();
        } else {
            return minutes.toString() + ':' + seconds.toString();
        }
    }
}