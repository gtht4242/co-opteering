class Menu extends Phaser.State {
    create() {
        // Create title text
        var titleText = this.game.add.text(this.game.world.width / 2, this.game.world.height / 4, 'Co-opteering');
        titleText.anchor.setTo(0.5, 0.5);
        titleText.fontSize = 60;
        // Create runner and mapper mode buttons
        var runnerButton = this.game.add.button(this.game.world.width / 3, (this.game.world.height / 3) * 2, 'button_runner', this.startRunner);
        var mapperButton = this.game.add.button((this.game.world.width / 3) * 2, (this.game.world.height / 3) * 2, 'button_mapper', this.startMapper);
        runnerButton.anchor.setTo(0.5, 0.5);
        mapperButton.anchor.setTo(0.5, 0.5);
        runnerButton.alpha = 0.5;
        mapperButton.alpha = 0.5;
        runnerButton.onInputOver.add(this.buttonOver, {button: runnerButton});
        mapperButton.onInputOver.add(this.buttonOver, {button: mapperButton});
        runnerButton.onInputOut.add(this.buttonOut, {button: runnerButton});
        mapperButton.onInputOut.add(this.buttonOut, {button: mapperButton});
        // Create hotkey shortcuts
        var keyR = this.game.input.keyboard.addKey(Phaser.Keyboard.R);
        var keyM = this.game.input.keyboard.addKey(Phaser.Keyboard.M);
        keyR.onDown.add(this.startRunner, this);
        keyM.onDown.add(this.startMapper, this);
        this.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.R);
        this.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.M);
    }
    startRunner() {
        this.game.state.start('Runner');
    }
    startMapper() {
        this.game.state.start('Mapper');
    }
    buttonOver(button) {
        button.alpha = 1;
    }
    buttonOut(button) {
        button.alpha = 0.5;
    }
}