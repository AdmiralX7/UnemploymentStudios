```javascript
// characters/elara.js

// Module Setup
import { triggerAnimation, increaseExperience, getGameState } from './main.js';

const elara = {
  name: 'Elara Lightfoot',
  health: 100,
  speed: 1.5,
  level: 1,
  experience: 0,
  abilities: {
    dash: { cooldown: 5, cost: 20, available: true },
    stealth: { cooldown: 10, cost: 30, available: true }
  },
  animations: {
    walking: 'elara_walk',
    jumping: 'elara_jump',
    attacking: 'elara_attack'
  }
};

// Abilities Management
function activateAbility(abilityName) {
  const ability = elara.abilities[abilityName];
  if (ability && ability.available) {
    ability.available = false;
    setTimeout(() => {
      ability.available = true;
    }, ability.cooldown * 1000);
  } else {
    console.warn(`Ability ${abilityName} is not available or doesn't exist.`);
  }
}

// Animations Control
function playAnimation(action) {
  const animation = elara.animations[action];
  if (animation) {
    triggerAnimation(animation);
  } else {
    console.warn(`Animation for ${action} not defined.`);
  }
}

// Progression System
function gainExperience(points) {
  elara.experience += points;
  increaseExperience(points);
  if (elara.experience >= elara.level * 100) {
    levelUp();
  }
}

function levelUp() {
  elara.level += 1;
  elara.health += 20;
  elara.speed += 0.1;
  elara.experience = 0;
  console.info(`Elara has leveled up to level ${elara.level}!`);
}

// Integration with main.js
function initializeCharacter() {
  console.info(`Initializing character: ${elara.name}`);
  playAnimation('walking');
}

// Example event listener for integration
document.addEventListener('keydown', (event) => {
  switch (event.key.toLowerCase()) {
    case 'a':
      playAnimation('attacking');
      break;
    case 'j':
      playAnimation('jumping');
      break;
    case 'd':
      activateAbility('dash');
      break;
    case 's':
      activateAbility('stealth');
      break;
    default:
      console.debug(`Key ${event.key} has no mapped function.`);
  }
});

export { elara, activateAbility, playAnimation, gainExperience, initializeCharacter };
```