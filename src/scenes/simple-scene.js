import { Vertex } from '../vertex'

export class SimpleScene extends Phaser.Scene {
	get activeMode() {
		return this._activeMode;
	}
	set activeMode(mode) {
		var activeColor = "#EE00FF";

		if (this._activeMode == null) {
			this.modeTextObjects[mode].setBackgroundColor(activeColor);
		}
		else if (this._activeMode !== mode) {
			this.modeTextObjects[mode].setBackgroundColor(activeColor);
			this.modeTextObjects[this._activeMode].setBackgroundColor(null);
		}
		this._activeMode = mode;
	}

	preload() {
		this.load.image('map', 'assets/map.jpg');
	}

	create() {
		this.map = this.add.image(0, 0, 'map').setOrigin(0).setInteractive();
		this.map.name = "map";

		this.modeTextObjects = []
		this.modeTextObjects.push(this.add.text(10, 0, "vertex").setOrigin(0).setScrollFactor(0).setName("vertexText"));
		this.modeTextObjects.push(this.add.text(80, 0, "edge").setOrigin(0).setScrollFactor(0).setName("edgeText"));
		
		this.modesEnum = Object.freeze({ "vertex": 0, "edge": 1 });
		this.activeMode = this.modesEnum.vertex;
		
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

		this.input.setTopOnly(true);

		//  Events
		this.input.on('gameobjectdown', function (pointer, gameObject) {
			if (this.activeMode === this.modesEnum.vertex) {
				this.gameObjectDownInVertexMode(pointer, gameObject);
			}

		}, this);

		this.input.keyboard.on('keydown_ONE', function (event) {
			this.activeMode = this.modesEnum.vertex;
		}, this);

		this.input.keyboard.on('keydown_TWO', function (event) {
			this.activeMode = this.modesEnum.edge;
		}, this);
	}

	update(time, delta) {
		this.game.controls.update(delta);

		if (this.attachedToPointer != null) {
			var pointer = this.input.activePointer;
			this.attachedToPointer.setPosition(pointer.worldX, pointer.worldY);
		}
	}

	activateDragAndDrop(gameObject) {
		this.attachedToPointer = gameObject;
		this.attachedToPointer.once('pointerup', function (pointer) {
			this.scene.attachedToPointer = null;
		})
	}

	gameObjectDownInVertexMode(pointer, gameObject) {
		if (gameObject.name === "map") {
			var vertice = new Vertex(pointer.worldX, pointer.worldY, this);
			this.vertices.push(vertice);
			this.activateDragAndDrop(vertice);
		}
		else if (gameObject.name === "vertex") {
			this.activateDragAndDrop(gameObject);
		}
	}
}