import 'phaser';

export class Vertex extends Phaser.GameObjects.Graphics {
    constructor(x, y, scene) {
        super(scene, { fillStyle: { color: 0xff0000 } });

        var circle = new Phaser.Geom.Circle(0, 0, 12);
        this.fillCircleShape(circle);
        this.setInteractive(circle, Phaser.Geom.Circle.Contains);

        this.scene.add.existing(this);
        this.name = "vertex"

        this.x = x;
        this.y = y;
    }
}