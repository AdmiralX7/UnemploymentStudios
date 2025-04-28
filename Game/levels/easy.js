```javascript
function initLevelEasy() {
  console.log("Welcome to Level Easy: Your goal is to collect all the stars and reach the portal!");

  const player = initializePlayer({
    position: { x: 0, y: 0 },
    controls: ['ArrowLeft', 'ArrowRight', 'Space']
  });

  const platforms = setupPlatforms([
    { x: 10, y: 100, width: 300, height: 20 },
    { x: 350, y: 150, width: 150, height: 20 }
  ]);

  const obstacles = setupObstacles([
    { x: 200, y: 80, type: 'spike' }
  ]);

  const safeZones = setupSafeZones([
    { x: 0, y: 120, width: 500, height: 20 }
  ]);

  const items = placeItems([
    { x: 50, y: 95, type: 'star' },
    { x: 370, y: 130, type: 'key' }
  ]);

  setupLever({
    position: { x: 400, y: 140 },
    onAction: () => {
      console.log("Lever pulled, door opened!");
    }
  });

  const checkLevelCompletion = () => {
    if (playerHasAllItems(player) && playerReachesExit(player)) {
      console.log("Congratulations, you've completed the level!");
      transitionToNextLevel();
    }
  };

  offerHint({
    condition: () => playerIsIdle(player),
    message: "Hint: Use arrows to move and space to jump!",
    display: (hint) => showOnscreenHint(hint)
  });

  const mainLoop = () => {
    requestAnimationFrame(mainLoop);
    updatePlayerPosition(player);
    checkLevelCompletion();
  };

  mainLoop();
}

initLevelEasy();
```