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
    let randomChance =  Math.floor((Math.random() * 1000) + 1);
    if (randomChance === 1) {
      this.bonus.push(new Bonus());
    }
  }

  updateEnemies() {
    this.enemies.forEach(enemy => {
      enemy.increaseSpeed(this.startTime);
      enemy.update();
    });
  }

  updateBonus() {
    this.bonus.forEach(bonus => {
      bonus.update();
    });
  }

  removeDestroyedEnemies() {
    this.enemies = this.enemies.filter(enemy => !enemy.destroyed);
  }

  removeDestroyedBonus() {
    this.bonus = this.bonus.filter(bonus => !bonus.destroyed);
  }

  removeEnemies() {
    this.enemies.forEach(enemy => enemy.destroy());
  }

  removeBonus() {
    this.bonus.forEach(bonus => bonus.destroy());
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

  gameLoop() {
    this.player.movePlayer();
    this.removeDestroyedEnemies();
    this.removeDestroyedBonus();
    this.spawnNewEnemies();
    this.spawnNewBonus();
    this.updateEnemies();
    this.updateBonus();
    this.score.updateScore();

    if (this.isPlayerDead()) {
      if (this.player.lives > 0) {
        this.player.loseLife();
        this.player.toggleInvincibility();
        this.continueGame();
      }
      else {
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
    return this.enemies.some(enemy =>
      isCollision(enemy, this.player,
                      ENEMY_WIDTH, PLAYER_WIDTH,
                      ENEMY_HEIGHT, PLAYER_HEIGHT)
    ) && !this.player.invincible;
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
      this.removeEnemies();
      this.removeBonus();

      this.startTime = new Date().getTime();
      this.score.current_score = 0;
      this.player.lives = 3;
      this.player.fillLivesContainer();
      this.player.setImage(PLAYER_IMAGE_DEFAULT);

      this.gameLoop();
    }, {once: true});
  }
}
