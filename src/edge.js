import 'phaser';

export class Edge extends Phaser.GameObjects.Graphics {
    constructor(firstVertex, secondVertex, scene) {
        super(scene);

        this.firstVertex = firstVertex;
        this.secondVertex = secondVertex;

        this.drawLine();
        
        this.firstVertex.on('updatedPosition', this.drawLine, this);
        this.secondVertex.on('updatedPosition', this.drawLine, this);
        this.firstVertex.on('destroy', this.destroy, this);
        this.secondVertex.on('destroy', this.destroy, this);

        this.scene.add.existing(this);
        this.name = "edge"
    }

    drawLine(){
        this.clear();
        this.lineStyle(2, 0x00ff00);
        this.line = new Phaser.Geom.Line();
        this.line.setTo(this.firstVertex.x, this.firstVertex.y, this.secondVertex.x, this.secondVertex.y);
        this.strokeLineShape(this.line);
    }
}