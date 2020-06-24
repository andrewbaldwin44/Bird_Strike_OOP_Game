const gameApp = document.getElementById('app');
const gameEngine = new Engine(gameApp);

function keydownHandler() {
  if (event.code === 'ArrowLeft') {
    gameEngine.player.moveLeft();
  }

  if (event.code === 'ArrowRight') {
    gameEngine.player.moveRight();
  }
}

function enableMovement() {
  document.addEventListener('keydown', keydownHandler);
}

function disableMovement() {
  document.removeEventListener('keydown', keydownHandler);
}

gameEngine.gameLoop();
enableMovement();
