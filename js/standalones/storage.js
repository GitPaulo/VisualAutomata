const STORAGE_PREFIX = '%STORAGE%_'; 
const Storage = (function () {
    function Storage () {        
        this.save = function (id, stringData) {
            localStorage[STORAGE_PREFIX + id] = stringData;
        }

        this.load = function (id) {
            return localStorage[STORAGE_PREFIX + id];
        }

        this.delete = function (id) {
            delete localStorage[STORAGE_PREFIX + id];
        }

        this.array = function () {
            let array = [];

            for (var key in localStorage) {
                if (!localStorage.hasOwnProperty(key)) {
                    continue;
                }

                if (key.startsWith(STORAGE_PREFIX)) {
                    array.push({ id: key.replace(STORAGE_PREFIX, ""), value: localStorage[key]});
                }
            }

            return array;
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
