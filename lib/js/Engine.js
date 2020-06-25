class Engine {
  constructor() {
    this.root = gameApp;
    this.player = new Player();
    this.player.displayLives();
    this.score = new Score();
    this.enemies = [];

    addBackground();
    startSoundTrack();
  }

  getTimeDifference() {
    const currentTime = new Date().getTime();

    let timeDiff = this.lastFrame
      ? currentTime - this.lastFrame
      : currentTime

    this.lastFrame = currentTime;

    return timeDiff
  }

  updateEnemiesPosition() {
    let timeDiff = this.getTimeDifference();
    this.enemies.forEach(enemy => enemy.update(timeDiff));
  }

  removeEnemies() {
    this.enemies.forEach(enemy => enemy.destroy());
  }

  removeDestroyedEnemies() {
    this.enemies = this.enemies.filter(enemy => !enemy.destroyed);
  }

  spawnNewEnemy() {
    const spot = nextEnemySpot(this.enemies);
    this.enemies.push(new Enemy(spot));
  }

  spawnNewEnemies() {
    while (this.enemies.length < MAX_ENEMIES) {
      this.spawnNewEnemy();
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

  gameLoop() {
    this.player.movePlayer();
    this.updateEnemiesPosition();
    this.removeDestroyedEnemies();
    this.spawnNewEnemies();
    this.score.updateScore();

    if (this.isPlayerDead()) {
      if (this.player.lives > 0) {
        this.player.loseLife();
        this.player.toggleInvincibility();
        this.continueGame();
      }
      else {
        this.player.showDead();
        this.showLoseMessage();
        this.endGame();
      }
    }
    else {
      this.continueGame();
    }
  }

  detectCollision(enemy) {
    const lenience = 15;
    let enemyAbsoluteHeight = enemy.y + ENEMY_HEIGHT - lenience;
    let enemyAbsoluteWidth = enemy.x + ENEMY_WIDTH - lenience;
    let playerAbsoluteHeight = this.player.y + PLAYER_HEIGHT - lenience;
    let playerAbsoluteWidth = this.player.x + PLAYER_WIDTH - lenience;

    return !(
      enemyAbsoluteHeight < this.player.y ||
      enemy.y > playerAbsoluteHeight ||
      enemyAbsoluteWidth < this.player.x ||
      enemy.x > playerAbsoluteWidth
    );
  }

  isPlayerDead() {
    return this.enemies.some(enemy => this.detectCollision(enemy))
           && !this.player.invicible;
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

      this.score.current_score = 0;
      this.player.lives = 3;
      this.player.fillLivesContainer();
      this.player.showAlive();

      this.gameLoop();
    }, {once: true});
  }
}
