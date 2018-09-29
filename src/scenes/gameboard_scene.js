import { Vertex } from '../vertex'
import { Edge } from '../edge'

export class GameboardScene extends Phaser.Scene {
	constructor() {
		super('GameboardScene');
	}

	get activeMode() {
		return this._activeMode;
	}
	set activeMode(mode) {
		if (mode !== this._activeMode) {
			this._activeMode = mode;
			switch (mode) {
				case this.modesEnum.vertex:
					this.events.emit('editModeChange', 'vertex');
					break;
				case this.modesEnum.edge:
					this.events.emit('editModeChange', 'edge');
					break;
			}
		}
	}

	preload() {
		this.load.image('map', 'assets/map.jpg');
	}

	create() {
		// Resources
		this.map = this.add.image(0, 0, 'map').setOrigin(0).setInteractive();
		this.map.name = "map";

		var controlConfig = {
			camera: this.cameras.main,
			left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
			right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
			up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
			down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
			zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
			zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
			acceleration: 0.2,
			drag: 0.005,
			maxSpeed: 1.0
		};
		this.game.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);
		this.deleteKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ALT);
		
		// Set camera bounds to map 
		var mapTexture = this.textures.get('map');
		var mapWidht = mapTexture.getSourceImage().width;
		var mapHeight = mapTexture.getSourceImage().height;
		this.cameras.main.setBounds(0, 0, mapWidht, mapHeight);

		this.modesEnum = Object.freeze({ "vertex": 0, "edge": 1 });
		this.activeMode = this.modesEnum.vertex;

		this.vertices = [];
		this.edges = [];

		this.input.setTopOnly(true);

		//  Events
		this.input.on('gameobjectdown', function (pointer, gameObject) {
			if (this.activeMode === this.modesEnum.vertex) {
				this.gameObjectDownInVertexMode(pointer, gameObject);
			}
			else if (this.activeMode === this.modesEnum.edge) {
				this.gameObjectDownInEdgeMode(pointer, gameObject);
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
			this.attachedToPointer.emit('updatedPosition');
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
			if (this.deleteKey.isDown) {
				gameObject.destroy();
			}
			else { 
				this.activateDragAndDrop(gameObject);
			}
		}
	}

	gameObjectDownInEdgeMode(pointer, gameObjectDown) {
		if (gameObjectDown.name === "vertex") {
			this.input.once('gameobjectup', function (pointer, gameObjectUp) {
				if (gameObjectUp.name === "vertex" && gameObjectDown !== gameObjectUp) {
					var edge = new Edge(gameObjectDown, gameObjectUp, this);
					this.edges.push(edge);
				}

			}, this);
		}
	}
}