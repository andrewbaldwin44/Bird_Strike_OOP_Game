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

    this.spawnNewEnemies();
    this.spawnNewBonus();

    this.updateEntities(this.enemies);
    this.updateEntities(this.bonus);
    this.score.update(this.secondsElapsed);

    this.isBonusCollected();
    this.isEnemyHit();

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
    while (this.enemies.length < MAX_ENEMIES) {
      let [enemyType, enemySpeed, enemyImage] = getRandomEnemyType();
      this.spawnNewEnemy(enemyType, enemySpeed, enemyImage);
    }
  }

  spawnNewEnemy(enemyType, enemySpeed, enemyImage) {
    const enemySpot = getEmptyLane(this.enemies);

    let newEnemy = new Enemy(enemySpot, enemyImage, enemySpeed);

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
          this.score.update(bonus_score);
      }
    });
  }

  isEnemyHit() {
    return this.player.bullets.forEach(bullet => {
        return this.enemies.forEach(enemy => {
          if (isCollision(bullet, enemy,
                          BULLET_WIDTH, ENEMY_WIDTH,
                          BULLET_HEIGHT, ENEMY_HEIGHT)) {
            enemy.hit();
            bullet.destroy();
          }
        });
    });
  }

  isEnemyHitPlayer(enemy) {
    return isCollision(enemy, this.player,
                       ENEMY_WIDTH, PLAYER_WIDTH,
                       ENEMY_HEIGHT, PLAYER_HEIGHT);
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
    return this.enemies.some(enemy => {
      return this.isEnemyHitPlayer(enemy) ||
             this.isBulletHitPlayer(enemy);
    }) && !this.player.invincible;
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

      this.startTime = new Date().getTime();
      this.score.current_score = 0;
      this.player.lives = PLAYER_DEFAULT_LIVES;
      this.player.fillLivesContainer();

      this.gameLoop();
    }, {once: true});
  }
}
