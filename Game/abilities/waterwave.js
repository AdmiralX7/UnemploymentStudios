```javascript
import * as Puzzles from '../mechanics/puzzles.js';

class WaterWave {
    constructor() {
        this.initWaveParameters();
    }

    initWaveParameters() {
        this.waveHeight = 0;
        this.waveVelocity = 0;
        this.waveDirection = 'undefined';
    }

    createWave(height, velocity, direction) {
        this.waveHeight = height;
        this.waveVelocity = velocity;
        this.waveDirection = direction;
        console.log(`Wave created with height: ${height}, velocity: ${velocity}, direction: ${direction}`);
    }

    adjustWaveParameters(heightAdjustment, velocityAdjustment) {
        this.waveHeight += heightAdjustment;
        this.waveVelocity += velocityAdjustment;
        console.log(`Wave adjusted to height: ${this.waveHeight}, velocity: ${this.waveVelocity}`);
    }

    applyWaveEffectToPuzzle(puzzleObject) {
        if (puzzleObject) {
            Puzzles.affectWithWater(this.waveHeight, this.waveVelocity, puzzleObject);
        }
    }

    solveWaterPuzzle(puzzleId) {
        const puzzleObject = Puzzles.getPuzzle(puzzleId);
        this.applyWaveEffectToPuzzle(puzzleObject);
        console.log(`Puzzle ${puzzleId} solved with current wave settings.`);
    }

    onWaveTriggered(event) {
        console.log(`Event triggered: ${event}. Executing wave action...`);
    }

    calculateWaveForce() {
        return this.waveHeight * this.waveVelocity;
    }

    deactivateWave() {
        console.log('Deactivating wave...');
        this.initWaveParameters();
        console.log('Wave deactivated.');
    }
}

export default WaterWave;
```