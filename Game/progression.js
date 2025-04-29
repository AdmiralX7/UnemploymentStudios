```javascript
class PlayerProgression {
  constructor(levelsModule) {
    if (!levelsModule) {
      throw new Error('Levels module must be provided.');
    }
    this.levelsModule = levelsModule;
    this.experiencePoints = 0;
    this.level = 1;
    this.milestones = [];
    this.achievements = [];
    this.initConfiguration();
  }

  initConfiguration() {
    this.initialExperience = 0;
    this.defaultMilestones = this.getDefaultMilestones();
    this.currentLevel = 1;
  }

  updateExperience(points) {
    this.experiencePoints = Math.max(this.experiencePoints + points, 0);
    this.checkLevelUp();
  }

  checkLevelUp() {
    const requiredXP = this.getRequiredExperienceForNextLevel();
    while (this.experiencePoints >= requiredXP) {
      this.levelUp();
    }
  }

  getRequiredExperienceForNextLevel() {
    return Math.pow(this.level, 2) * 100;
  }

  levelUp() {
    this.level++;
    this.onLevelUp();
  }

  onLevelUp() {
    console.log(`Congratulations! You’ve reached level ${this.level}.`);
    this.checkAchievements();
    this.levelsModule.updateLevel(this.level);
  }

  trackMilestone(milestone) {
    if (!this.milestones.includes(milestone)) {
      this.milestones.push(milestone);
      this.milestoneAchieved(milestone);
    }
  }

  milestoneAchieved(milestone) {
    console.log(`Milestone achieved: ${milestone}`);
    this.rewardAchievement(milestone);
  }

  manageLevelTransition(newLevel) {
    this.currentLevel = newLevel;
    console.log(`Player transitioned to level ${newLevel}`);
    this.levelsModule.notifyLevelTransition(newLevel);
  }

  checkAchievements() {
    this.achievements.forEach(achievement => {
      if (this.meetsAchievementCriteria(achievement)) {
        this.unlockAchievement(achievement);
      }
    });
  }

  meetsAchievementCriteria(achievement) {
    return achievement.checkCriteria(this);
  }

  unlockAchievement(achievement) {
    if (!achievement.unlocked) {
      achievement.unlocked = true;
      console.log(`Achievement unlocked: ${achievement.name}`);
    }
  }

  rewardAchievement(milestone) {
    console.log(`Reward granted for milestone: ${milestone}`);
  }

  integrateWithLevels() {
    if (this.levelsModule) {
      console.log('Integration with levels module successful.');
    } else {
      console.error('Levels module not provided.');
    }
  }

  getDefaultMilestones() {
    return ['First Step', 'Amateur', 'Pro', 'Master'];
  }
}

const levels = {
  updateLevel: (newLevel) => console.log(`Level module updated to ${newLevel}.`),
  notifyLevelTransition: (newLevel) => console.log(`Notified level transition to ${newLevel}.`)
};

const playerProgression = new PlayerProgression(levels);
playerProgression.integrateWithLevels();
```