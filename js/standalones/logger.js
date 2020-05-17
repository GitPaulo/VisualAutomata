const LOG_KEY = 'LOGS';

const Logger = (function () {
    function Logger () {
        // Prep cache
        localStorage[LOG_KEY] = localStorage[LOG_KEY] || "";
        
        // Reference
        this.history = localStorage[LOG_KEY];
        
        this.generateStamp = function () {
            return '[' + new Date().toLocaleString() + ']';
        }

        this.print = function () {
            console.log(...arguments);
        }

        this.log = function (str) {
            let logStr = `${this.generateStamp()} ${str}\n`;
            
            // Log
            this.print(logStr);
            localStorage[LOG_KEY] += logStr;
        }

        this.clear = function () {
            localStorage[LOG_KEY] = "";
        }
    }

    let instance;

    return {
        getInstance: function () {
            if (instance == null) {
                instance = new Logger();
                // Hide the constructor so the returned object can't be new'd...
                instance.constructor = null;
            }
            return instance;
        }
    };
})();
