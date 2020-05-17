/**
 * This class represents a custom canvas Graphic.
 * This is the parent class of:
 *  - StateGraphic
 *  - TransitionGraphic
 */
class Graphic extends PIXI.Graphics {
    constructor (...args) {
        super(...args);

        // enable the bunny to be interactive... 
        // this will allow it to respond to mouse and touch events
        this.interactive = true;

        // this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
        this.buttonMode = true;

        // this attached
        this.attached = [];
    }

    attach (graphic) {
        this.attached.push(graphic);
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

    _init () {
        throw new Error("Not implemented");
    }
    
    update () {
        throw new Error("Note yet implemented!");
    }

    updateAttached () {
        for (let attached of this.attached) {
            attached.update({});
        }
    }
}