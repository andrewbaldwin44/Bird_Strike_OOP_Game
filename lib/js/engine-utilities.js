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
    enemy_speed = ENEMY_SPEED_1;
    enemy_image = enemy_second_image;
  }
  if (randomEnemy == 2) {
    enemy_speed = ENEMY_SPEED_2;
    enemy_image = enemy_third_image;
  }

  return [randomEnemy, enemy_speed, enemy_image];
}

function addBackground() {
  bg.src = background_image;
  bg.style.marginLeft = `-${GAME_PADDING / 2}px`;
  bg.style.height = `${GAME_HEIGHT}px`;
  bg.style.width = `${GAME_WIDTH + GAME_PADDING}px`;

  gameApp.appendChild(bg);
}

function playBackgroundMusic() {
  BACKGROUND_SOUND.loop = true;
  //return BACKGROUND_SOUND.play();
}

function startSoundTrack() {
  let promise = playBackgroundMusic();

  if (promise !== undefined) {
    promise.then(() => {
    }).catch(() => {
      document.addEventListener('keydown', () => {
        playBackgroundMusic();
      });
    });
  }
}

function setDefaultGameStats() {
  enemy_speed_max = ENEMY_SPEED_MAX;
  enemy_speed_min = ENEMY_SPEED_MIN;
  max_enemis = MAX_ENEMIES;
  boss_minons = BOSS_MINIONS;
  enemy_shoot_speed = ENEMY_SHOOT_SPEED;
  boss_lives = BOSS_LIVES;

  bonus_score = BONUS_SCORE;
  score_increment = SCORE_INCREMENT;
  enemy_kill_score = ENEMY_KILL_SCORE;
  boss_kill_score = BOSS_KILL_SCORE;
}

function setDefaultGameImages() {
  background_image = BACKGROUND_IMAGE;
  player_default_image = PLAYER_DEFAULT_IMAGE;
  player_lives_image = PLAYER_LIVES_IMAGE;
  player_bullet_image = PLAYER_BULLET_IMAGE;
  enemy_default_image = ENEMY_DEFAULT_IMAGE;
  enemy_second_image = ENEMY_SECOND_IMAGE;
  enemy_third_image = ENEMY_THIRD_IMAGE;
  enemy_bullet_image = ENEMY_BULLET_IMAGE;
  enemy_boss_image = ENEMY_BOSS_IMAGE;

  bg.src = background_image;
  gameEngine.updatePlayerImage();
}

function setScott() {
  background_image = LIBRARY;
  player_default_image = PLAYER_SCOTT;
  player_lives_image = PLAYER_SCOTT;
  enemy_default_image = ENEMY_DAN;
  enemy_second_image = ENEMY_SADNAN;
  enemy_third_image = ENEMY_RICHARD;
  enemy_boss_image = SCOTT_BOSS;

  bg.src = background_image;
}

const bg = document.createElement('img');
