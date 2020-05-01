/**
 * start.js
 * 
 * The start view is the first view to be seen.
 * All the logic related to the core elements of the start view is written here.
 */
 
var logger = Logger.getInstance();
var mainElement = document.getElementById("main");
var startElement = document.getElementById("start");
var settingsElement = document.getElementById("settings");
var githubLinkElement = document.getElementById("link-github");
var documentationLinkElement = document.getElementById("link-documentation");
var settingsOpenElement = document.getElementById("open-settings");
var startToggleElement = document.getElementById("start-toggle");

/**
 * Event Functions
 */

documentationLinkElement.onclick = () => {
    window.open("https://github.com/GitPaulo/VisualAutomata/wiki");
}

githubLinkElement.onclick = () => {
    window.open("https://github.com/GitPaulo/VisualAutomata"); 
}

settingsOpenElement.onclick = () => {
    settingsElement.style.display = "block";
}

startToggleElement.onclick = () => {
    let display = startElement.style.display;

    startElement.style.display =
        (display === "none" && "block") ||
        (display === "block" && "none") ||
        "none";

    if (startElement.style.display === "none") {
        mainElement.style.display = "block";
        // Start renderer
        window.renderer.start();
    } else {
        mainElement.style.display = "none";
        // Destroy renderer
        window.renderer.destroy();
    }
}