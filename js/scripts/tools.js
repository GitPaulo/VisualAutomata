/**
 * tools.js
 * 
 * The tools menu is where the user can perform most of the operations available.
 * All the logic related to the tools menu is written here.
 */

// Reference to active machine
window.machine = null;

// Logger
var logger = Logger.getInstance();
var storage = Storage.getInstance();

// Tools
var toolsElement = document.getElementById("tools");
var toolsCloseElement = document.getElementById("close-tools");
var toolsOpenElement = document.getElementById("open-tools");

// Builder
var designerElement = document.getElementById("designer");
var loadLoaderElement = document.getElementById("load-loader");
var resetLoaderElement = document.getElementById("reset-loader");
var deployDesignerElement = document.getElementById("deploy-designer");
var automatonSelectorElement = document.getElementById("automaton-selector");

// Acceptor
var machineDataElement = document.getElementById("machine-data");
var acceptorStringElement = document.getElementById("acceptor-string");
var runAcceptorElement = document.getElementById("run-acceptor");

// Logger
var logAreaElement = document.getElementById('log-area');
var clearLoggerElement = document.getElementById("clear-logger");
var exportLoggerElement = document.getElementById("export-logger");

// Storage
var storageTableElement = document.getElementById("storage-table");
var loadStorageElement = document.getElementById("load-storage");
var saveStorageElement = document.getElementById("save-storage");
var deleteStorageElement = document.getElementById("delete-storage");

/** 
 * Tools
 */

toolsOpenElement.onclick = () => {
    // Update all tabs

    // Builder

    // Acceptor
    
    // Logger
    logAreaElement.value = logger.history;

    // Storage

    // Make visible
    toolsElement.style.display = "block";
    toolsOpenElement.classList.remove("attention");
}

toolsCloseElement.onclick = function () {
    toolsElement.style.display = "none";
}

/** 
 * Builder
 */

loadLoaderElement.onclick = function () {
    let automatonType = automatonSelectorElement.value;

    switch (automatonType) {
        case "DFA":
            window.machine = new DFA();
            break;
        case "NFA":
            window.machine = new NFA();
            break;
        default:
            return alert("Not available!");
    }

    designerElement.classList.remove("disabled") // Active machine
    logger.log(`Automaton type ${automatonType} structure loaded.`);
}

resetLoaderElement.onclick = function () {
    designerElement.classList.add("disabled") // Active machine
    window.machine = null;

    logger.log("Reset active machine and builder state.");
}

/** 
 * Acceptor
 */

runAcceptorElement.onclick = async function () {
    toolsCloseElement.onclick();
}

/** 
 * Designer
 */

deployDesignerElement.onclick = function () {
    window.machine.render(canvas);
}

/** 
 * Logger
 */

clearLoggerElement.onclick = function () {
    logger.clear();
    logAreaElement.value = "";

    logger.log("Logs cleared.");
}

exportLoggerElement.onclick = function () {
    download("va_logs.txt", logger.history);

    logger.log("Logs exported.");
}

/** 
 * Storage
 */

loadStorageElement.onclick = function () {

}

saveStorageElement.onclick = function () {
    if (!window.machine) {
        return alert("There must be an active machine to save.");
    }


}

deleteStorageElement.onclick = function () {

}