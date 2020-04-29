class FSM {
    constructor (
        startStateLiteral = ['A', false],
        alphabet = ['1', '0']
    ) {
        // Checks
        if (!startStateLiteral) {
            throw Error('Missing a starting state.');
        }

        if (!alphabet || alphabet.length <= 0) {
            throw Error('Missing or empty alphabet.');
        }

        // Properties
        this.states = new Set();
        this.alphabet = new Set([...alphabet]);
        this.transitions = new Map();
        this.lookup = new Map();
        this.currentStates = [];

        // Start State
        this.startState = this.insert(
            startStateLiteral.id || startStateLiteral[0],
            startStateLiteral.accepting || startStateLiteral[1]
        );

        // Define it
        this.currentStates = [this.startState];
    }
    
    _build (state) {
        let stateTransitions = new Map();

        for (let symbol of this.alphabet) {
            stateTransitions.set(symbol, new Set());
        }

        this.transitions.set(state.id, stateTransitions);
        this.lookup.set(state.id, state);
    }

    clear () {
        for (let state of this.states) {
            this._build(state);
        }
    }

    insert (id, accepting) {
        const newState = new FSM.State(
            id,
            accepting,
            this
        );

        this.states.add(newState);
        this._build(newState);

        return newState;
    }
    
    remove (id) {
        // Remove state and all its transitions
    }

    createDeadState (sourceState) {
        let deadState = new FSM.State(
            id,
            accepting,
            this
        );

        // Make dead
        deadState.makeDeadState(sourceState);

        // Add
        this.states.add(deadState);

        // Build
        this._build(deadState);       
    }

    addTransition (sourceId, targetId, symbol) {
        const sourceState = this.lookup.get(sourceId);

        if (!sourceState) {
            return new Error('Invalid source state.');
        }

        const targetState = this.lookup.get(targetId);

        if (!targetState) {
            return new Error('Invalid target state.');
        }

        const transitionSymbol = symbol;

        if (!this.alphabet.has(transitionSymbol)) {
            return new Error('Transition symbol not belonging to machine\'s alphabet.');
        }

        // Add tranistion to table
        this.transitions
            .get(sourceState.id)
            .get(transitionSymbol)
            .add(targetState);
    }

    deleteTransition (sourceId, targetId, symbol) {
        const sourceState = this.lookup.get(sourceId);

        if (!sourceState) {
            return new Error('Invalid source state.');
        }

        const targetState = this.lookup.get(targetId);

        if (!targetState) {
            return new Error('Invalid target state.');
        }

        const transitionSymbol = symbol;

        if (!this.alphabet.has(transitionSymbol)) {
            return new Error('Transition symbol not belonging to machine\'s alphabet.');
        }

        // Add tranistion to table
        this.transitions
            .get(sourceState.id)
            .get(transitionSymbol)
            .delete(targetState);
    }
    
    verify () {
        for (let state of this.currentStates) {
            if (state.accepting) {
                return true;
            }
        }

        return false;
    }

    accept (string) {
        this.input(string);

        return this.verify();
    }

    input (string) {
        throw Error('Not implemented yet.');
    }
}

FSM.State = class {
    constructor (id, accepting, machine) {
        this.id = id;
        this.accepting = accepting;
        //this.machine = machine;
        this.isDead = false;
    }

    makeDeadState (state) {
        this.sourceState = state;
        this.isDead = true;
    }
}
