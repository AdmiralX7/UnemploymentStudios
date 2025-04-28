```javascript
import { gameEvents, gameState } from './main.js';

class Puzzle {
    constructor(name) {
        this.name = name;
        this.isSolved = false;
    }

    initiate() {
        console.log(`${this.name} initiated.`);
    }

    solve() {
        this.isSolved = true;
        console.log(`${this.name} solved!`);
        gameState.update(this, 'solved');
    }

    reset() {
        this.isSolved = false;
        console.log(`${this.name} reset.`);
        gameState.update(this, 'reset');
    }
}

const ElementalAbilities = {
    fire: (target) => {
        console.log(`Fire applied to ${target}`);
    },
    water: (target) => {
        console.log(`Water applied to ${target}`);
    },
    earth: (target) => {
        console.log(`Earth applied to ${target}`);
    },
    air: (target) => {
        console.log(`Air applied to ${target}`);
    }
};

class StaticPuzzle extends Puzzle {
    constructor(name, element) {
        super(name);
        this.element = element;
    }

    triggerElementalAbility() {
        ElementalAbilities[this.element](this.name);
        gameEvents.emit('elementalTriggered', { name: this.name, element: this.element });
    }
}

class DynamicPuzzle extends Puzzle {
    constructor(name) {
        super(name);
        this.state = 'inactive';
    }

    changeState(newState) {
        this.state = newState;
        console.log(`${this.name} state changed to ${this.state}`);
        gameState.update(this, newState);
    }
}

class TimeBasedPuzzle extends Puzzle {
    constructor(name, duration) {
        super(name);
        this.duration = duration;
        this.timer = null;
    }

    startTimer() {
        if (!this.isSolved) {
            this.timer = setTimeout(() => {
                this.solve();
                this.timer = null;
            }, this.duration);
            console.log(`${this.name} timer started.`);
            gameState.update(this, 'timerRunning');
        }
    }

    stopTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
            console.log(`${this.name} timer stopped.`);
            this.timer = null;
            gameState.update(this, 'timerStopped');
        }
    }
}

function interactWithElement(element, target) {
    if (ElementalAbilities[element]) {
        ElementalAbilities[element](target);
        gameEvents.emit('elementInteracted', { element, target });
    } else {
        console.log(`Element ${element} not recognized.`);
    }
}

const puzzleEventDispatcher = {
    startPuzzle(puzzle) {
        puzzle.initiate();
        gameEvents.emit('puzzleStarted', puzzle.name);
    },
    completePuzzle(puzzle) {
        puzzle.solve();
        gameEvents.emit('puzzleSolved', puzzle.name);
    },
    resetPuzzle(puzzle) {
        puzzle.reset();
        gameEvents.emit('puzzleReset', puzzle.name);
    }
};

gameEvents.on('environmentalChange', (change) => {
    console.log(`Environmental change detected: ${change}`);
});
```