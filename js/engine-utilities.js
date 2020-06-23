function nextEnemySpot(enemies) {
  const spotsTaken = [false, false, false, false, false];

  enemies.forEach(enemy => spotsTaken[enemy.spot] = true);

  do {
    candidate = Math.floor(Math.random() * enemySpots);
  } while (spotsTaken[candidate]);

  return candidate;
}

function addBackground(root) {
  const bg = document.createElement('img');

  bg.src = './assets/images/stars.png';
  bg.style.height = `${GAME_HEIGHT}px`;
  bg.style.width = `${GAME_WIDTH}px`;

  root.append(bg);

  const whiteBox = document.createElement('div');

  whiteBox.style.zIndex = 100;
  whiteBox.style.position = 'absolute';
  whiteBox.style.top = `${GAME_HEIGHT}px`;
  whiteBox.style.left = 0;
  whiteBox.style.height = `${ENEMY_HEIGHT}px`;
  whiteBox.style.width = `${GAME_WIDTH + 10}px`;
  whiteBox.style.background = '#fff';
  root.append(whiteBox);
}

function startSoundTrack() {
  let nyan = new Audio("./assets/sounds/nyan.mp3");
  nyan.loop = true;
  // nyan.play();
}

const enemySpots = GAME_WIDTH / ENEMY_WIDTH;
