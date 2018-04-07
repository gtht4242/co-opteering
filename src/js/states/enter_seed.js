class EnterSeed extends Phaser.State {
    create() {
        // Reset world scale
        this.game.world.scale.set(1);
        // Create instruction text
        this.instructionText = this.game.add.text(this.game.world.width / 2, this.game.world.height / 4, 'Enter map code');
        this.instructionText.anchor.setTo(0.5, 0.5);
        this.instructionText.fontSize = 60;
        // Create seed text
        this.seedText = this.game.add.text(this.game.world.width / 2, this.game.world.height / 2, '');
        this.seedText.anchor.setTo(0.5, 0.5);
        this.seedText.fontSize = 60;
        // Create confirm button
        var confirmButton = this.game.add.button(this.game.world.width / 2, (this.game.world.height / 4) * 3, 'button_confirm', this.startMapper, this);
        this.configureButton(confirmButton);
        // Create number, numpad, ESC and enter keys
        this.keys = this.game.input.keyboard.addKeys({
            'esc': Phaser.KeyCode.ESC,
            'enter': Phaser.KeyCode.ENTER,
            'backspace': Phaser.KeyCode.BACKSPACE,
            'zero': Phaser.KeyCode.ZERO,
            'one': Phaser.KeyCode.ONE,
            'two': Phaser.KeyCode.TWO,
            'three': Phaser.KeyCode.THREE,
            'four': Phaser.KeyCode.FOUR,
            'five': Phaser.KeyCode.FIVE,
            'six': Phaser.KeyCode.SIX,
            'seven': Phaser.KeyCode.SEVEN,
            'eight': Phaser.KeyCode.EIGHT,
            'nine': Phaser.KeyCode.NINE,
            'numZero': Phaser.KeyCode.NUMPAD_0,
            'numOne': Phaser.KeyCode.NUMPAD_1,
            'numTwo': Phaser.KeyCode.NUMPAD_2,
            'numThree': Phaser.KeyCode.NUMPAD_3,
            'numFour': Phaser.KeyCode.NUMPAD_4,
            'numFive': Phaser.KeyCode.NUMPAD_5,
            'numSix': Phaser.KeyCode.NUMPAD_6,
            'numSeven': Phaser.KeyCode.NUMPAD_7,
            'numEight': Phaser.KeyCode.NUMPAD_8,
            'numNine': Phaser.KeyCode.NUMPAD_9
        });
        this.keys.esc.onDown.add(this.startMenu, this);
        this.keys.enter.onDown.add(this.startMapper, this);
        this.keys.backspace.onDown.add(this.backspaceSeed, this);
        this.keys.zero.onDown.add(this.appendSeed, {that: this, number: '0'});
        this.keys.one.onDown.add(this.appendSeed, {that: this, number: '1'});
        this.keys.two.onDown.add(this.appendSeed, {that: this, number: '2'});
        this.keys.three.onDown.add(this.appendSeed, {that: this, number: '3'});
        this.keys.four.onDown.add(this.appendSeed, {that: this, number: '4'});
        this.keys.five.onDown.add(this.appendSeed, {that: this, number: '5'});
        this.keys.six.onDown.add(this.appendSeed, {that: this, number: '6'});
        this.keys.seven.onDown.add(this.appendSeed, {that: this, number: '7'});
        this.keys.eight.onDown.add(this.appendSeed, {that: this, number: '8'});
        this.keys.nine.onDown.add(this.appendSeed, {that: this, number: '9'});
        this.keys.numZero.onDown.add(this.appendSeed, {that: this, number: '0'});
        this.keys.numOne.onDown.add(this.appendSeed, {that: this, number: '1'});
        this.keys.numTwo.onDown.add(this.appendSeed, {that: this, number: '2'});
        this.keys.numThree.onDown.add(this.appendSeed, {that: this, number: '3'});
        this.keys.numFour.onDown.add(this.appendSeed, {that: this, number: '4'});
        this.keys.numFive.onDown.add(this.appendSeed, {that: this, number: '5'});
        this.keys.numSix.onDown.add(this.appendSeed, {that: this, number: '6'});
        this.keys.numSeven.onDown.add(this.appendSeed, {that: this, number: '7'});
        this.keys.numEight.onDown.add(this.appendSeed, {that: this, number: '8'});
        this.keys.numNine.onDown.add(this.appendSeed, {that: this, number: '9'});
    }
    startMenu() {
        // Start menu state
        this.game.state.start('Menu');
    }
    startMapper() {
        // Start mapper state
        if (this.seedText.text.length > 0) {
            this.game.state.start('Mapper', true, false, parseInt(this.seedText.text, 10));
        }
    }
    appendSeed() {
        // Appends number to seed text if valid
        if (this.that.seedText.text.length < 6) {
            this.that.seedText.text += this.number;
        }
    }
    backspaceSeed() {
        // Remove last number from seed text if non-empty
        if (this.seedText.text.length > 0) {
            this.seedText.text = this.seedText.text.slice(0, this.seedText.text.length - 1);
        }
    }
    fullAlpha() {
        // Set alpha of button to 1
        this.button.alpha = 1;
    }
    halfAlpha() {
        // Set alpha of button to 0.5
        this.button.alpha = 0.5;
    }
    configureButton(button) {
        // Set anchor and alpha callbacks of button
        button.anchor.setTo(0.5, 0.5);
        button.alpha = 0.5;
        button.onInputOver.add(this.fullAlpha, {button: button});
        button.onInputOut.add(this.halfAlpha, {button: button});
    }
}