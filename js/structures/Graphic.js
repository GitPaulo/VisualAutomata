class Graphic extends PIXI.Graphics {
    constructor (...args) {
        super(...args);
    }

    destroy () {
        this.clear(); 

        for (let child of this.children) {
            child.destroy();
        }
    }

    reset () {
        this.update({});
    }
    
    update () {
        throw new Error("Note yet implemented!");
    }
}