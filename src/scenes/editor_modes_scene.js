import { Vertex } from '../vertex'

export class EditorModesScene extends Phaser.Scene {
    constructor() {
        super({ key: 'EditorModesScene', active: true });
    }
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
    }

    create() {
        var gameScene = this.scene.get('GameboardScene');

        this.modeTextObjects = []
        this.modeTextObjects.push(this.add.text(10, 0, "vertex").setOrigin(0).setScrollFactor(0).setName("vertexText"));
        this.modeTextObjects.push(this.add.text(80, 0, "edge").setOrigin(0).setScrollFactor(0).setName("edgeText"));

        this.modesEnum = Object.freeze({ "vertex": 0, "edge": 1 });

        gameScene.events.on('editModeChange', function (mode) {
            switch (mode) {
                case 'vertex':
                    this.activeMode = this.modesEnum.vertex;
                    break;
                case 'edge':
                    this.activeMode = this.modesEnum.edge;
            }
        }, this);

    }

    update(time, delta) {
    }
}