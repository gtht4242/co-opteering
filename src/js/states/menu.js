class Menu extends Phaser.State {
    create() {
        // Reset world scale
        this.game.world.scale.set(1);
        // Create title text
        var titleText = this.game.add.text(this.game.world.width / 2, this.game.world.height / 4, 'Co-opteering');
        titleText.anchor.setTo(0.5, 0.5);
        titleText.fontSize = 60;
        // Create mode buttons
        var runnerButton = this.game.add.button(this.game.world.width / 3, (this.game.world.height / 3) * 1.75, 'button_runner', this.startLevelSelect);
        this.configureButton(runnerButton);
        var mapperButton = this.game.add.button((this.game.world.width / 3) * 2, (this.game.world.height / 3) * 1.75, 'button_mapper', this.startEnterSeed);
        this.configureButton(mapperButton);
        var helpButton = this.game.add.button(70, this.game.world.height - 70, 'button_help', this.startHelp);
        this.configureButton(helpButton);
        // Create hotkey shortcuts
        var keyR = this.game.input.keyboard.addKey(Phaser.Keyboard.R);
        keyR.onDown.add(this.startLevelSelect, this);
        this.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.R);
        var keyM = this.game.input.keyboard.addKey(Phaser.Keyboard.M);
        keyM.onDown.add(this.startEnterSeed, this);
        this.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.M);
        var keyH = this.game.input.keyboard.addKey(Phaser.Keyboard.H);
        keyH.onDown.add(this.startHelp, this);
        this.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.H);
    }
    startHelp() {
        // Start help state
        this.game.state.start('Help');
    }
    startLevelSelect() {
        // Start level select state
        this.game.state.start('LevelSelect');
    }
    startDisplaySeed() {
        // Start display seed state
        this.game.state.start('DisplaySeed');
    }
    startRunner() {
        // Start runner state
        this.game.state.start('Runner');
    }
    startEnterSeed() {
        // Start enter seed state
        this.game.state.start('EnterSeed');
    }
    startMapper() {
        // Start mapper state
        this.game.state.start('Mapper');
    }
    fullAlpha(button) {
        // Set alpha of button to 1
        button.alpha = 1;
    }
    halfAlpha(button) {
        // Set alpha of button to 0.5
        button.alpha = 0.5;
    }
    configureButton(button) {
        // Set anchor and alpha callbacks of button
        button.anchor.setTo(0.5, 0.5);
        button.alpha = 0.5;
        button.onInputOver.add(this.fullAlpha, {button: button});
        button.onInputOut.add(this.halfAlpha, {button: button});
    }
}