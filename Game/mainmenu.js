```javascript
document.addEventListener('DOMContentLoaded', () => {
  const buttons = {
    newGame: document.getElementById('new-game-btn'),
    loadGame: document.getElementById('load-game-btn'),
    settings: document.getElementById('settings-btn')
  };
  
  const menuContainer = document.getElementById('menu-container');
  
  buttons.newGame.addEventListener('click', handleNewGame);
  buttons.loadGame.addEventListener('click', handleLoadGame);
  buttons.settings.addEventListener('click', handleAccessSettings);

  const toggleElementVisibility = (element, visible) => {
    element.style.display = visible ? 'block' : 'none';
  };

  const toggleMenuVisibility = visible => toggleElementVisibility(menuContainer, visible);

  function handleNewGame() {
    console.log('Starting new game...');
    resetGameState();
    toggleMenuVisibility(false);
  }

  function resetGameState() {
    console.log('Game state reset.');
  }

  function handleLoadGame() {
    console.log('Loading saved game...');
    const savedGame = selectSavedGame();
    if (savedGame) {
      toggleMenuVisibility(false);
    } else {
      console.log('No saved game found.');
    }
  }

  function selectSavedGame() {
    return null;
  }

  function handleAccessSettings() {
    console.log('Accessing settings...');
    openSettingsModal();
  }

  function openSettingsModal() {
    console.log('Settings modal displayed.');
  }
});
```