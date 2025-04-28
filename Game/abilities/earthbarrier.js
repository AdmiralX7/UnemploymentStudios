```javascript
const puzzles = require('../mechanics/puzzles');

const EARTH_BARRIER_CONFIG = {
    duration: 5000,
    strength: 100,
    cooldown: 10000,
    effectivenessMultiplier: 1.5
};

let earthBarrierActive = false;
let lastActivationTime = 0;

function activateEarthBarrier(isStrongerEnemy) {
    const currentTime = Date.now();
    if (currentTime - lastActivationTime >= EARTH_BARRIER_CONFIG.cooldown) {
        earthBarrierActive = true;
        let currentStrength = EARTH_BARRIER_CONFIG.strength;
        
        if (isStrongerEnemy) {
            currentStrength *= EARTH_BARRIER_CONFIG.effectivenessMultiplier;
        }
        
        console.log(`Earth Barrier activated with strength: ${currentStrength}`);

        setTimeout(() => { 
            earthBarrierActive = false; 
            console.log('Earth Barrier deactivated.');
        }, EARTH_BARRIER_CONFIG.duration);

        lastActivationTime = currentTime;
    }
}

module.exports = {
    activate: activateEarthBarrier,
    isBarrierActive: () => earthBarrierActive,
};

function onGameStateUpdate(event) {
    if (event.type === 'enemyAppears' && earthBarrierActive) {
        console.log('Adjusting Earth Barrier in response to a new enemy.');
    }
}

function puzzleEnhancedDefense(enemy) {
    if (puzzles && puzzles.isPuzzleContextActive()) {
        console.log('Enhanced defensive synergy with puzzle context.');
    }
}

puzzles.on('somePuzzleEvent', puzzleEnhancedDefense);
```