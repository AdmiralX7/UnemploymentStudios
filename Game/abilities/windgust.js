```javascript
import { clearObstacle, evaluatePuzzleInteraction, getNearbyObstacles } from '../mechanics/puzzles.js';

class WindGust {
    constructor(strength = 5, duration = 3000, areaOfEffect = 100) {
        this.strength = strength;
        this.duration = duration;
        this.areaOfEffect = areaOfEffect;
        this.active = false;
        this.remainingDuration = duration;
    }

    activate(x, y) {
        this.interactWithObstacles(x, y);
        this.active = true;
        this.remainingDuration = this.duration;
    }

    interactWithObstacles(x, y) {
        const obstacles = this.findObstacles(x, y);
        obstacles.forEach(obstacle => {
            if (clearObstacle(obstacle, this.strength)) {
                console.log(`Obstacle at (${obstacle.x}, ${obstacle.y}) cleared`);
            }
            evaluatePuzzleInteraction(obstacle, this.strength);
        });
    }

    findObstacles(x, y) {
        return getNearbyObstacles(x, y, this.areaOfEffect);
    }

    update(deltaTime) {
        if (!this.active) {
            return;
        }
        
        this.remainingDuration -= deltaTime;
        
        if (this.remainingDuration <= 0) {
            this.active = false;
        }
    }
}

export default WindGust;
```