const mainElement = document.getElementById("main");
const startElement = document.getElementById("start");
const menuElement = document.getElementById("menu");
const canvasElement = document.getElementById("canvas");
const settingsElement = document.getElementById("settings");
const startToggleElement = document.getElementById("startToggle");
const menuOpenElement = document.getElementById("menuOpen");
const menuCloseElement = document.getElementById("menuClose");
const menuOpenDragElement = dragger(document.getElementById("menuDrag"));
const githubButtonElement = document.getElementById("githubButton");
const settingsButtonElement = document.getElementById("settingsButton");
const documentationButtonElement = document.getElementById("documentationButton");
const settingsCloseElement = document.getElementById("settingsClose");

/**
 * Canvas
 */

let anim1 = () => {
    // Start graphics
    const graphics = new PIXI.Graphics();

    // Transition
    // Rectangle + line style 1
    graphics.lineStyle(2, 0x474747, 1);
    graphics.beginFill(0x1a1a1a);
    graphics.drawRect(500, 500-40+25, 1300-500, 50);
    graphics.endFill();
 
    // Dummy state 1
    graphics.lineStyle(0); // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
    graphics.beginFill(0xe5e5e5, 1);
    graphics.drawCircle(500, 500, 80);
    graphics.endFill();
        
    // Dummy state 2
    graphics.lineStyle(0); // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
    graphics.beginFill(0x87ff94, 1);
    graphics.drawCircle(1300, 500, 80);
    graphics.endFill();
    graphics.lineStyle(0); // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
    graphics.beginFill(0xe5e5e5, 1);
    graphics.drawCircle(1300, 500, 70);
    graphics.endFill();

    let t1 = new PIXI.Text('A',{fontFamily : 'Arial', fontSize: 54, fill : 0xea37ff, align : 'center'});
    t1.position.set(483, 474)
    let t2 = new PIXI.Text("'1'",{fontFamily : 'Arial', fontSize: 45, fill : 0xea37ff, align : 'center'});
    t2.position.set(483 + (1300-510)/2, 486)
    let t3 = new PIXI.Text('B',{fontFamily : 'Arial', fontSize: 54, fill : 0xea37ff, align : 'center'});
    t3.position.set(483 + (1300-500), 474)
    
    return [ graphics, t1, t2, t3 ];
}

let anim2 = () => {
    // Start graphics
    const graphics = new PIXI.Graphics();

    // Transition
    // Rectangle + line style 1
    graphics.lineStyle(2, 0x474747, 1);
    graphics.beginFill(0x1a1a1a);
    graphics.drawRect(500, 500-40+25, 1300-500, 50);
    graphics.endFill();
 
    // Dummy state 1
    graphics.lineStyle(0); // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
    graphics.beginFill(0xf24949, 1);
    graphics.drawCircle(500, 500, 80);
    graphics.endFill();
        
    // Dummy state 2
    graphics.lineStyle(0); // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
    graphics.beginFill(0x87ff94, 1);
    graphics.drawCircle(1300, 500, 80);
    graphics.endFill();
    graphics.lineStyle(0); // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
    graphics.beginFill(0xe5e5e5, 1);
    graphics.drawCircle(1300, 500, 70);
    graphics.endFill();

    let t1 = new PIXI.Text('A',{fontFamily : 'Arial', fontSize: 54, fill : 0xea37ff, align : 'center'});
    t1.position.set(483, 474)
    let t2 = new PIXI.Text("'1'",{fontFamily : 'Arial', fontSize: 45, fill : 0xea37ff, align : 'center'});
    t2.position.set(483 + (1300-510)/2, 486)
    let t3 = new PIXI.Text('B',{fontFamily : 'Arial', fontSize: 54, fill : 0xea37ff, align : 'center'});
    t3.position.set(483 + (1300-500), 474)
    
    return [ graphics, t1, t2, t3 ];
}

let anim3 = () => {
    // Start graphics
    const graphics = new PIXI.Graphics();

    // Transition
    // Rectangle + line style 1
    graphics.lineStyle(2, 0x474747, 1);
    graphics.beginFill(0xf24949);
    graphics.drawRect(500, 500-40+25, 1300-500, 50);
    graphics.endFill();
 
    // Dummy state 1
    graphics.lineStyle(0); // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
    graphics.beginFill(0xe5e5e5, 1);
    graphics.drawCircle(500, 500, 80);
    graphics.endFill();
        
    // Dummy state 2
    graphics.lineStyle(0); // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
    graphics.beginFill(0x87ff94, 1);
    graphics.drawCircle(1300, 500, 80);
    graphics.endFill();
    graphics.lineStyle(0); // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
    graphics.beginFill(0xe5e5e5, 1);
    graphics.drawCircle(1300, 500, 70);
    graphics.endFill();

    let t1 = new PIXI.Text('A',{fontFamily : 'Arial', fontSize: 54, fill : 0xea37ff, align : 'center'});
    t1.position.set(483, 474)
    let t2 = new PIXI.Text("'1'",{fontFamily : 'Arial', fontSize: 45, fill : 0xea37ff, align : 'center'});
    t2.position.set(483 + (1300-510)/2, 486)
    let t3 = new PIXI.Text('B',{fontFamily : 'Arial', fontSize: 54, fill : 0xea37ff, align : 'center'});
    t3.position.set(483 + (1300-500), 474)
    
    return [ graphics, t1, t2, t3 ];
}


let anim4 = () => {
    // Start graphics
    const graphics = new PIXI.Graphics();

    // Transition
    // Rectangle + line style 1
    graphics.lineStyle(2, 0x474747, 1);
    graphics.beginFill(0x1a1a1a);
    graphics.drawRect(500, 500-40+25, 1300-500, 50);
    graphics.endFill();
 
    // Dummy state 1
    graphics.lineStyle(0); // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
    graphics.beginFill(0xe5e5e5, 1);
    graphics.drawCircle(500, 500, 80);
    graphics.endFill();
        
    // Dummy state 2
    graphics.lineStyle(0); // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
    graphics.beginFill(0x87ff94, 1);
    graphics.drawCircle(1300, 500, 80);
    graphics.endFill();
    graphics.lineStyle(0); // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
    graphics.beginFill(0xf24949, 1);
    graphics.drawCircle(1300, 500, 70);
    graphics.endFill();

    let t1 = new PIXI.Text('A',{fontFamily : 'Arial', fontSize: 54, fill : 0xea37ff, align : 'center'});
    t1.position.set(483, 474)
    let t2 = new PIXI.Text("'1'",{fontFamily : 'Arial', fontSize: 45, fill : 0xea37ff, align : 'center'});
    t2.position.set(483 + (1300-510)/2, 486)
    let t3 = new PIXI.Text('B',{fontFamily : 'Arial', fontSize: 54, fill : 0xea37ff, align : 'center'});
    t3.position.set(483 + (1300-500), 474)
    
    return [ graphics, t1, t2, t3 ];
}


let createCanvas = () => {
    const app = new PIXI.Application({
        width: canvasElement.clientWidth, // default: 800
        height: canvasElement.clientHeight, // default: 600
        antialias: true, // default: false
        transparent: false, // default: false
        resolution: 1, // default: 1
        backgroundColor: 0x242424
    });

    if (!PIXI.utils.isWebGLSupported()) {
        alert('WebGL not supported!');
    }

    console.log(canvasElement.clientWidth, canvasElement.clientHeight)
    console.log(`Created canvas of size ${app.view.width}x${app.view.height}`);

    // Enable Interaction
    app.stage.interactive = true;

    // Add the canvas to HTML document
    canvasElement.appendChild(app.view);

    anim1().forEach((c) => app.stage.addChild(c));

    return app;
}

window.onresize = () => {
    console.log('Resized canvas');
}

/**
 * Logger Text Editor
 */

const loggerText = CodeMirror(
    document.getElementById('loggerText'), {
        value: "Logger initialised.",
        lineNumbers: true
    }
);

loggerText.setSize('100%', '100%');

/**
 * Event Functions
 */

githubButtonElement.onclick = () => {
    window.open("https://github.com/GitPaulo/VisualAutomata"); 
}

settingsButtonElement.onclick = () => {
    settings.style.display = "block";
}

settingsCloseElement.onclick = () => {
    settings.style.display = "none";
}

documentationButtonElement.onclick = () => {
    window.open("https://github.com/GitPaulo/VisualAutomata/wiki");
}

startToggleElement.onclick = () => {
    let display = startElement.style.display;

    startElement.style.display =
        (display === "none" && "block") ||
        (display === "block" && "none") ||
        "none";

    if (startElement.style.display === "none") {
        mainElement.style.display = "block";
        menuOpenElement.classList.add("attention");
        window.canvas = createCanvas();
    } else {
        mainElement.style.display = "none";
        menuOpenElement.classList.remove("attention");
    }
}

menuOpenElement.onclick = () => {
    menuElement.style.display = "block";
    menuOpenElement.classList.remove("attention");
}

menuCloseElement.onclick = () => {
    menuElement.style.display = "none";
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

document.getElementById("acceptorRun").onclick = async () => {
    menuCloseElement.onclick();
    anim2().forEach((c) => window.canvas.stage.addChild(c));
    await sleep(1000);
    anim3().forEach((c) => window.canvas.stage.addChild(c));
    await sleep(1000);
    anim4().forEach((c) => window.canvas.stage.addChild(c));
    await sleep(1000);
    anim1().forEach((c) => window.canvas.stage.addChild(c));
}