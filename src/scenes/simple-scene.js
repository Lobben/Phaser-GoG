export class SimpleScene extends Phaser.Scene {
	preload() {
		this.load.image('map', 'assets/map.jpg');
	}
	create() {
		//this.add.text(100, 100, 'Hello Phaser!', { fill: '#0f0' });
		this.add.image(0, 0, 'map').setOrigin(0, 0);


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

	update(time, delta) {
		controls.update(delta);
	}
}