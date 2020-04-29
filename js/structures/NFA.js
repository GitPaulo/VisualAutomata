class NFA extends FSM {
    input (string) {
        // Go through input string
        for (let i = 0; i < string.length; i++) {
            let nextStates = [];
            let symb = string.charAt(i);

            // Check if symbol is in alphabet
            if (!this.alphabet.has(symb)) {
                return Error('Illegal symbol on input.');
            }
            
            for (let state of this.currentStates) {
                console.log(symb, ' | ', state.id, '=>')
                
                // DFA method returning next state from current state with symbol
                let nextState = this.transitions
                    .get(state.id)
                    .get(symb)
                    .values()
                    .next();

                // Dead State
                if (!nextState.value) {
                    this.addDeadState(state);
                } else { // Next State
                    this.currentStates = [nextState.value]; 
                }
            }
    	}
    }
}