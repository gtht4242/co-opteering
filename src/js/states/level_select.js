class LevelSelect extends Phaser.State {
    create() {
        // Reset world scale
        this.game.world.scale.set(1);
        // Create level select text
        this.levelSelectText = this.game.add.text(this.game.world.width / 2, this.game.world.height / 6, 'Select level');
        this.levelSelectText.anchor.setTo(0.5, 0.5);
        this.levelSelectText.fontSize = 60;
        // Create level buttons
        var level1Button = this.game.add.button(this.game.world.width / 6, (this.game.world.height / 5) * 2, 'button_level_1', this.startDisplaySeed, {that: this, level: 1});
        level1Button.anchor.setTo(0.5, 0.5);
        level1Button.alpha = 0.5;
        level1Button.onInputOver.add(this.fullAlpha, {button: level1Button});
        level1Button.onInputOut.add(this.halfAlpha, {button: level1Button});
        var level2Button = this.game.add.button((this.game.world.width / 6) * 2, (this.game.world.height / 5) * 2, 'button_level_2', this.startDisplaySeed, {that: this, level: 2});
        level2Button.anchor.setTo(0.5, 0.5);
        level2Button.alpha = 0.5;
        level2Button.onInputOver.add(this.fullAlpha, {button: level2Button});
        level2Button.onInputOut.add(this.halfAlpha, {button: level2Button});
        var level3Button = this.game.add.button((this.game.world.width / 6) * 3, (this.game.world.height / 5) * 2, 'button_level_3', this.startDisplaySeed, {that: this, level: 3});
        level3Button.anchor.setTo(0.5, 0.5);
        level3Button.alpha = 0.5;
        level3Button.onInputOver.add(this.fullAlpha, {button: level3Button});
        level3Button.onInputOut.add(this.halfAlpha, {button: level3Button});
        var level4Button = this.game.add.button((this.game.world.width / 6) * 4, (this.game.world.height / 5) * 2, 'button_level_4', this.startDisplaySeed, {that: this, level: 4});
        level4Button.anchor.setTo(0.5, 0.5);
        level4Button.alpha = 0.5;
        level4Button.onInputOver.add(this.fullAlpha, {button: level4Button});
        level4Button.onInputOut.add(this.halfAlpha, {button: level4Button});
        var level5Button = this.game.add.button((this.game.world.width / 6) * 5, (this.game.world.height / 5) * 2, 'button_level_5', this.startDisplaySeed, {that: this, level: 5});
        level5Button.anchor.setTo(0.5, 0.5);
        level5Button.alpha = 0.5;
        level5Button.onInputOver.add(this.fullAlpha, {button: level5Button});
        level5Button.onInputOut.add(this.halfAlpha, {button: level5Button});
        var level6Button = this.game.add.button(this.game.world.width / 6, (this.game.world.height / 5) * 3.5, 'button_level_6', this.startDisplaySeed, {that: this, level: 6});
        level6Button.anchor.setTo(0.5, 0.5);
        level6Button.alpha = 0.5;
        level6Button.onInputOver.add(this.fullAlpha, {button: level6Button});
        level6Button.onInputOut.add(this.halfAlpha, {button: level6Button});
        var level7Button = this.game.add.button((this.game.world.width / 6) * 2, (this.game.world.height / 5) * 3.5, 'button_level_7', this.startDisplaySeed, {that: this, level: 7});
        level7Button.anchor.setTo(0.5, 0.5);
        level7Button.alpha = 0.5;
        level7Button.onInputOver.add(this.fullAlpha, {button: level7Button});
        level7Button.onInputOut.add(this.halfAlpha, {button: level7Button});
        var level8Button = this.game.add.button((this.game.world.width / 6) * 3, (this.game.world.height / 5) * 3.5, 'button_level_8', this.startDisplaySeed, {that: this, level: 8});
        level8Button.anchor.setTo(0.5, 0.5);
        level8Button.alpha = 0.5;
        level8Button.onInputOver.add(this.fullAlpha, {button: level8Button});
        level8Button.onInputOut.add(this.halfAlpha, {button: level8Button});
        var level9Button = this.game.add.button((this.game.world.width / 6) * 4, (this.game.world.height / 5) * 3.5, 'button_level_9', this.startDisplaySeed, {that: this, level: 9});
        level9Button.anchor.setTo(0.5, 0.5);
        level9Button.alpha = 0.5;
        level9Button.onInputOver.add(this.fullAlpha, {button: level9Button});
        level9Button.onInputOut.add(this.halfAlpha, {button: level9Button});
        var level10Button = this.game.add.button((this.game.world.width / 6) * 5, (this.game.world.height / 5) * 3.5, 'button_level_10', this.startDisplaySeed, {that: this, level: 10});
        level10Button.anchor.setTo(0.5, 0.5);
        level10Button.alpha = 0.5;
        level10Button.onInputOver.add(this.fullAlpha, {button: level10Button});
        level10Button.onInputOut.add(this.halfAlpha, {button: level10Button});
        // Create esc hotkey
        var keyEsc = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        keyEsc.onDown.add(this.startMenu, this);
    }
    update() {}
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
}