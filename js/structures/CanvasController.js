/**
 * This class bridges the GUI <--> Machine <--> Canvas
 * All canvas operations pass through here
 * Key Components
 * - canvas
 * - machine
 * - graphics
 *      + states
 *      + transitions
 */
class CanvasController {
    constructor (id, options) {
        this.id = id;
        this.options = options;
        this.canvas  = null;
        this.machine = null;
    }

    new () {
        // Create new app
        this.canvas = new PIXI.Application(this.options);

        // Check if already a canvas
        let pview = document.getElementById(this.id);

        if (pview) {
            pview.remove();
            logger.log("Removed existing pixijs view.");
        }

        // Add to div children
        this.canvas.view.id = this.id;
        canvasElement.appendChild(this.canvas.view);

        // Log size
        logger.log(
            `Created canvas view of size ${canvasElement.clientWidth}x${canvasElement.clientHeight}`
        );

        // Enable Interaction
        this.canvas.stage.interactive = true;
    }

    destroy () {
        // 
        this.canvas.destroy();
        this.canvas = null;

        // Remove current machine
        this.machine = null;
    }

    _stage () {
        // we restage all graphics!
        this.canvas.stage.removeChildren();

        // Stage graphics
        this.canvas.stage.addChild(
            ...this.machine.prepareGraphics()
        );
    }

    loadMachine (machine) {        
        // Verify machine
        if (!machine instanceof VisualAutomaton) {
            return alert("Invalid machine loaded!");
        }

        // Load
        this.machine = machine;

        // Update
        this._stage();

        // Log
        logger.log("Machine finished loading.");
    }

    newState (pos) {
        if (!this.machine) {
            throw new Error("Machine not loaded in controller.");
        }

        // Prompt parameters
        let id = String(prompt("Input the state ID?", "A"));
        let accepting = prompt("Is the state accepting?", "false").toLowerCase() === "true";

        // try adding to machine
        try {
           this.machine.addState(id, accepting);
        } catch (msg) {
            return alert(msg);
        }

        // Update
        this._stage();

        // Log
        logger.log(`State {id: ${id}, accepting: ${accepting}} added to machine.`);

        // Position
        if (pos) {
            let g = this.machine.graphics.states.get(id);
            g.x = pos.x;
            g.y = pos.y;

            logger.log(`Positioned state (${id}) at {x:${pos.x}, y:${pos.y}}`);
        }
    }

    removeState () {
        if (!this.machine) {
            throw new Error("Machine not loaded in controller.");
        }

        let id = String(prompt("Input the state ID?"));

        try {
            this.machine.removeState(id);
        } catch (msg) {
            return alert(msg);
        }

        // Update
        this._stage();

        // Log
        logger.log(`State (${id}) removed from machine along with all associated transitions.`);
    }

    editState () {
        if (!this.machine) {
            throw new Error("Machine not loaded in controller.");
        }

        // TODO
    }

    newTransition () {
        if (!this.machine) {
            throw new Error("Machine not loaded in controller.");
        }

        let source = prompt("Source state ID?");
        let target = prompt("Target state ID?");
        let symbol = prompt("Transition symbol?");
    
        // Add to machine
        try {
            this.machine.addTransition(source, target, symbol);
        } catch (msg) {
            return alert(msg);
        }

        // Update
        this._stage();

        // Log
        logger.log(`Transition (${source}, ${target}, ${symbol}) added to machine.`);
    }

    removeTransition () {
        if (!this.machine) {
            throw new Error("Machine not loaded in controller.");
        }

        let source = prompt("Source state ID?");
        let target = prompt("Target state ID?");
        let symbol = prompt("Transition symbol?");

        try {
            this.machine.removeTransition(source, target, symbol);
        } catch (msg) {
            return alert(msg);
        }

        // Update
        this._stage();

        // Log
        logger.log(`Transition (${source}, ${target}, ${symbol}) removed from machine.`);
    }

    editTransition () {
        if (!this.machine) {
            throw new Error("Machine not loaded in controller.");
        }

        // TODO
    }

    animate (string) {
        logger.log('Animation started.');

        this.machine.accept(string).then(() => {
            logger.log('Animation finished.');
        }).catch((err) => {
            alert(err);
        });
    }

    test () {
        if (!this.canvas) {
            return alert("Renderer has not started!");
        }
        
        // For debug purposes
        this.testGraphic = new StateGraphic('A', false);
        this.testGraphic2 = new StateGraphic('B', true);
        this.testGraphic3 = new TransitionGraphic(this.testGraphic, this.testGraphic2, '<T>');
        this.canvas.stage.addChild(this.testGraphic3, this.testGraphic, this.testGraphic2);
    }
}
