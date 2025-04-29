```javascript
import { init as gameplayInit, update as gameplayUpdate, handleInput as gameplayHandleInput } from './gameplay.js';
import { init as mainMenuInit, update as mainMenuUpdate, handleInput as mainMenuHandleInput } from './mainmenu.js';

let currentState = 'MainMenu';
let previousState = null;
const FRAME_RATE = 60;
const FRAME_DURATION = 1000 / FRAME_RATE;

const States = {
  MAIN_MENU: 'MainMenu',
  GAMEPLAY: 'Gameplay'
};

function changeState(newState) {
  previousState = currentState;
  currentState = newState;

  switch (newState) {
    case States.MAIN_MENU:
      mainMenuInit();
      break;
    case States.GAMEPLAY:
      gameplayInit();
      break;
  }
}

function init() {
  changeState(States.MAIN_MENU);
  requestAnimationFrame(mainLoop);
}

let lastFrameTime = performance.now();

function mainLoop(currentTime) {
  const deltaTime = currentTime - lastFrameTime;
  
  if (deltaTime >= FRAME_DURATION) {
    update(currentTime);
    lastFrameTime = currentTime - (deltaTime % FRAME_DURATION);
  }

  requestAnimationFrame(mainLoop);
}

function update(currentTime) {
  switch (currentState) {
    case States.MAIN_MENU:
      mainMenuUpdate(currentTime);
      break;
    case States.GAMEPLAY:
      gameplayUpdate(currentTime);
      break;
  }
}

document.addEventListener('keydown', handleInput);
document.addEventListener('keyup', handleInput);

function handleInput(event) {
  switch (currentState) {
    case States.MAIN_MENU:
      mainMenuHandleInput(event);
      break;
    case States.GAMEPLAY:
      gameplayHandleInput(event);
      break;
  }
}

init();
```