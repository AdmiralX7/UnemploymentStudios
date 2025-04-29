```javascript
import { recruitAlly, enhanceBond, boostFriendship } from '../mechanics/AllyMechanics.js';

class ViraNightshade {
  constructor() {
    this.shadowPower = 100;
    this.allegiance = 'antagonist';
    this.redemptionProgress = 0;
  }

  manipulateShadows() {
    console.log('Vira uses shadow manipulation, current power:', this.shadowPower);
  }

  enhanceShadowPower() {
    this.shadowPower += this.redemptionProgress * 2;
    console.log('Shadow power enhanced to:', this.shadowPower);
  }

  beginRedemption() {
    this.allegiance = 'neutral';
    console.log('Vira is starting her journey towards redemption.');
  }

  completeRedemption() {
    this.allegiance = 'ally';
    this.redemptionProgress = 100;
    recruitAlly(this);
    console.log('Vira has achieved full redemption and is now acknowledged as an ally.');
  }

  progressRedemption(amount) {
    this.redemptionProgress += amount;
    if (this.redemptionProgress >= 100) {
      this.completeRedemption();
    }
  }

  bondWithTeam() {
    if (this.allegiance === 'ally') {
      enhanceBond(this);
      boostFriendship(this);
    }
  }

  onImportantEvent(event) {
    if (event.type === 'decisiveBattle') {
      this.progressRedemption(20);
      console.log('Engaging in critical event, current redemption standing:', this.redemptionProgress);
    }
  }

  calculateShadowAttack() {
    return this.shadowPower * (1 + this.redemptionProgress / 100);
  }

  manageRedemptionOutcome() {
    if (this.allegiance === 'ally') {
      console.log('Vira is standing firm as an ally, shadow attack potency:', this.calculateShadowAttack());
    }
  }
}

export default ViraNightshade;
```