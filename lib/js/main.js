const gameApp = document.getElementById('app');
const gameEngine = new Engine(gameApp);

function isAllowedKey() {
  return allowedKeys.includes(event.code);
}

function keydownHandler() {
  if (isAllowedKey()) {
    keysPressed[event.code] = true;
  }
}

function keyUpHandler() {
  if (isAllowedKey()) {
    keysPressed[event.code] = false;
  }
}

function updateImage(element) {
  if (keysPressed['ArrowRight']) {
    element.src = playerImageRight;
  }
  else if (keysPressed['ArrowLeft']) {
    element.src = playerImageLeft;
  }
}

function calculateMovement(currentPosition, key1, key2, max) {
  let movement1 = keysPressed[key1] ? movementIteration : 0;
  let movement2 = keysPressed[key2] ? movementIteration : 0;
  let newMovement = currentPosition - movement1 + movement2;

  if (newMovement < 0) {
    return 0;
  }
  else {
    return newMovement > max ? max : newMovement;
  }
}

function enableMovement() {
  document.addEventListener('keydown', keydownHandler);
  document.addEventListener('keyup', keyUpHandler);
}

function disableMovement() {
  document.removeEventListener('keydown', keydownHandler);
}

const allowedKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
const keysPressed = {};
const movementIteration = 8;

gameEngine.gameLoop();
enableMovement();
