class RenderGraph {
    constructor () {
        this.graphics = [];
    }

    addGraphic () {
        this.graphics.push(graphic);
    }

    deleteGraphic () {
        
    }

    render (canvas) {
        canvas.stage.addChild([...graphics]);
    }
}