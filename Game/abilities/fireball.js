```javascript
import { activatePuzzleMechanism } from '../mechanics/puzzles.js';

class Fireball {
  constructor() {
    this.damage = 50;
    this.range = 300;
    this.speed = 10;
    this.cooldown = 5000;
    this.lastUsed = 0;
  }

  execute(targetPosition) {
    const currentTime = Date.now();
    if (this.isCooldownActive(currentTime)) return;
    this.launchFireball(targetPosition);
    this.lastUsed = currentTime;
  }

  isCooldownActive(currentTime) {
    return currentTime - this.lastUsed < this.cooldown;
  }

  launchFireball(targetPosition) {
    const trajectory = this.calculateTrajectory(targetPosition);
    this.handleImpact(trajectory);
  }

  calculateTrajectory(targetPosition) {
    return targetPosition;
  }

  handleImpact(trajectory) {
    activatePuzzleMechanism(trajectory);
  }
}

function setupFireballAbility() {
  const fireball = new Fireball();
  document.addEventListener('useFireball', (event) => {
    fireball.execute(event.detail.targetPosition);
  });
}

setupFireballAbility();
```