/**
 * canvas.js
 * 
 * The canvas is a compentent where the automaton are drawn.
 * All the logic related to canvas core components is here.
 */

var logger = Logger.getInstance();
var canvasElement = document.getElementById("canvas");

// Global
window.canvas = new PIXI.Application(
    {
        width: canvasElement.clientWidth,   // default: 800
        height: canvasElement.clientHeight, // default: 600
        antialias: true,                    // default: false
        transparent: false,                 // default: false
        resolution: 1,                      // default: 1
        backgroundColor: 0x242424
    }
);

/**
 * Drawing
 */

if (!PIXI.utils.isWebGLSupported()) {
    alert('WebGL not supported!');
}

// Log size
logger.log(
    `Created canvas of size ${canvas.view.width}x${canvas.view.height}`
);

// Enable Interaction
canvas.stage.interactive = true;

/**
 * Events
 */

window.onresize = () => {
    logger.log('Resized canvas');
}
