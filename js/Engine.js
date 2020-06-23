class Engine {
  constructor(theRoot) {
    this.root = theRoot;
    this.player = new Player(this.root);
    this.enemies = [];

    addBackground(this.root);
    startSoundTrack();
  }

  removePlayerMovement() {
    document.removeEventListener('keydown', keydownHandler);
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
      this.removePlayerMovement();
      this.playAgain();
    }
    else {
      setTimeout(() => this.gameLoop(), 20);
    }
  }

  playAgain() {
    let titleText = new Text(gameApp, GAME_WIDTH / 4, GAME_HEIGHT / 2);
    titleText.update('You lose!');
  }

  isPlayerDead() {
    return this.enemies.some(enemy =>
       enemy.x === this.player.x && (enemy.y + ENEMY_HEIGHT) > this.player.y
    );
  }
}
