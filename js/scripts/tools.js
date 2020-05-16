/**
 * tools.js
 * 
 * The tools menu is where the user can perform most of the operations available.
 * All the logic related to the tools menu is written here.
 */

// Logger
var logger = Logger.getInstance();
var storage = Storage.getInstance();

// Tools
var toolsElement = document.getElementById("tools");
var toolsCloseElement = document.getElementById("close-tools");
var toolsOpenElement = document.getElementById("open-tools");

// Loader
var loaderElement = document.getElementById("loader");
var automatonSelectorElement = document.getElementById("automaton-selector");
var automatonAlphabetElement = document.getElementById("automaton-alphabet");
var loadLoaderElement = document.getElementById("load-loader");

// Acceptor
var acceptorElement = document.getElementById("acceptor");
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

const toolsUpdate = (selector="all") => {
    switch (selector) {
        case "loader":
        case "all":
            // 
        case "acceptor":
        case "all":
            machineDataElement.innerHTML = controller.machine 
                && controller.machine.toMarkup() || "[NO LOADED MACHINE]";
        case "logger":
        case "all":
            logAreaElement.value = logger.history;
        case "storage":
        case "all":
            toolsElement.style.display = "block";
            toolsOpenElement.classList.remove("attention");
        break;
        default: 
            throw new Error("Invalid tools update selector");
    }
}

toolsOpenElement.onclick = function () {
    toolsElement.style.display = "block";

    /* Update all tabs */
    toolsUpdate();
}

toolsCloseElement.onclick = function () {
    toolsElement.style.display = "none";
}

/** 
 * Loader
 */

// Keep this here for now
automatonSelectorElement.onchange = function () {
    if (this.options[this.selectedIndex].value === 'PDA') {
        alert("PDA not yet implemented!");
    }

    this.value = "DFA";
}

loadLoaderElement.onclick = function () {
    let automatonType = automatonSelectorElement.value;
    let alphabetArr = automatonAlphabetElement.value.trim().split(',');

    // Check for empty foe;d
    if (alphabetArr.length <= 0) {
        return alert("Invalid alphabet input!");
    }

    // Currently we only have FSM
    // Load machine
    controller.loadMachine(
        new FSM(
            alphabetArr,
            FSM.TYPES.DFA[automatonType]
        )
    );

    // Designer and Acceptor now usable
    if (acceptorElement.classList.contains('disabled')) {
        acceptorElement.classList.remove("disabled");    
        alert("Acceptor unlocked!");
    }

    // Update acceptor view
    toolsUpdate("acceptor");

    // Clear panel
    toolsElement.style.display = "none";
    
    // Log
    logger.log(`Automaton type (${automatonType}) structure loaded.`);
}

/** 
 * Acceptor
 */

runAcceptorElement.onclick = function () {
    toolsCloseElement.onclick();

    // Input string
    let string = acceptorStringElement.value;

    // Start animation
    controller.animate(string);

    // Close panel
    toolsElement.style.display = "none";
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
    if (!controller.machine) {
        return alert("There must be an active machine to save.");
    }


}

deleteStorageElement.onclick = function () {

}