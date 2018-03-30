class DisplaySeed extends Phaser.State {
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
        var levelText = this.game.add.text(25, 25, 'Level: ' + this.level.toString(), {fontSize: 50});
        var objectiveNumText = this.game.add.text(25, 100, 'No. of objectives: ' + this.levelData.objectiveNum.toString(), {fontSize: 50});
        var timeLimitText = this.game.add.text(25, 175, 'Time limit: ' + this.formatTimeLimit(this.levelData.timeLimit), {fontSize: 50});
        var mapCodeText = this.game.add.text(25, 250, 'Map code: ' + this.mapSeed.toString(), {fontSize: 50});
        // Create confirm button
        var confirmButton = this.game.add.button(this.game.world.width / 2, (this.game.world.height / 4) * 3, 'button_confirm', this.startRunner, this);
        confirmButton.anchor.setTo(0.5, 0.5);
        confirmButton.alpha = 0.5;
        confirmButton.onInputOver.add(this.fullAlpha, {button: confirmButton});
        confirmButton.onInputOut.add(this.halfAlpha, {button: confirmButton});
        // Create esc and enter keys
        this.keys = this.game.input.keyboard.addKeys({
            'esc': Phaser.KeyCode.ESC,
            'enter': Phaser.KeyCode.ENTER
        });
        this.keys.esc.onDown.add(this.startLevelSelect, this);
        this.keys.enter.onDown.add(this.startRunner, this);
    }
    startLevelSelect() {
        // Start level select state
        this.game.state.start('LevelSelect');
    }
    startRunner() {
        // Start runner state
        this.game.state.start('Runner', true, false, this.mapSeed, this.level);
    }
    fullAlpha() {
        // Set alpha of button to 1
        this.button.alpha = 1;
    }
    halfAlpha() {
        // Set alpha of button to 0.5
        this.button.alpha = 0.5;
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