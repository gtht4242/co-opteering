class Help extends Menu {
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
}