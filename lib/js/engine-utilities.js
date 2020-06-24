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
}

function startSoundTrack() {
  let nyan = new Audio("./assets/sounds/nyan.mp3");
  nyan.loop = true;
  // nyan.play();
}

const enemySpots = GAME_WIDTH / ENEMY_WIDTH;
