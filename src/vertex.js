export class Vertex {
    constructor(x, y) {
        this.position = { x: x, y: y };
    }

    get position() {
        return {
            x: this.x,
            y: this.y
        }
    }

    set position(position) {
        this.x = position.x;
        this.y = position.y;
    }
}