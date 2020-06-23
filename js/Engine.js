class Engine {
  constructor(theRoot) {
    this.root = theRoot;
    this.player = new Player(this.root);
    this.enemies = [];

    addBackground(this.root);
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
    this.enemies.push(new Enemy(this.root, spot));
  }

  spawnNewEnemies() {
    while (this.enemies.length < MAX_ENEMIES) {
      this.spawnNewEnemy();
    }
  }

  gameLoop() {
    this.updateEnemiesPosition();
    this.removeDestroyedEnemies();
    this.spawnNewEnemies();

    if (this.isPlayerDead()) {
      this.showLoseMessage()
      this.playAgain();
    }
    else {
      setTimeout(() => this.gameLoop(), 20);
    }
  }

  showLoseMessage() {
    let xCenter = GAME_WIDTH / 4;
    let yCenter = GAME_HEIGHT / 2;

    this.loseText = new Text(gameApp, xCenter, yCenter);
    this.playAgainText = new Text(gameApp, xCenter, yCenter + 30);

    this.loseText.update('You lose!');
    this.playAgainText.update('Press any key to play again');
  }

  removeLoseMessage() {
    this.loseText.update('');
    this.playAgainText.update('');
  }

  playAgain() {
    document.addEventListener('keydown', () => {
      this.removeLoseMessage();
      this.removeEnemies();
      this.gameLoop();
    }, {once: true});

  }

  isPlayerDead() {
    return this.enemies.some(enemy =>
       enemy.x === this.player.x && (enemy.y + ENEMY_HEIGHT) > this.player.y
    );
  }
}
