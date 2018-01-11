class Game extends Phaser.Game {
    constructor() {
        super(1250, 550);
        this.state.add('Boot', Boot);
        this.state.add('Load', Load);
        this.state.add('Menu', Menu);
        this.state.add('Runner', Runner);
        this.state.add('Mapper', Mapper);
        this.state.start('Boot');
    }
}
new Game();