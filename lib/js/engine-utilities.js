function nextEnemySpot(enemies) {
  const spotsTaken = [false, false, false, false, false];

  enemies.forEach(enemy => spotsTaken[enemy.spot] = true);

  do {
    candidate = Math.floor(Math.random() * enemySpots);
  } while (spotsTaken[candidate]);

  return candidate;
}

function addBackground() {
  const bg = document.createElement('img');

  bg.src = BACKGROUND_IMAGE;
  bg.style.height = `${GAME_HEIGHT}px`;
  bg.style.width = `${GAME_WIDTH + 20}px`;
  bg.style.marginLeft = '-10px';

  gameApp.append(bg);
}

function startSoundTrack() {
  let nyan = new Audio("./assets/sounds/nyan.mp3");
  nyan.loop = true;
  //nyan.play();
}

const enemySpots = GAME_WIDTH / ENEMY_WIDTH;
