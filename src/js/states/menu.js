class Menu extends Phaser.State {
    create() {
        // Reset world scale
        this.game.world.scale.set(1);
        // Create title text
        var titleText = this.game.add.text(this.game.world.width / 2, this.game.world.height / 4, 'Co-opteering');
        titleText.anchor.setTo(0.5, 0.5);
        titleText.fontSize = 60;
        // Create runner and mapper mode buttons
        var runnerButton = this.game.add.button(this.game.world.width / 3, (this.game.world.height / 3) * 2, 'button_runner', this.startLevelSelect);
        runnerButton.anchor.setTo(0.5, 0.5);
        runnerButton.alpha = 0.5;
        runnerButton.onInputOver.add(this.fullAlpha, {button: runnerButton});
        runnerButton.onInputOut.add(this.halfAlpha, {button: runnerButton});
        var mapperButton = this.game.add.button((this.game.world.width / 3) * 2, (this.game.world.height / 3) * 2, 'button_mapper', this.startEnterSeed);
        mapperButton.anchor.setTo(0.5, 0.5);
        mapperButton.alpha = 0.5;
        mapperButton.onInputOver.add(this.fullAlpha, {button: mapperButton});
        mapperButton.onInputOut.add(this.halfAlpha, {button: mapperButton});
        // Create hotkey shortcuts
        var keyR = this.game.input.keyboard.addKey(Phaser.Keyboard.R);
        keyR.onDown.add(this.startLevelSelect, this);
        this.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.R);
        var keyM = this.game.input.keyboard.addKey(Phaser.Keyboard.M);
        keyM.onDown.add(this.startEnterSeed, this);
        this.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.M);
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
}