/**
 * This class is the parent of all machine classes:
 *  - FSMs (DFA, NFA, e-NFA)
 *  - PDA
 *  - etc...
 * 
 *  It represents any automaton that can be visualised by the application.
 */
class VisualAutomaton { 
    constructor () {
        this.graphics = {
            states: new Map(),
            transitions: new Map()
        }
    } 

    highlightGraphics () {
        for (let graphic of [
                ...Array.from(this.graphics.transitions.values()),
                ...Array.from(this.graphics.states.values())
            ]
        ) {
            graphic.highlight();
        }
    }

    resetGraphics () {
        for (let graphic of [
                ...Array.from(this.graphics.transitions.values()),
                ...Array.from(this.graphics.states.values())
            ]
        ) {
            graphic.reset();
        }
    }

    prepareGraphics () {
        let stage = [];

        // First transitions
        for (let graphic of Array.from(this.graphics.transitions.values())) {
            stage.push(graphic);
        }

        // Then states 
        for (let graphic of  Array.from(this.graphics.states.values())) {
            stage.push(graphic);
        }

        console.log(stage);

        // (order matters)
        return stage;
    }

    clearGraphics () {
        this.graphics.states.clear();
        this.graphics.transitions.clear();
    }

    registerState (id, accepting) {
        this.graphics.states.set(
            id,
            new StateGraphic(
                id,
                accepting
            )
        );
    }

    unregisterState(id) {
        if (!this.graphics.states.has(id)) {
            throw new Error(`Could not unregister transition with id: ${key}`);
        }
        
        // Remove state graphic
        this.graphics.states.delete(id);

        // Remove all state related transitions
        for (const [key, graphic] of this.graphics.transitions.entries()) {
            if (graphic.sourceGraphic.id === id || graphic.targetGraphic.id === id) {
                this.graphics.transitions.delete(key);
            }
        }
    }

    transitionKey(sourceId, targetId, transitionString) {
        return sourceId + targetId + transitionString;
    }

    registerTransition (sourceId, targetId, transitionString) {
        let sourceGraphic = this.graphics.states.get(sourceId);

        if (!sourceGraphic) {
            throw new Error(`Could not find source graphic for id: ${sourceId}`);
        }

        let targetGraphic = this.graphics.states.get(targetId);

        if (!targetGraphic) {
            throw new Error(`Could not find target graphic for id: ${targetId}`);
        } 

        // Key calculated by concatonation of the strings
        let key = this.transitionKey(sourceId, targetId, transitionString);

        this.graphics.transitions.set(
            key,
            new TransitionGraphic(
                sourceGraphic,
                targetGraphic,
                transitionString
            )
        );
    }

    unregisterTransition(sourceId, targetId, transitionString) {
        let key = this.transitionKey(sourceId, targetId, transitionString);

        if (!this.graphics.transitions.has(key)) {
            throw new Error(`Could not unregister transition with id: ${key}`);
        }

        this.graphics.transitions.delete(key);
    }

    
    async accept (string) {
        throw new Error("Not implemented!");
    }

    addState () {
        throw new Error("Not implemented!");
    }

    removeState () {
        throw new Error("Not implemented!");
    }

    addTransition () {
        throw new Error("Not implemented!");
    }

    removeTransition () {
        throw new Error("Not implemented!");
    }

    verify () {
        throw new Error("Not implemented!");
    }

    move () {
        throw new Error("Not implemented!");
    }

    toString () {
        throw new Error("Not implemented");
    }

    toMarkup () {
        throw new Error("Not implemented");
    }
}