```javascript
// config.js

/**
 * Purpose:
 * This file manages game settings and configurations. It allows
 * adjustments for difficulty levels and provides localization
 * options to support multiple languages.
 */

// Default Settings Section
const defaultSettings = {
  resolution: {
    width: 1920,
    height: 1080
  },
  soundLevel: 0.8, // Default sound level set to 80%
  controls: {
    up: 'ArrowUp',
    down: 'ArrowDown',
    left: 'ArrowLeft',
    right: 'ArrowRight'
  }
};

// Difficulty Settings
const difficultySettings = {
  easy: {
    enemySpeed: 1,
    enemyHealth: 50,
  },
  medium: {
    enemySpeed: 2,
    enemyHealth: 100,
  },
  hard: {
    enemySpeed: 3,
    enemyHealth: 150,
  }
};

// Localization Settings
const localizationSettings = {
  languages: {
    en: 'English',
    es: 'Español',
    fr: 'Français'
  },
  currentLanguage: 'en' // Default language is English
};

// Dynamic Configuration Updates
function updateConfig(newSettings) {
  Object.assign(gameConfig.defaultSettings, newSettings.defaultSettings);
  Object.assign(gameConfig.difficultySettings, newSettings.difficultySettings);
  Object.assign(gameConfig.localizationSettings, newSettings.localizationSettings);
}

// Export/Expose Configurations
const gameConfig = {
  defaultSettings,
  difficultySettings,
  localizationSettings,
  updateConfig
};

export default gameConfig;
```