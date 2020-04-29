
class DFA extends FSM {
    addTransition (sourceId, targetId, symb) {
        if (this.transitions
                .get(sourceId)
                .get(symb).size >= 1
        ) {
            throw new Error('DFAs need to be deterministic!');
        }

        super.addTransition(sourceId, targetId, symb);
    }

    input (string) {
        // Go through input string
        for (let i = 0; i < string.length; i++) {
            let state = this.currentStates[0];
            let symb = string.charAt(i);

            console.log(symb, ' | ', state.id, '=>')
                
            // Check if symbol is in alphabet
            if (!this.alphabet.has(symb)) {
                return Error('Illegal symbol on input.');
            }
        
            // DFA method returning next state from current state with symbol
            let nextState = this.transitions
                .get(state.id)
                .get(symb)
                .values()
                .next()
                .value;

            // Dead State
            if (!nextState) {
                nextState = this.createDeadState(state);
            }
            
            this.currentStates = [nextState]; 
    	}
    }
}