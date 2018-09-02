class Credits extends Menu {
    create() {
        // Create credits text
        var creditsText = this.game.add.text(200, 50, 'Game by Gabriel Toh\nArt by Antonia Tsang',
        {fontSize: 40, wordWrap: true, wordWrapWidth: this.game.world.width - 100});
        // Create buttons
        var backButton = this.game.add.button(85, 50, 'button_back', this.startMenu, this);
        this.configureButton(backButton);
        // Create hotkeys
        var keyEsc = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        keyEsc.onDown.add(this.startMenu, this);
    }
}