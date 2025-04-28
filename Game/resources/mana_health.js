```javascript
import { elaraAbilities } from '../characters/elara.js';

class HealthManager {
    constructor(initialHealth) {
        this.currentHealth = initialHealth;
        this.maxHealth = initialHealth;
    }

    increaseHealth(amount) {
        this.currentHealth = Math.min(this.maxHealth, this.currentHealth + amount);
    }

    decreaseHealth(amount) {
        this.currentHealth = Math.max(0, this.currentHealth - amount);
        this.checkCriticalHealth();
    }

    isAlive() {
        return this.currentHealth > 0;
    }

    getCurrentHealth() {
        return this.currentHealth;
    }

    checkCriticalHealth() {
        if (this.currentHealth < this.maxHealth * 0.2) {
            console.log("Health is critical!");
        }
    }
}

class ManaManager {
    constructor(initialMana) {
        this.currentMana = initialMana;
        this.maxMana = initialMana;
    }

    regenerateMana(amount) {
        this.currentMana = Math.min(this.maxMana, this.currentMana + amount);
    }

    spendMana(amount) {
        if (this.currentMana >= amount) {
            this.currentMana -= amount;
            return true;
        }
        return false;
    }

    getCurrentMana() {
        return this.currentMana;
    }

    balanceManaUse(abilityCost) {
        return this.currentMana >= abilityCost;
    }
}

function handleSpellCasting(spellName) {
    const spellCost = elaraAbilities[spellName]?.manaCost || 0;
    if (manaManager.spendMana(spellCost)) {
        console.log(`${spellName} cast successfully!`);
    } else {
        console.log(`Not enough mana to cast ${spellName}.`);
    }
}

function balanceResources(resource, maxResource) {
    return Math.min(maxResource, Math.max(0, resource));
}

function onDamageTaken(damageAmount) {
    healthManager.decreaseHealth(damageAmount);
}

function onRegenerateMana(regenAmount) {
    manaManager.regenerateMana(regenAmount);
}

function logResourceLevels() {
    console.log(`Health: ${healthManager.getCurrentHealth()}/${healthManager.maxHealth}`);
    console.log(`Mana: ${manaManager.getCurrentMana()}/${manaManager.maxMana}`);
}

export { HealthManager, ManaManager, handleSpellCasting, onDamageTaken, onRegenerateMana, logResourceLevels };

const healthManager = new HealthManager(100);
const manaManager = new ManaManager(50);
```