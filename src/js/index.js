class Game extends Phaser.Game {
    constructor() {
        super(1250, 550, Phaser.AUTO, "game");
        this.state.add('Boot', Boot);
        this.state.add('Load', Load);
        this.state.add('Menu', Menu);
        this.state.add('DisplaySeed', DisplaySeed)
        this.state.add('Runner', Runner);
        this.state.add('EnterSeed', EnterSeed)
        this.state.add('Mapper', Mapper);
        this.state.start('Boot');
    }
}
new Game();