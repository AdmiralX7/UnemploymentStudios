```javascript
class Character {
  constructor(name) {
    this.name = name || "Aeloria";
    this.health = 100;
    this.strength = 10;
    this.intelligence = 10;
    this.level = 1;
    this.experience = 0;
    this.abilities = [];
    this.skills = [];
  }

  addAbility(ability) {
    this.abilities.push(ability);
  }

  addSkill(skill) {
    this.skills.push(skill);
  }
}

class Ability {
  constructor(name, effect, cooldown) {
    this.name = name;
    this.effect = effect;
    this.cooldown = cooldown || 0;
    this.currentCooldown = 0;
  }

  use(target) {
    if (this.currentCooldown === 0) {
      console.log(`${this.name} used on ${target.name}`);
      this.effect(target);
      this.currentCooldown = this.cooldown;
    } else {
      console.log(`${this.name} is on cooldown for ${this.currentCooldown} more turns.`);
    }
  }

  reduceCooldown() {
    if (this.currentCooldown > 0) {
      this.currentCooldown -= 1;
    }
  }
}

class Skill {
  constructor(name, baseEffect, upgradeEffect) {
    this.name = name;
    this.baseEffect = baseEffect;
    this.upgradeEffect = upgradeEffect;
    this.level = 1;
  }

  apply(character) {
    console.log(`Applying ${this.name} to ${character.name} with effect: ${this.baseEffect}.`);
  }

  upgrade() {
    this.level += 1;
    console.log(`Upgraded ${this.name} to level ${this.level} with effect: ${this.upgradeEffect}.`);
  }
}

class ProgressionSystem {
  static experienceForLevel(level) {
    return level * 100;
  }

  static gainExperience(character, amount) {
    character.experience += amount;
    console.log(`${character.name} gains ${amount} experience.`);
    while (character.experience >= ProgressionSystem.experienceForLevel(character.level)) {
      ProgressionSystem.levelUp(character);
    }
  }

  static levelUp(character) {
    character.level += 1;
    character.experience -= ProgressionSystem.experienceForLevel(character.level - 1);
    console.log(`${character.name} leveled up to ${character.level}!`);
    character.strength += 2;
    character.intelligence += 2;
  }
}

const aeloria = new Character();
const fireball = new Ability("Fireball", (target) => target.health -= 30, 3);
const swordMastery = new Skill("Sword Mastery", "Increased sword damage", "Further increased sword damage");

aeloria.addAbility(fireball);
aeloria.addSkill(swordMastery);

ProgressionSystem.gainExperience(aeloria, 120);

fireball.use(aeloria);
aeloria.skills[0].apply(aeloria);
aeloria.skills[0].upgrade();
```