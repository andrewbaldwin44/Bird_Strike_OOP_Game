class Engine {
  constructor() {
    this.root = gameApp;
    this.startTime = new Date().getTime();
    this.player = new Player();
    this.player.displayLives();
    this.score = new Score();
    this.enemies = [];
    this.bonus = [];

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

    if (this.boss) this.boss.update();

    this.updateEntities(this.enemies);
    this.updateEntities(this.bonus);
    this.score.update(this.secondsElapsed);

    this.isBonusCollected();
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

  removeDestroyedEntities(entities) {
    return entities.filter(entity => !entity.destroyed)
  }

  spawnNewEnemies() {
    while (this.enemies.length < max_enemies) {
      let [enemyType, enemySpeed, enemyImage] = getRandomEnemyType();
      this.spawnNewEnemy(enemyType, enemySpeed, enemyImage);
    }
  }

  spawnNewEnemy(enemyType, enemySpeed, enemyImage) {
    const enemySpot = getEmptyLane(this.enemies);

    let newEnemy = new Enemy(enemySpot, enemyType, enemyImage, enemySpeed);

    if (enemyType == 2) newEnemy.shootBullets();

    this.enemies.push(newEnemy);
  }

  spawnNewBonus() {
    let randomChance = Math.floor((Math.random() * BONUS_CHANCE));
    if (randomChance === 1) {
      this.bonus.push(new Bonus());
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

  isBonusCollected() {
    this.bonus.forEach(bonus => {
      if (isCollision(bonus, this.player,
                      BONUS_WIDTH, PLAYER_WIDTH,
                      BONUS_HEIGHT, PLAYER_HEIGHT)) {
          bonus.collected();
          this.score.update(BONUS_SCORE);
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
      this.showLoseMessage();
      this.endGame();
    }
  }

  damageHitEnemies() {
    this.player.bullets.forEach(bullet => {
      this.enemies.forEach(enemy => {
        if (this.isEnemyHit(enemy, bullet)) {
          enemy.hit();
          bullet.destroy();
          this.removeDestroyedEnemies();
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
            this.boss.hit();
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

  queueBoss() {
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
    max_enemies = 4;
    enemy_shoot_speed = enemy_shoot_speed / 1.2;

    bonus_score = bonus_score * 10;
    score_increment = score_increment * 10;
    enemy_kill_score = enemy_kill_score * 2;
    boss_kill_score = boss_kill_score * 2;
  }

  showLoseMessage() {
    const xCenter = GAME_WIDTH / 2;
    const yCenter = GAME_HEIGHT / 2;

    this.loseText = new Text(gameApp, xCenter, yCenter - 100);
    this.playAgainText = new Text(gameApp, xCenter, yCenter);

    this.loseText.update('You lose!');
    this.playAgainText.update('Press any key\nto play again');
  }

  removeLoseMessage() {
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
      this.removeLoseMessage();
      this.removeEntities(this.enemies);
      this.removeEntities(this.bonus);
      this.removeBoss();
      setDefaultGameStats();

      this.startTime = new Date().getTime();
      this.score.current_score = 0;
      this.player.lives = PLAYER_DEFAULT_LIVES;
      this.player.fillLivesContainer();

      this.gameLoop();
    }, {once: true});
  }
}
