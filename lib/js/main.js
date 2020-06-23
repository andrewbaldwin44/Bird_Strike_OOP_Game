const gameApp = document.getElementById('app');
const gameEngine = new Engine(gameApp);

const keydownHandler = (event) => {
  if (event.code === 'ArrowLeft') {
    gameEngine.player.moveLeft();
  }

  if (event.code === 'ArrowRight') {
    gameEngine.player.moveRight();
  }
};

gameEngine.gameLoop();

document.addEventListener('keydown', keydownHandler);