const Logger = (function () {
    function Logger () {

        // Prep cache
        localStorage[Logger.key] = localStorage[Logger.key] || "";
        
        // Reference
        this.history = localStorage[this.STORAGE_KEY];
        
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
            this.history += logStr;
        }

        this.clear = function () {
            this.history = "";
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

Logger.key = "logs";
Logger.prefix = "[LOG]";
