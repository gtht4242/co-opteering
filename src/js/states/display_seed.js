class DisplaySeed extends Phaser.State {
    init (level) {
        // Set passed-in state variables
        this.level = level;
        console.log('Level: ' + this.level);
    }
    create() {
        // Reset world scale
        this.game.world.scale.set(1);
        // Create instruction text
        this.instructionText = this.game.add.text(this.game.world.width / 2, this.game.world.height / 4, 'Your map code is');
        this.instructionText.anchor.setTo(0.5, 0.5);
        this.instructionText.fontSize = 60;
        // Generate seed and create seed text
        this.mapSeed = Math.floor(Math.random() * 999999);
        this.seedText = this.game.add.text(this.game.world.width / 2, this.game.world.height / 2, this.mapSeed);
        this.seedText.anchor.setTo(0.5, 0.5);
        this.seedText.fontSize = 60;
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
    update() {
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
}