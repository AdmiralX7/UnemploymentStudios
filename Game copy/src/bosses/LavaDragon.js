```javascript
// src/bosses/LavaDragon.js

/**
 * LavaDragon.js
 * This file is responsible for creating and managing the Lava Dragon boss encounter.
 * The encounter reflects Elara's mastery over elemental magic and consists of complex
 * battle mechanics designed to provide a decisive and challenging experience for players.
 */

// Import Dependencies
import ElementalMagic from '../mechanics/ElementalMagic.js';
import { playSound, playMusic } from '../../assets/sounds/music/';

// Lava Dragon Class Definition
class LavaDragon {
    constructor() {
        this.health = 1000;
        this.strength = 150;
        this.defense = 100;
        this.elementalAffinity = 'fire';
        playMusic('lava_dragon_theme');
        console.info("Lava Dragon initialized with fire affinity.");
    }

    initiateBattle(player) {
        console.info("Lava Dragon battle started!");
        this.performElementalAttacks();
        this.respondToPlayer(player);
    }

    performElementalAttacks() {
        console.info("Performing elemental attack: FireBlast");
        ElementalMagic.castSpell('FireBlast', this.strength);
    }

    respondToPlayer(player) {
        if (player.hasWeakness('fire')) {
            console.warn("Player hit with a critical fire attack!");
            playSound('critical_hit');
        }
    }

    phaseShift(percentage) {
        console.info(`Lava Dragon is at ${percentage}% health.`);
        if (percentage < 50) {
            this.executeSpecialMove('MoltenCore');
        }
    }

    executeSpecialMove(moveName) {
        console.info(`Executing special move: ${moveName}`);
        playSound('special_move');
        if (moveName === 'MoltenCore') {
            ElementalMagic.castSpell('Inferno', this.strength * 2);
        }
    }
}

console.info("LavaDragon class successfully loaded.");

export default LavaDragon;
```