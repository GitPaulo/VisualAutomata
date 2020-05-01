var logger = Logger.getInstance();
var canvasElement = document.getElementById("canvas");
var quickBuilderElement = document.getElementById("quick-builder");
var quickBuilderNSElement = document.getElementById("quick-new-state");
var quickBuilderNTElement = document.getElementById("quick-new-transition");
var quickBuilderNETElement = document.getElementById("quick-new-e-transition");
var quickBuilderRSElement = document.getElementById("quick-remove-state");
var quickBuilderRTElement = document.getElementById("quick-remove-transition");

canvasElement.onclick = function (event) {
    if (event.ctrlKey) {
        if (!renderer.graph.machine) {
            return alert("A machine must be loaded first!");
        }
        quickBuilderElement.style.display = "block";
        quickBuilderElement.style.top = event.y;
        quickBuilderElement.style.left = event.x;
    } else {
        quickBuilderElement.style.display = "none";
    }
}

quickBuilderNSElement.onclick = function (event) {
    let graphic = renderer.graph.newState();
    graphic.x = event.clientX;
    graphic.y = event.clientY;
}

quickBuilderNTElement.onclick = function () {
    renderer.graph.newTransition();
}

quickBuilderNETElement.onclick = function () {
    renderer.graph.newETransition();
}

quickBuilderRSElement.onclick = function () {
}

quickBuilderRTElement.onclick = function () {
}