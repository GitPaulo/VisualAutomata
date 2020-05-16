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
 * Canvas Controller
 */

window.controller = new CanvasController(
    "pixijs-view",
    {
        width: window.innerWidth,                           // default: 800
        height: window.innerHeight,                         // default: 600
        antialias: Boolean(SETTINGS.application.antialias), // default: false
        transparent: false,                                 // default: false
        resolution: 1,                                      // default: 1
        backgroundColor: SETTINGS.canvas.backgroundColor
    }
);

/**
 * Events
 */

window.onresize = () => {
    logger.log('Resized window');
}
