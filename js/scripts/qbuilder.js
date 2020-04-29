var logger = Logger.getInstance();
var canvasElement = document.getElementById("canvas");
var clickMenuElement = document.getElementById("quick-builder");
var clickMenuNSElement = document.getElementById("quick-new-state");
var clickMenuNASElement = document.getElementById("quick-new-accept-state");
var clickMenuNTElement = document.getElementById("quick-new-transition");;

canvasElement.onclick = function (event) {
    if (event.ctrlKey) {
        if (!window.machine) {        
            clickMenuElement.style.display = "none";
            
            return alert(
                "A machine must be loaded before accessing the Quick Builder menu."
            );
        }

        clickMenuElement.style.display = "block";
        clickMenuElement.style.top = event.y;
        clickMenuElement.style.left = event.x;
    } else {
        clickMenuElement.style.display = "none";
    }
}

clickMenuNSElement.onclick = function () {
    
}

clickMenuNSElement.onclick = function () {

}

clickMenuNTElement.onclick = function () {

}