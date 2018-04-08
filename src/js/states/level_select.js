class LevelSelect extends Phaser.State {
    create() {
        // Reset world scale
        this.game.world.scale.set(1);
        // Create level select text
        this.levelSelectText = this.game.add.text(this.game.world.width / 2, this.game.world.height / 6, 'Select level');
        this.levelSelectText.anchor.setTo(0.5, 0.5);
        this.levelSelectText.fontSize = 60;
        // Create buttons
        var backButton = this.game.add.button(85, 50, 'button_back', this.startMenu, this);
        this.configureButton(backButton);
        var level1Button = this.game.add.button(this.game.world.width / 6, (this.game.world.height / 5) * 2, 'button_level_1', this.startDisplaySeed, {that: this, level: 1});
        this.configureButton(level1Button);
        var level2Button = this.game.add.button((this.game.world.width / 6) * 2, (this.game.world.height / 5) * 2, 'button_level_2', this.startDisplaySeed, {that: this, level: 2});
        this.configureButton(level2Button);
        var level3Button = this.game.add.button((this.game.world.width / 6) * 3, (this.game.world.height / 5) * 2, 'button_level_3', this.startDisplaySeed, {that: this, level: 3});
        this.configureButton(level3Button);
        var level4Button = this.game.add.button((this.game.world.width / 6) * 4, (this.game.world.height / 5) * 2, 'button_level_4', this.startDisplaySeed, {that: this, level: 4});
        this.configureButton(level4Button);
        var level5Button = this.game.add.button((this.game.world.width / 6) * 5, (this.game.world.height / 5) * 2, 'button_level_5', this.startDisplaySeed, {that: this, level: 5});
        this.configureButton(level5Button);
        var level6Button = this.game.add.button(this.game.world.width / 6, (this.game.world.height / 5) * 3.5, 'button_level_6', this.startDisplaySeed, {that: this, level: 6});
        this.configureButton(level6Button);
        var level7Button = this.game.add.button((this.game.world.width / 6) * 2, (this.game.world.height / 5) * 3.5, 'button_level_7', this.startDisplaySeed, {that: this, level: 7});
        this.configureButton(level7Button);
        var level8Button = this.game.add.button((this.game.world.width / 6) * 3, (this.game.world.height / 5) * 3.5, 'button_level_8', this.startDisplaySeed, {that: this, level: 8});
        this.configureButton(level8Button);
        var level9Button = this.game.add.button((this.game.world.width / 6) * 4, (this.game.world.height / 5) * 3.5, 'button_level_9', this.startDisplaySeed, {that: this, level: 9});
        this.configureButton(level9Button);
        var level10Button = this.game.add.button((this.game.world.width / 6) * 5, (this.game.world.height / 5) * 3.5, 'button_level_10', this.startDisplaySeed, {that: this, level: 10});
        this.configureButton(level10Button);
        // Create esc hotkey
        var keyEsc = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        keyEsc.onDown.add(this.startMenu, this);
        // Create debug level hotkey
        var keyD = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
        keyD.onDown.add(this.startDisplaySeed, {that: this, level: 'debug'})
    }
    startMenu() {
        // Start menu state
        this.game.state.start('Menu');
    }
    startDisplaySeed() {
        // Start display seed state
        this.that.game.state.start('DisplaySeed', true, false, this.level);
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