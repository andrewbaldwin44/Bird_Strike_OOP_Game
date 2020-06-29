function isCollision(element1, element2,
                     element1Width, element2Width,
                     element1Height, element2Height) {

  const lenience = 15;
  let element1AbsoluteHeight = element1.y + element1Height - lenience;
  let element1AbsoluteWidth = element1.x + element1Width - lenience;
  let element2AbsoluteHeight = element2.y + element2Height - lenience;
  let element2AbsoluteWidth = element2.x + element2Width - lenience;

  return !(
    element1AbsoluteHeight < element2.y ||
    element1.y > element2AbsoluteHeight ||
    element1AbsoluteWidth < element2.x ||
    element1.x > element2AbsoluteWidth
  );
}

function getEmptyLane(enemies) {
  const spotsTaken = Array.from(Array(LANES)).map(() => false);

  enemies.forEach(enemy => spotsTaken[enemy.spot] = true);

  let candidate = undefined;
  do {
    candidate = Math.floor(Math.random() * LANES);
  } while (spotsTaken[candidate]);

  return candidate;
}

function getRandomEnemyType() {
  let enemy_speed = Math.random() / 2 + ENEMY_SPEED_OFFSET;
  let enemy_image = enemy_default_image;

  let randomEnemy = Math.floor((Math.random() * ENEMY_CHANCE));

  if (randomEnemy == 1) {
    enemy_speed = 1.5;
    enemy_image = enemy_second_image;
  }
  if (randomEnemy == 2) {
    enemy_speed = 0.05;
    enemy_image = enemy_third_image;
  }

  return [randomEnemy, enemy_speed, enemy_image];
}

function addBackground() {
  const bg = document.createElement('img');

  bg.src = background_image;
  bg.style.marginLeft = `-${GAME_PADDING / 2}px`;
  bg.style.height = `${GAME_HEIGHT}px`;
  bg.style.width = `${GAME_WIDTH + GAME_PADDING}px`;

  gameApp.appendChild(bg);
}

function startSoundTrack() {
  BACKGROUND_SOUND.loop = true;
  // BACKGROUND_SOUND.play();
}
