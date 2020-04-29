const Storage = (function () {
    function Storage () {        
        // Create space in cache
        localStorage[Storage.KEY] = localStorage[Storage.KEY] || new Map();

        this.save = function (id, data) {
            localStorage[Storage.KEY].set(id, { data, date: Date.now() });
        }

        this.load = function (id) {
            return localStorage[Storage.KEY].get(id);
        }
    }

    let instance;

    return {
        getInstance: function () {
            if (instance == null) {
                instance = new Storage();
                // Hide the constructor so the returned object can't be new'd...
                instance.constructor = null;
            }
            return instance;
        }
    };
})();

Storage.key = "storage";
