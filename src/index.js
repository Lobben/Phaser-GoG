import 'phaser';

var config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 1600,
  height: 900,
  backgroundColor: '#000000',
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);

function preload() {
  this.load.image('map', 'assets/map.jpg');
}

function create() {
  this.add.image(0, 0, 'map').setOrigin(0);
  var cursors = this.input.keyboard.createCursorKeys();

  var controlConfig = {
    camera: this.cameras.main,
    left: cursors.left,
    right: cursors.right,
    up: cursors.up,
    down: cursors.down,
    zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
    zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
    acceleration: 0.06,
    drag: 0.0005,
    maxSpeed: 1.0
  };

  game.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);

}

function update(time, delta) {
  game.controls.update(delta);
}