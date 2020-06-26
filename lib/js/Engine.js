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

  spawnNewEnemies() {
    while (this.enemies.length < MAX_ENEMIES) {
      this.spawnNewEnemy();
    }
  }

  spawnNewEnemy() {
    const enemySpot = getEmptyLane(this.enemies);
    this.enemies.push(new Enemy(enemySpot));
  }

  spawnNewBonus() {
    let randomChance =  Math.floor((Math.random() * 100) + 1);
    if (randomChance === 1) {
      this.bonus.push(new Bonus());
    }
  }

  updateEntities(entities) {
    entities.forEach(entity => {
      entity.increaseSpeed(this.startTime);
      entity.update();
    });
  }

  removeDestroyedEntities(entities) {
    return entities.filter(entity => !entity.destroyed)
  }

  removeDestroyedEnemies() {
    this.enemies = this.removeDestroyedEntities(this.enemies);
  }

  removeDestroyedBonus() {
    this.bonus = this.removeDestroyedEntities(this.bonus);
  }

  removeEntities(entities) {
    entities.forEach(entity => entity.destroy());
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

  isBonusCollected() {
    this.bonus.forEach(bonus => {
      if (isCollision(bonus, this.player,
                         BONUS_WIDTH, PLAYER_WIDTH,
                         BONUS_HEIGHT, PLAYER_HEIGHT)) {
          bonus.destroy();
          CHOMP_SOUND.currentTime = 0;
          CHOMP_SOUND.play();
          this.score.update(100000);
      }
    });
  }

  gameLoop() {
    this.player.movePlayer();
    this.removeDestroyedEnemies();
    this.removeDestroyedBonus();
    this.spawnNewEnemies();
    this.spawnNewBonus();
    this.updateEntities(this.enemies);
    this.updateEntities(this.bonus);
    this.score.update();

    this.isBonusCollected();

    if (this.isPlayerDead()) {
      HIT_SOUND.currentTime = 0;
      HIT_SOUND.play();
      if (this.player.lives > 0) {
        this.player.loseLife();
        this.player.toggleInvincibility();
        this.continueGame();
      }
      else {
        FINAL_HIT.play();
        this.player.setImage(PLAYER_IMAGE_DIED);
        this.showLoseMessage();
        this.endGame();
      }
    }
    else {
      this.continueGame();
    }
  }

  isPlayerDead() {
    return this.enemies.some(enemy => {
      return isCollision(enemy, this.player,
                         ENEMY_WIDTH, PLAYER_WIDTH,
                         ENEMY_HEIGHT, PLAYER_HEIGHT);
    }) && !this.player.invincible;
  }

  endGame() {
    disableMovement();

    setTimeout(() => {
      this.reset();
    }, 300);
  }

  reset() {
    enableMovement();

    document.addEventListener('keydown', () => {
      this.removeLoseMessage();
      this.removeEntities(this.enemies);
      this.removeEntities(this.bonus);

      this.startTime = new Date().getTime();
      this.score.current_score = 0;
      this.player.lives = 3;
      this.player.fillLivesContainer();
      this.player.setImage(PLAYER_IMAGE_DEFAULT);

      this.gameLoop();
    }, {once: true});
  }
}
