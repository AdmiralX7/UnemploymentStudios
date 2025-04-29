```javascript
const levelData = [
  {
    levelId: '1',
    levelName: 'The Awakening',
    narrativeContext: {
      storyElements: 'The player wakes up in an unfamiliar forest, surrounded by mysterious sounds.',
      objectives: ['Find the map', 'Reach the old cabin']
    },
    gameplayMechanics: {
      environmentSettings: {
        terrain: 'Dense Forest',
        weather: 'Foggy',
        timeOfDay: 'Early Morning'
      },
      challenges: [
        {
          type: 'puzzle',
          description: 'Solve the mysterious stone puzzle to open the path'
        },
        {
          type: 'enemy',
          description: 'Avoid or confront the stealthy forest dwellers'
        }
      ]
    },
    difficultyParameters: {
      difficultyLevel: 'Medium',
      scalingFactors: {
        enemyAggression: 1.2,
        puzzleComplexity: 1.5
      }
    },
    resourceAndAssetConfigurations: {
      assets: ['forest_background.png', 'cabin_theme.mp3'],
      rewards: ['100 XP', 'Forest Explorer Badge']
    },
    integrationPoints: {
      scoringIntegration: true,
      inventoryIntegration: ['map', 'key']
    },
    futureExtensionHooks: {}
  },
  {
    levelId: '2',
    levelName: 'The Lost Passage',
    narrativeContext: {
      storyElements: 'Venturing deeper, the player discovers an ancient passage leading underground.',
      objectives: ['Find the ancient artifact', 'Navigate the labyrinth']
    },
    gameplayMechanics: {
      environmentSettings: {
        terrain: 'Underground Labyrinth',
        weather: 'None',
        timeOfDay: 'Timeless'
      },
      challenges: [
        {
          type: 'puzzle',
          description: 'Decipher the runes to unlock secret doors'
        },
        {
          type: 'enemy',
          description: 'Guardians of the passage attempt to stop the intruder'
        }
      ]
    },
    difficultyParameters: {
      difficultyLevel: 'Hard',
      scalingFactors: {
        enemyAggression: 1.5,
        puzzleComplexity: 2.0
      }
    },
    resourceAndAssetConfigurations: {
      assets: ['labyrinth_background.png', 'tense_theme.mp3'],
      rewards: ['200 XP', 'Ancient Artifact']
    },
    integrationPoints: {
      scoringIntegration: true,
      inventoryIntegration: ['ancient artifact']
    },
    futureExtensionHooks: {}
  }
];

export default levelData;
```