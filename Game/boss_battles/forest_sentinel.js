```javascript
// File: boss_battles/forest_sentinel.js
// Description: This script defines the mechanics for the Forest Sentinel boss battle. It emphasizes the use of combined elemental strategies to defeat the boss effectively. The script covers initialization, enemy behaviors, element combination logic, attack patterns, player interaction feedback, health and damage management, and cleanup procedures.

const FOREST_SENTINEL = {
    initialHealth: 1000,
    currentHealth: 1000,
    armor: 50,
    phases: 3,
    weaknesses: ['fire', 'lightning'],
    attackPatterns: [],
    isVulnerableTo: (elements) => elements.includes('fire') && elements.includes('lightning')
};

FOREST_SENTINEL.attackPatterns.push('slam', 'rootBarrier', 'summonThorns');

function checkElementCombination(elements) {
    return FOREST_SENTINEL.isVulnerableTo(elements) ? 2 : 1;
}

function randomAttackPattern() {
    const index = Math.floor(Math.random() * FOREST_SENTINEL.attackPatterns.length);
    return FOREST_SENTINEL.attackPatterns[index];
}

function handlePlayerAttack(elements) {
    const damageMultiplier = checkElementCombination(elements);
    const damage = calculateDamage(100, damageMultiplier, FOREST_SENTINEL.armor);
    FOREST_SENTINEL.currentHealth -= damage;
    provideFeedback(elements, damage);
}

function provideFeedback(elements, damage) {
    console.log(`You combined ${elements.join(' and ')} for ${damage} damage!`);
}

function calculateDamage(baseDamage, multiplier, armor) {
    const effectiveDamage = (baseDamage * multiplier) - armor;
    return Math.max(effectiveDamage, 0);
}

function resetForestSentinel() {
    FOREST_SENTINEL.currentHealth = FOREST_SENTINEL.initialHealth;
    console.log('Forest Sentinel has been reset for another battle!');
}
```