/**
 * canvas.js
 * 
 * The canvas is a compentent where the automaton are drawn.
 * All the logic related to canvas core components is here.
 */

var logger = Logger.getInstance();
var canvasElement = document.getElementById("canvas");

// Warn
if (!PIXI.utils.isWebGLSupported()) {
    alert('WebGL not supported!\nUsing HTML canvas API.');
}

/**
 * Renderer
 */

window.renderer = {
    canvas: null,
    graph: {
        graphics: [],
        machine: null,
        newState () {
            if (!this.machine) {
                throw new Error("Machine not loaded in renderer.");
            }

            let id = String(prompt("Input the state ID", "A"));
            let accepting = Boolean(prompt("Is the state accepting?", "false"));

            // Add to machine
            this.machine.addState(id, accepting);
        },
        editState () {
            if (!this.machine) {
                throw new Error("Machine not loaded in renderer.");
            }

            // Remove from machine
            this.machine.removeState(id);
        },
        newTransition () {
            if (!this.machine) {
                throw new Error("Machine not loaded in renderer.");
            }

            if (!renderer.machine) {
                return alert("Action blocked.\nA Machine must be loaded first.");
            }
        
            let source = prompt();
            let target = prompt();
            let symbol = prompt();
        
            try {
                renderer.graph.newTransition(source, target, symbol);
            } catch (e) {
                alert(e);
            }
        },
        editTransition () {
            if (!this.machine) {
                throw new Error("Machine not loaded in renderer.");
            }

        },
        clear () {

        }
    },
    start () {
        // Global
        this.canvas = new PIXI.Application(
            {
                width: canvasElement.clientWidth,           // default: 800
                height: canvasElement.clientHeight,         // default: 600
                antialias: Boolean(SETTINGS.application.antialias), // default: false
                transparent: false,                                 // default: false
                resolution: 1,                                      // default: 1
                backgroundColor: "0x" + SETTINGS.canvas.backgroundColor
            }
        );

        // Check if already a canvas
        let pid = "pixijs-view";
        let pview = document.getElementById(pid);

        if (pview) {
            pview.remove();
            logger.log("Removed existing pixijs view.");
        }

        // Add to div children
        this.canvas.view.id = pid;
        canvasElement.appendChild(this.canvas.view);

        // Log size
        logger.log(
            `Created canvas view of size ${canvasElement.clientWidth}x${canvasElement.clientHeight}`
        );

        // Enable Interaction
        this.canvas.stage.interactive = true;
    },
    destroy () {
        this.canvas = null;
        this.graph.clear();
    },
    update () {
        
    },
    test () {
        if (!this.canvas) {
            return alert("Renderer has not started!");
        }
        
        // For debug purposes
        this.testGraphic = new StateGraphic({id:'A', accepting:true});
        this.canvas.stage.addChild(this.testGraphic);
    }
};

/**
 * Events
 */

window.onresize = () => {
    logger.log('Resized window');
}
