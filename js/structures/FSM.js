class FSM {
    constructor (
        alphabet,
        type = FSM.TYPES.DFA
    ) {
        if (!alphabet) {
            throw new Error('Invalid alphabet.');
        }

        if (!FSM.TYPES[type]) {
            throw new Error('Invalid FSM type.');
        }

        // invariants
        this.alphabet = new Set(alphabet);
        this.type = type;

        // initialise variants
        this._init();
    }
    
    get onDeadState () {
        return this.currentStates.length <= 0;
    }

    _init () {
        this.currentStates = [];
        this.states = new Map();
        this.transitions = {};
    
        // New state
        let startState = this.addState('A', false);
        
        // Start state
        this.currentStates.push(startState); 
    }
    
    _resolve (state) {
        if (typeof state !== "object") {
            return this.states.get(state);
        }

        return state;
    }

    _unbuild (state) {
        state = this._resolve(state);

        delete this.transitions[state.id];
    }

    _build (state) {
        state = this._resolve(state);

        this.transitions[state.id] = {};

        for (let symbol of this.alphabet) {
            this.transitions[state.id][symbol] = [];
        }

        // Add empty string slot
        // note, empty string NOT in alphabet
        if (this.type === FSM.TYPES.E_NFA) {
            this.transitions[state.id][FSM.EMPTY_STRING] = [];
        }
    }

    reset () {
        this._init();
    }

    addState (id, accepting) {
        if (this.states.has(id)) {
            throw new Error('State already exists.');
        }

        let newState = {id, accepting};
        
        // Register state
        this.states.set(id, newState);
        
        // Build transition slot
        this._build(newState);

        return newState;
    }
    
    removeState (state) {
        state = this._resolve(state);

        if (!state) {
            throw new Error('State does not exist.');
        }

        // Unregister state
        this.states.remove(state.id);

        // Unbuilt transition slot
        this._unbuild(state)
    }

    addTransition (source, target, symbol) {
        source = this._resolve(source);

        if (!source) {
            throw new Error('Invalid source state.');
        }

        target = this._resolve(target);

        if (!target) {
            throw new Error('Invalid target state.');
        }

        symbol = String(symbol);

        if (!this.alphabet.has(symbol)) {
            throw new Error('Symbol ∉ alphabet.');
        }

        let tarr = this.transitions[source.id][symbol];

        // DFA Check
        if (this.type === FSM.TYPES.DFA
            && tarr.length >= 1) {
            throw new Error('DFA must be deterministic.');
        }

        // Add target state to transition set
        tarr.push(target);
    }

    addEmptyTransition (source, target) {
        if (this.type !== FSM.TYPES.E_NFA) {
            throw new Error('Machine must be E_NFA');
        }

        source = this._resolve(source);

        if (!source) {
            throw new Error('Invalid source state.');
        }

        target = this._resolve(target);

        if (!target) {
            throw new Error('Invalid target state.');
        }

        // Add target state to transition set
        this.transitions[source.id][FSM.EMPTY_STRING].push(target);
    }
    
    removeTransition (source, target, symbol) {
        source = this._resolve(source);

        if (!source) {
            throw new Error('Invalid source state.');
        }

        target = this._resolve(target);

        if (!target) {
            throw new Error('Invalid target state.');
        }

        symbol = String(symbol);

        if (!this.alphabet.has(symbol)) {
            throw new Error('Symbol ∉ alphabet.');
        }

        // Remove target state form array of states
        delete this.transitions[source.id][symbol]
            [this.transitions[source.id][symbol].indexOf(target)];
    }
    
    verify () {
        for (let state of this.currentStates) {
            if (state.accepting) {
                return true;
            }
        }

        return false;
    }

    move (symbol) {
        symbol = String(symbol);

        if (!this.alphabet.has(symbol)) {
            throw new Error('Symbol ∉ alphabet.');
        }

        let nextCurrentStates = [];

        for (let state of this.currentStates) {
            let nextStates = this.transitions[state.id][symbol];

            // Epsi closure
            if (this.type === FSM.TYPES.E_NFA) {
                nextStates = [
                    ...nextStates,
                    ...this.transitions[state.id][FSM.EMPTY_STRING]
                ];
            }

            // Merge 'sets'
            nextCurrentStates = [
                ...nextCurrentStates, 
                ...nextStates
            ];
        }

        this.currentStates = nextCurrentStates;
    }

    toString () {
        return `====== Machine [${this.type}] ======\n`
                + `Alphabet (${this.alphabet.size}): ${JSON.stringify(this.alphabet.values())}\n`
                + `States (${this.states.size}): ${JSON.stringify(this.states.values())}\n`
                + `Current States (${this.currentStates.length}): ${JSON.stringify(this.currentStates)}\n`
                + `Transitions: ${JSON.stringify(this.transitions)}`
    }

    toMarkup () {
        return `====== Machine [${this.type}] ======\n<br>`
                + `Alphabet (${this.alphabet.size}): ${JSON.stringify(Array.from(this.alphabet.values()))}\n<br>`
                + `States (${this.states.size}): ${JSON.stringify(Array.from(this.states.values()))}\n<br>`
                + `Current States (${this.currentStates.length}): ${JSON.stringify(this.currentStates)}\n<br>`
                + `Transitions: ${JSON.stringify(this.transitions)}`
    }
}

FSM.EMPTY_STRING = "ε";

FSM.TYPES = {
    DFA: 'DFA',
    NFA: 'NFA',
    E_NFA: 'E_NFA'
}
