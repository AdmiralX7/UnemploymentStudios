```javascript
import { playerState, gameEnvironment, utilityFunctions } from './main.js';

class Enemy {
    constructor(name, health, attackPoints, defensePoints) {
        this.name = name;
        this.health = health;
        this.attackPoints = attackPoints;
        this.defensePoints = defensePoints;
    }

    performAttack(target) {
        console.log(`${this.name} attacks ${target.name}!`);
        const damage = Math.max(this.attackPoints - target.defensePoints, 0);
        return { success: damage > 0, damage };
    }

    defend(attacker) {
        console.log(`${this.name} defends against ${attacker.name}!`);
    }

    takeDamage(amount) {
        this.health -= amount;
        console.log(`${this.name} takes ${amount} damage, remaining health: ${this.health}`);
        if (this.health <= 0) this.onDefeated();
    }

    onDefeated() {
        console.log(`${this.name} has been defeated!`);
        triggerEvent('onEnemyDefeated', this);
    }
}

function decideEnemyAction(enemy, player) {
    if (enemy.health < 20) {
        return aiDefenseStrategy(enemy);
    } else {
        return aiAttackStrategy(enemy, player);
    }
}

function aiAttackStrategy(enemy, target) {
    return enemy.performAttack(target);
}

function aiDefenseStrategy(enemy) {
    enemy.defend();
    return { strategy: "defense" };
}

function executeCombatInteraction(attacker, defender) {
    const attackResult = attacker.performAttack(defender);
    if (attackResult.success) {
        defender.takeDamage(attackResult.damage);
    }
}

class BossEnemy extends Enemy {
    constructor(name, health, attackPoints, defensePoints, specialAbility) {
        super(name, health, attackPoints, defensePoints);
        this.specialAbility = specialAbility;
    }

    useSpecialAbility(target) {
        console.log(`${this.name} uses ${this.specialAbility} on ${target.name}!`);
        target.takeDamage(this.attackPoints * 2);
    }

    decideBossAction(player) {
        if (this.health < 50) {
            this.useSpecialAbility(player);
        } else {
            this.performAttack(player);
        }
    }
}

function updateGameWithEnemyAction(enemyAction) {
    console.log(`Enemy action executed: ${enemyAction}`);
}

const eventListeners = {
    onEnemyDefeated: (enemy) => {
        console.log(`${enemy.name} has been defeated!`);
    }
};

function triggerEvent(event, data) {
    if (eventListeners[event]) {
        eventListeners[event](data);
    }
}

function registerEventHandlers() {
    // Logic for setting up game event listeners
}

registerEventHandlers();

export { Enemy, BossEnemy, decideEnemyAction, executeCombatInteraction };
```