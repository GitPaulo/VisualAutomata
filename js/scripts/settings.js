var logger = Logger.getInstance();

// Elements
var settingsElement = document.getElementById("settings");
var saveSettingsElement = document.getElementById("save-settings");
var settingsCloseElement = document.getElementById("close-settings");

// Settings Elements
var renderContextElement = document.getElementById("render-context");
var antialiasUsageElement = document.getElementById("use-antialias");
var textColorElement = document.getElementById("text-color");
var backgroundColorElement = document.getElementById("background-color");
var stateInnerColorElement = document.getElementById("state-inner-color");
var stateOuterColorElement = document.getElementById("state-outer-color");
var stateAcceptColorElement = document.getElementById("state-accept-color");
var animationSpeedElement = document.getElementById("animation-speed");

// Global settings
// (SESSION ONLY RIGHT NOW)
window.SETTINGS = (genSettings = () => ({
    application: {
        context: renderContextElement.value,
        antialias: antialiasUsageElement.checked,
    },
    canvas: {
        textColor: "0x" + textColorElement.value,
        backgroundColor: "0x" + backgroundColorElement.value,
        stateInnerColor: "0x" + stateInnerColorElement.value,
        stateOuterColor: "0x" + stateOuterColorElement.value,
        stateAcceptColor: "0x" + stateAcceptColorElement.value
    },
    animation: {
        speed: animationSpeedElement.value
    }
}))();

// Events

settingsCloseElement.onclick = () => {
    settingsElement.style.display = "none";
}

saveSettingsElement.onclick = function () {
    settingsElement.style.display = "none";
    window.SETTINGS = genSettings();
    logger.log("Settings updated.");
}