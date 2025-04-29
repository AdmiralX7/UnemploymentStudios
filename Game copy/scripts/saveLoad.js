```javascript
export { saveGameState, loadGameState };

const LOCAL_STORAGE_KEY = 'gameSaveData';

function saveGameState(gameState) {
    try {
        const serializedState = JSON.stringify(gameState);
        localStorage.setItem(LOCAL_STORAGE_KEY, serializedState);
        console.log('Game state saved successfully.');
    } catch (error) {
        console.error('Error saving game state:', error);
    }
}

function loadGameState() {
    try {
        const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (serializedState === null) {
            console.warn('No saved game state found.');
            return null; 
        }
        return JSON.parse(serializedState);
    } catch (error) {
        console.error('Error loading game state:', error);
        return null;
    }
}
```