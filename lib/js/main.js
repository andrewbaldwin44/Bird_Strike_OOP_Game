function isMovementKey() {
  return movementKeys.includes(event.code);
}

function keydownHandler() {
  if (isMovementKey() || event.code == 'Space') {
    keysPressed[event.code] = true;
  }

  if (event.code == 'KeyS' && bacon >= 10) {
    setScott();
    gameEngine.updatePlayerImage();
  }
}

function keyUpHandler() {
  if (isMovementKey() || event.code == 'Space') {
    keysPressed[event.code] = false;
  }
}

function calculateMovement(currentPosition, key1, key2, max) {
  let movement1 = keysPressed[key1] ? PLAYER_MOVEMENT : 0;
  let movement2 = keysPressed[key2] ? PLAYER_MOVEMENT : 0;
  let newMovement = currentPosition - movement1 + movement2;

  if (newMovement < 0) return 0;
  else return newMovement > max ? max : newMovement;
}

function enableMovement() {
  document.addEventListener('keydown', keydownHandler);
  document.addEventListener('keyup', keyUpHandler);
}

function disableMovement() {
  document.removeEventListener('keydown', keydownHandler);
}

const gameApp = document.getElementById('app');
const gameEngine = new Engine(gameApp);

const movementKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
const keysPressed = {};

let bacon = 0;

gameEngine.gameLoop();
enableMovement();
