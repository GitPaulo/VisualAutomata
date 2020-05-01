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
        machine: null,
        graphics: {
            states: [],
            transitions: []
        },
        fetchStateGraphic (id) {
            return this.graphics.states.filter((g) => g.id === id)[0];
        },
        fetchTransitionGraphic (source, target, symbol) {
            return this.graphics.transitions.filter(
                (g) => g.sourceGraphic.id === source 
                && g.TransitionGraphic.id === target
                && g.TransitionGraphic.transitionSymbol === symbol
            )[0];
        },
        load (alphabetArr, automatonType) {
            // Cleanup
            this.destroy(); 
            
            // Load
            this.machine = new FSM(
                alphabetArr,
                FSM.TYPES[automatonType]
            );
            
            // Start state graphic
            let startState = this.machine.states.values().next().value;
            let graphic = new StateGraphic(startState.id, startState.accepting);
            this.graphics.states.push(graphic);

            // Update
            this.update();

            // Log
            logger.log("Machine finished loading.");
        },
        newState () {
            if (!this.machine) {
                throw new Error("Machine not loaded in renderer.");
            }

            let id = String(prompt("Input the state ID?", "A"));
            let accepting = prompt("Is the state accepting?", "false").toLowerCase() === "true";
            let state = null;

            // Add to machine
            try {
                state = this.machine.addState(id, accepting);
            } catch (msg) {
                alert(msg);
                return;
            }

            // Create graphic
            let graphic = new StateGraphic(id, accepting);
            this.graphics.states.push(graphic);

            // Update
            this.update();

            // Log
            logger.log(`State (${id}, ${accepting}) added to machine.`);

            return graphic;
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

            let source = prompt("Source state ID?");
            let target = prompt("Target state ID?");
            let symbol = prompt("Transition symbol?");
        
            // Add to machine
            try {
                state = this.machine.addTransition(source, target, symbol);
            } catch (msg) {
                alert(msg);
                return;
            }

            let graphic = new TransitionGraphic(
                this.fetchStateGraphic(source),
                this.fetchStateGraphic(target),
                symbol
            );

            this.graphics.transitions.push(graphic);

            // Update
            this.update();

            // Log
            logger.log(`Transition (${source}, ${target}, ${symbol}) added to machine.`);

            return graphic;
        },
        newETransition () {
            if (!this.machine) {
                throw new Error("Machine not loaded in renderer.");
            }

            let source = prompt("Source state ID?");
            let target = prompt("Target state ID?");
        
            // Add to machine
            try {
                state = this.machine.addEmptyTransition(source, target, symbol);
            } catch (msg) {
                alert(msg);
                return;
            }

            let graphic = new TransitionGraphic(
                this.fetchStateGraphic(source),
                this.fetchStateGraphic(target),
                FSM.EMPTY_STRING
            );

            this.graphics.transitions.push(graphic);

            // Update
            this.update();

            // Log
            logger.log(`Empty Transition (${source}, ${target}, ${symbol}) added to machine.`);

            return graphic;
        },
        editTransition () {
            if (!this.machine) {
                throw new Error("Machine not loaded in renderer.");
            }

        },
        destroy () {
            this.machine = null;
            this.graphics.states = [];
            this.graphics.transitions = [];

            this.update();
        },
        update () {
            // clean
            window.renderer.canvas.stage.removeChildren();

            // Stage transitions first
            for (let graphic of this.graphics.transitions) {
                window.renderer.canvas.stage.addChild(graphic);
            }

            // Now states
            for (let graphic of this.graphics.states) {
                window.renderer.canvas.stage.addChild(graphic);
            }
        }, 
        async animate (string) {
            let highlightCS = (color) => {
                console.log("HIGH", this.machine.currentStates)
                for (let cstate of this.machine.currentStates) {
                    let g = this.fetchStateGraphic(cstate.id);
                    console.log(g)
                    g.highlight(color);
                }
            }

            let resetCS = () => {
                for (let cstate of this.machine.currentStates) {
                    let g = this.fetchStateGraphic(cstate.id);
                    g.reset();
                }
            }

            // Go through input string
            for (let i = 0; i < string.length; i++) {
                let symbol = string.charAt(i);

                // Log
                logger.log('Machine reading symbol: ' + symbol);

                // Highlight current states
                highlightCS();
                await sleep();
                resetCS();

                this.machine.move(symbol);
            }

            let hcolor = null; 
            if (this.machine.verify()) {
                hcolor = 0x00ff00;
                alert("Accepted");
            } else {
                hcolor = 0xff3300;
                alert("Rejected!");
            }

            highlightCS(hcolor);
            await sleep();
            resetCS();

            let reset = confirm("Reset automaton?");

            if (reset) {
                this.machine.reset();
                alert("Reset machine!");
            }
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
                backgroundColor: SETTINGS.canvas.backgroundColor
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
