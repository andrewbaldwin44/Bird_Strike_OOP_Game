class Engine {
  constructor() {
    this.root = gameApp;
    this.startTime = new Date().getTime();
    this.player = new Player();
    this.player.displayLives();
    this.score = new Score();
    this.enemies = [];
    this.bonus = [];
    this.hearts = [];

    addBackground();
    startSoundTrack();
  }

  gameLoop() {
    this.calculateSecondsElapsed();
    this.player.movePlayer();
    this.player.shootBullets();
    this.removeDestroyedEnemies();
    this.removeDestroyedBonus();

    if (this.secondsElapsed < BOSS_APPEARENCE) {
      this.spawnNewEnemies();
      this.spawnNewBonus();
    }

    if (this.secondsElapsed == BOSS_APPEARENCE && !this.boss) {
      this.queueBoss();
    }

    if (this.boss) {
      this.boss.update();
      this.spawnMinions();
    }

    this.updateEntities(this.enemies);
    this.updateEntities(this.bonus);
    this.score.update(this.secondsElapsed);

    this.collectBonus();
    this.collectHeart();
    this.damageHitEnemies();

    if (this.isPlayerHit()) this.damagePlayer();
    else this.continueGame();
  }

  calculateSecondsElapsed() {
    let currentTime = new Date().getTime();
    let seconds = (currentTime - this.startTime) / 1000;
    this.secondsElapsed = Math.floor(seconds);
  }

  removeDestroyedEnemies() {
    this.enemies = this.removeDestroyedEntities(this.enemies);
  }

  removeDestroyedBonus() {
    this.bonus = this.removeDestroyedEntities(this.bonus);
  }

  removeDestroyedHearts() {
    this.hearts = this.removeDestroyedEntities(this.hearts);
  }

  removeDestroyedEntities(entities) {
    return entities.filter(entity => !entity.destroyed);
  }

  spawnNewEnemies() {
    while (this.enemies.length < max_enemies) {
      let [enemyType, enemySpeed, enemyImage] = getRandomEnemyType();
      this.spawnNewEnemy(enemyType, enemySpeed, enemyImage);
    }
  }

  spawnNewEnemy(enemyType, enemySpeed, enemyImage) {
    const enemySpot = getEmptyLane(this.enemies);

    this.enemies.push(new Enemy(enemySpot, enemyType, enemyImage, enemySpeed));
  }

  spawnMinions() {
    while (this.enemies.length < boss_minions) {
      this.spawnNewEnemy(2, ENEMY_SPEED_2, enemy_third_image);
    }
  }

  spawnNewBonus() {
    let randomChance = Math.floor((Math.random() * bonus_chance));
    if (randomChance === 1) {
      this.bonus.push(new Bonus());
    }
  }

  spawnNewHeart(entity) {
    let randomChance = Math.floor((Math.random() * heart_chance));
    let width = HEART_WIDTH;
    let height = HEART_HEIGHT;

    if (entity.type == 1 || entity.type == 2) {
      randomChance = Math.floor((Math.random() * heart_chance / 2));
    }
    else if (entity.type == 'boss') {
      randomChance = 1;
      width = width * 2;
      height = height * 2;
    }

    if (randomChance == 1) {
      this.hearts.push(new Heart(entity, height, width));
    }
  }

  updateEntities(entities) {
    entities.forEach(entity => {
      entity.increaseSpeed(this.secondsElapsed);
      entity.update();
    });
  }

  removeEntities(entities) {
    entities.forEach(entity => entity.destroy());
  }

  collectBonus() {
    this.bonus.forEach(bonus => {
      if (isCollision(bonus, this.player,
                      BONUS_WIDTH, PLAYER_WIDTH,
                      BONUS_HEIGHT, PLAYER_HEIGHT)) {
        bonus.collected();
        this.removeDestroyedBonus();
        this.score.update(BONUS_SCORE);
      }
    });
  }

  collectHeart() {
    this.hearts.forEach(heart => {
      if (isCollision(heart, this.player,
                      heart.width, PLAYER_WIDTH,
                      heart.height, PLAYER_HEIGHT)) {

        heart.collect(this.player);
        heart.destroy();
        this.removeDestroyedHearts();
      }
    });

  }

  isEnemyHitPlayer(enemy, width = ENEMY_WIDTH, height = ENEMY_HEIGHT) {
    return isCollision(enemy, this.player,
                       width, PLAYER_WIDTH,
                       height, PLAYER_HEIGHT);
  }

  isBossHitPlayer() {
    if (this.boss) {
      return this.isEnemyHitPlayer(this.boss, ENEMY_BOSS_WIDTH, ENEMY_BOSS_HEIGHT);
    }
  }

  isBossBulletHitPlayer() {
    if (this.boss) {
      return this.isBulletHitPlayer(this.boss);
    }
  }

  isBulletHitPlayer(enemy) {
    return enemy.bullets.some(bullet => {
      if (isCollision(bullet, this.player,
                      BULLET_WIDTH, PLAYER_WIDTH,
                      BULLET_HEIGHT, PLAYER_HEIGHT)) {
        bullet.destroy();
        enemy.removeDestroyedBullets();
        return true;
      }
    });
  }

  isPlayerHit() {
    let enemy_hit =
      this.enemies.some(enemy => {
        return this.isEnemyHitPlayer(enemy) ||
               this.isBulletHitPlayer(enemy);
      });

    return (enemy_hit || this.isBossHitPlayer() || this.isBossBulletHitPlayer())
            && !this.player.invincible;
  }

  isEnemyHit(enemy, bullet, width = ENEMY_WIDTH, height = ENEMY_HEIGHT) {
    return isCollision(bullet, enemy, BULLET_WIDTH, width, BULLET_HEIGHT, height);
  }

  damagePlayer() {
    HIT_SOUND.currentTime = 0;
    HIT_SOUND.play();

    if (this.player.lives > 0) {
      this.player.loseLife();
      this.player.toggleInvincibility();
      this.continueGame();
    }
    else {
      FINAL_HIT.play();
      this.showHighScore();
      this.showLoseMessage();
      this.endGame();
    }
  }

  damageHitEnemies() {
    this.player.bullets.forEach(bullet => {
      this.enemies.forEach(enemy => {
        if (this.isEnemyHit(enemy, bullet)) {
          enemy.explode();
          bullet.destroy();
          this.explosionEnd(enemy)
          this.removeDestroyedEnemies();
          this.player.removeDestroyedBullets();
          this.getEnemyKillScore(enemy);
        }
      });
      this.damageHitBoss(bullet);
    });
  }

  damageHitBoss(bullet) {
    if (this.boss) {
      if (this.isEnemyHit(this.boss, bullet, ENEMY_BOSS_WIDTH, ENEMY_BOSS_HEIGHT)) {
        bullet.destroy();

        if (this.boss.y == BOSS_Y_POS) {
          if (this.boss.lives == 0) {
            BOSS_SOUND.pause();
            BACKGROUND_SOUND.play();
            this.boss.explode();

            this.explosionEnd(this.boss);

            this.boss = null;

            this.score.update(this.secondsElapsed, boss_kill_score);
            this.increaseDifficulty();
          }
          else {
            this.boss.lives--;
          }
        }
      }
    }
  }

  explosionEnd(entity) {
    entity.domElement.addEventListener('animationend', () => {
      gameApp.removeChild(entity.domElement);
      this.spawnNewHeart(entity);
    }, {once: true})
  }

  queueBoss() {
    BACKGROUND_SOUND.pause();
    BOSS_SOUND.play();
    if (enemy_shoot_speed < 500) enemy_shoot_speed = 500;

    this.boss = new Boss();
    this.boss.shootBullets();
  }

  removeBoss() {
    if (this.boss) {
      this.boss.destroy();
      this.boss = null;
    }
  }

  getEnemyKillScore(enemy) {
    let score_increase = enemy_kill_score;
    if (enemy.type == 1) score_increase = score_increase * 5;
    if (enemy.type == 2) score_increase = score_increase * 10;

    this.score.update(this.secondsElapsed, score_increase);
  }

  increaseDifficulty() {
    this.startTime = new Date().getTime();

    enemy_speed_max += DIFFICULTY;
    enemy_speed_min += DIFFICULTY;
    boss_lives += DIFFICULTY;
    max_enemies = MAX_DIFFICULTY_ENEMIES;
    boss_minions = MAX_MINIONS;
    enemy_shoot_speed = enemy_shoot_speed / SHOOT_SPEED_INCREMENT;

    let bonus_chance = BONUS_DIFFICULTY;
    let heart_chance = HEART_DIFFICULTY;

    bonus_score = bonus_score * SCORE_MULTIPLIER;
    score_increment = score_increment * SCORE_MULTIPLIER;
    enemy_kill_score = enemy_kill_score * KILL_SCORE_INCREMENT;
    boss_kill_score = boss_kill_score * KILL_SCORE_INCREMENT;
  }

  showHighScore() {
    let currentHighScore = deserialize();
    let currentScore = this.score.currentScore;
    let highScoreText = 'High Score';
    let y_offset = 0;

    if (!currentHighScore || currentHighScore < currentScore) {
      highScoreText = 'New High Score!';
      serialize(currentScore);
      currentHighScore = currentScore;
      y_offset = 35;
    }

    this.highScoreText = new Text(gameApp, X_CENTER, Y_CENTER - 50);
    this.highScore = new Text(gameApp, X_CENTER, Y_CENTER + y_offset);

    this.highScoreText.update(highScoreText);
    this.highScore.update(currentHighScore);
  }

  showLoseMessage() {
    this.loseText = new Text(gameApp, X_CENTER, Y_CENTER + 200);
    this.playAgainText = new Text(gameApp, X_CENTER, Y_CENTER + 300);

    this.loseText.update('You lose!');
    this.playAgainText.update('Press any key\nto play again');
  }

  removeGameText() {
    this.highScoreText.update('');
    this.highScore.update('');
    this.loseText.update('');
    this.playAgainText.update('');
  }

  continueGame() {
    setTimeout(() => this.gameLoop(), 20);
  }

  endGame() {
    disableMovement();

    setTimeout(() => {
      this.reset();
    }, NEW_GAME_TIMEOUT);
  }

  reset() {
    enableMovement();

    document.addEventListener('keydown', () => {
      this.removeGameText();
      this.removeEntities(this.enemies);
      this.removeEntities(this.bonus);
      this.removeEntities(this.hearts);
      this.removeBoss();
      setDefaultGameStats();
      setDefaultGameImages();

      this.enemies = [];
      this.bonus = [];
      this.hearts = [];

      this.startTime = new Date().getTime();
      this.score.currentScore = 0;
      bacon = 0;
      this.player.lives = PLAYER_DEFAULT_LIVES;
      this.player.fillLivesContainer();

      if (!BOSS_SOUND.paused) {
        BOSS_SOUND.pause();
        BACKGROUND_SOUND.play();
      }

      this.gameLoop();
    }, {once: true});
  }

  updatePlayerImage() {
    this.player.domElement.src = player_default_image;
  }
}
