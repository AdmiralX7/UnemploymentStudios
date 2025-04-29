```javascript
// game.js - Central Control Hub for the HTML5 Game

// Imports and Initialization
import Arion from './character/arion.js';
import Supporting from './characters/supporting.js';

// Game State Management Class
class GameState {
    constructor() {
        this.currentLevel = 1;
        this.score = 0;
        this.health = 100;
        this.isPaused = false;
        this.status = 'ongoing'; // could be 'ongoing', 'paused', 'ended'
    }

    // Getters and Setters
    getState() {
        return {
            level: this.currentLevel,
            score: this.score,
            health: this.health,
            status: this.status
        };
    }

    updateState(newState) {
        const { currentLevel, score, health, isPaused, status } = newState;
        if (currentLevel !== undefined) this.currentLevel = currentLevel;
        if (score !== undefined) this.score = score;
        if (health !== undefined) this.health = health;
        if (isPaused !== undefined) this.isPaused = isPaused;
        if (status !== undefined) this.status = status;
    }
}

// Game Loop Initialization
const gameState = new GameState();
let arion, supporting;

function initCharacters() {
    arion = new Arion();
    supporting = new Supporting();
    synchronizeDynamics();
}

function gameLoop() {
    if (gameState.status === 'ongoing' && !gameState.isPaused) {
        updateGame();
        renderGame();
    }
    requestAnimationFrame(gameLoop);
}

function updateGame() {
    arion.update();
    supporting.update();
}

function renderGame() {
    arion.render();
    supporting.render();
}

// Core Gameplay Functions
function startGame() {
    gameState.updateState({ currentLevel: 1, score: 0, health: 100, status: 'ongoing' });
    initCharacters();
    console.log("Game Started");
    gameLoop();
}

function pauseGame() {
    if (gameState.status !== 'paused') {
        gameState.updateState({ isPaused: true, status: 'paused' });
        console.log("Game Paused");
    }
}

function resumeGame() {
    if (gameState.status === 'paused') {
        gameState.updateState({ isPaused: false, status: 'ongoing' });
        console.log("Game Resumed");
    }
}

function gameOver() {
    gameState.updateState({ status: 'ended' });
    console.log("Game Over");
}

// Level Management
function loadLevel(levelNumber) {
    console.log(`Loading Level ${levelNumber}`);
    gameState.updateState({ currentLevel: levelNumber });
}

// Interactions and Events
function setupEventListeners() {
    document.addEventListener('keydown', (event) => {
        switch(event.key) {
            case 'p':
                pauseGame();
                break;
            case 'r':
                resumeGame();
                break;
            default:
                break;
        }
    });
}

// Synchronization of Dynamics
function synchronizeDynamics() {
    arion.syncWithGameState(gameState.getState());
    supporting.syncWithGameState(gameState.getState());
}

// Start the game
setupEventListeners();
startGame();
```