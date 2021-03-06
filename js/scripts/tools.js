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
var automatonSSIdElement = document.getElementById("automaton-ss-id");
var automatonSSAcceptingElement = document.getElementById("automaton-ss-accepting");
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
            // Load saved machines
            let saved = storage.array();

            // Clear current
            let tableRef = storageTableElement.getElementsByTagName('tbody')[0];
            tableRef.innerHTML = "";       

            for (let sdata of saved) {
                smachine = JSON.parse(sdata.value);
                
                // Make cells
                var newRow = tableRef.insertRow();
                var idCell = newRow.insertCell(0);
                var typeCell = newRow.insertCell(1);
                var sizeCell = newRow.insertCell(2);
                var dateCell = newRow.insertCell(3);

                // ID
                idCell.appendChild(document.createTextNode(sdata.id));
                // Type
                typeCell.appendChild(document.createTextNode(smachine.type));
                // Size
                sizeCell.appendChild(document.createTextNode(sizeOf(smachine)));
                // Date
                dateCell.appendChild(document.createTextNode('Unknown'));
            }
        break;
        default: 
            throw new Error("Invalid tools update selector");
    }
}

toolsOpenElement.onclick = function () {
    toolsElement.style.display = "block";
    toolsOpenElement.classList.remove("attention");

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
        this.value = "DFA";
    }
}

loadLoaderElement.onclick = function () {
    let automatonType = automatonSelectorElement.value;
    let alphabetArr = automatonAlphabetElement.value.trim().split(',');
    let automatonSSId = automatonSSIdElement.value;
    let automatonSSAccepting = automatonSSAcceptingElement.checked;

    // Check for empty field!
    if (alphabetArr.length <= 0) {
        return alert("Invalid alphabet input!");
    }

    if (automatonSSId.length <= 0){
        return alert("Invalid start state input!");
    }

    // Currently we only have FSM
    // Load machine
    controller.loadMachine(
        new FSM(
            alphabetArr,
            { id: automatonSSId, accepting: automatonSSAccepting },
            FSM.TYPES[automatonType]
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

    // Notify
    alert(`Loaded ${controller.machine.type} designer!`);
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
    let id = prompt("Enter machine id:");
    let serializedMachine = storage.load(id);

    if (!serializedMachine) {
        return alert(`Couldnt find machine of id: ${id}`);
    }

    let machineNoGraphics = JSON.parse(serializedMachine);
    console.log(machineNoGraphics);

    // Log
    logger.log(`Loaded machine of id: ${id}`);
}

saveStorageElement.onclick = function () {
    if (!controller.machine) {
        return alert("There must be an active machine to save.");
    }

    let id = prompt("Name the machine?");

    if (!id) {
        return;
    }

    let serializedMachine = JSON.stringify(controller.machine);

    // Store
    storage.save(id, serializedMachine);

    // Log
    logger.log(`Stored current machine as id: ${id}`);

    // Update
    toolsUpdate("storage");
}

deleteStorageElement.onclick = function () {    
    let id = prompt("Enter machine id:");
    let serializedMachine = storage.load(id);

    if (!serializedMachine) {
        return alert(`Couldnt find machine of id: ${id}`);
    }

    // Delete
    storage.delete(id);

    // Log
    logger.log(`Deleted machine of id: ${id}`);

    // Update
    toolsUpdate("storage");
}