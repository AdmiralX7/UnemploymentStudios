```javascript
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let gameState = 'start';

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateGameState();
    renderGameObjects();
    requestAnimationFrame(gameLoop);
}

function updateGameState() {
    switch (gameState) {
        case 'play':
            updateRealTimeInfo();
            break;
        case 'pause':
            break;
        case 'end':
            endGameSession();
            break;
    }
}

function renderGameObjects() {
}

document.addEventListener('keydown', handleInput);
document.addEventListener('keyup', handleInput);

function handleInput(event) {
    switch (event.type) {
        case 'keydown':
            if (event.key === 'Enter' && gameState === 'start') {
                gameState = 'play';
            } else if (event.key === 'p' && gameState === 'play') {
                gameState = 'pause';
            } else if (event.key === 'r' && gameState === 'pause') {
                gameState = 'play';
            }
            break;
    }
}

function transitionGameState(newState) {
    gameState = newState;
}

function updateRealTimeInfo() {
}

document.getElementById('startButton').addEventListener('click', function () {
    transitionGameState('play');
});

function endGameSession() {
    document.removeEventListener('keydown', handleInput);
    document.removeEventListener('keyup', handleInput);
    console.log('Game Over');
}

gameLoop();
```