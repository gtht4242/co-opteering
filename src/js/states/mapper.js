class Mapper extends Runner {
    init(seed) {
        // Set passed-in state variables
        this.mapSeed = [seed];
        console.log('Seed: ' + this.mapSeed);
    }
    create() {
        // Create mapData and other variables
        this.WALLTHICKNESS = 100;
        this.colors = ['cyan', 'green', 'red', 'yellow'];
        this.mapWidth = 5; // Must be odd
        this.mapData = this.generateMap(this.mapSeed);
        // Add ESC hotkey for exiting to menu
        var exitKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        exitKey.onDown.add(this.startEnterSeed, this);
        this.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.ESC);
        // Create map
        this.game.world.scale.set(0.2);
        this.map = this.game.add.group();
        var wallX = 0;
        var wallY = 0;
        for (var roomIndex = 0; roomIndex < Math.pow(this.mapWidth, 2); roomIndex++) {
            var room = this.mapData[roomIndex];
            if (roomIndex % this.mapWidth === 0 && roomIndex !== 0) {
                wallX = 0;
                wallY += 550;
            }
            for (var wallIndex = 0; wallIndex < room.walls.length; wallIndex++) {
                var wall = this.map.create(room.walls[wallIndex][0] + wallX, room.walls[wallIndex][1] + wallY, room.walls[wallIndex][2]);
            }
            wallX += 1250;
        }
        // Create buttons
        var backButton = this.game.add.button(425, 250, 'button_back', this.startEnterSeed, this);
        backButton.width *= 5;
        backButton.height *= 5;
        this.configureButton(backButton);
    }
    update() {}
}