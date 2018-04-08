class Help extends Phaser.State {
    create() {
        // Create help text
        var overviewText = this.game.add.text(200, 50, 'A 2-player co-op navigation game.',
        {fontSize: 40, wordWrap: true, wordWrapWidth: this.game.world.width - 100});
        var runnerText = this.game.add.text(50, 150, 'Runner:\nMove - WASD or Arrow Keys\nChange colour - Number Keys or on-screen buttons',
        {fontSize: 40, wordWrap: true, wordWrapWidth: this.game.world.width - 700});
        var mapperText = this.game.add.text(this.game.world.width / 2 + 50, 150, 'Mapper:\nExit to menu - ESC key or on-screen button',
        {fontSize: 40, wordWrap: true, wordWrapWidth: this.game.world.width - 700});
        // Create buttons
        var backButton = this.game.add.button(85, 50, 'button_back', this.startMenu, this);
        this.configureButton(backButton);
        var rulesButton = this.game.add.button(this.game.world.width - 230, this.game.world.height - 100, 'button_rules', this.startHelp2, this);
        this.configureButton(rulesButton);
        // Create hotkeys
        var keyEsc = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        keyEsc.onDown.add(this.startMenu, this);
    }
    startMenu() {
        // Start menu state
        this.game.state.start('Menu');
    }
    startHelp2() {
        // Start help2 state
        this.game.state.start('Help2');
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