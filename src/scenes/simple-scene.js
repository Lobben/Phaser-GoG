import { Vertex } from '../vertex'

export class SimpleScene extends Phaser.Scene {
	preload() {
		this.load.image('map', 'assets/map.jpg');
	}
	create() {
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
			acceleration: 0.2,
			drag: 0.005,
			maxSpeed: 1.0
		};

		this.game.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);
		var mapTexture = this.textures.get('map');
		var mapWidht = mapTexture.getSourceImage().width;
		var mapHeight = mapTexture.getSourceImage().height;

		this.cameras.main.setBounds(0, 0, mapWidht, mapHeight);

		this.vertices = [];

		this.input.on('pointerdown', function (pointer) {
			this.vertices.push(new Vertex(pointer.worldX, pointer.worldY));

			var graphics = this.add.graphics({ fillStyle: { color: 0xff0000 } });
			var circle = new Phaser.Geom.Circle(pointer.worldX, pointer.worldY, 12);
			graphics.fillCircleShape(circle);	

		}, this);
	}

	update(time, delta) {
		this.game.controls.update(delta);
	}
}