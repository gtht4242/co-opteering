class Help2 extends Menu {
    create() {
        // Create help text and hint square images
        var rulesText = this.game.add.text(50, 0, ' '.repeat(14) + "Players may not look at each other's screens.\n" + ' '.repeat(14) + 'Collect all the objectives to win.\nThe coordinates of the next objective are displayed in the bottom-right corner.\nYou must be the same colour as the room you are entering. Otherwise, you will be warped to a random room.\n',
        {fontSize: 40, wordWrap: true, wordWrapWidth: this.game.world.width - 100});
        var hintSquaresText = this.game.add.text(50, 310, 'The hint squares indicate the surrounding rooms.\ne.g.',
        {fontSize: 40, wordWrap: true, wordWrapWidth: this.game.world.width - 100});
        var exampleSquaresText = this.game.add.text(270, 420, '= green room 3 spaces over in that direction',
        {fontSize: 40, wordWrap: true, wordWrapWidth: this.game.world.width - 750});
        var hintSquare1 = this.game.add.image(175, 400, 'particle_green_square');
        var hintSquare2 = this.game.add.image(175, 448, 'particle_green_square');
        var hintSquare3 = this.game.add.image(175, 496, 'particle_green_square');
        hintSquare1.alpha = 0.4;
        hintSquare2.alpha = 0.4;
        hintSquare3.alpha = 0.4;
        // Create buttons
        var backButton = this.game.add.button(85, 50, 'button_back', this.startMenu, this);
        this.configureButton(backButton);
        var controlsButton = this.game.add.button(this.game.world.width - 230, this.game.world.height - 100, 'button_controls', this.startHelp, this);
        this.configureButton(controlsButton);
        // Create hotkeys
        var keyEsc = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        keyEsc.onDown.add(this.startMenu, this);
    }
}