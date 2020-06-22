class Engine {
  constructor(theRoot) {
    this.root = theRoot;
    this.player = new Player(this.root);
    this.enemies = [];

    addBackground(this.root);
  }

  gameLoop() {
    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
    }

    let timeDiff = new Date().getTime() - this.lastFrame;

    this.lastFrame = new Date().getTime();

    this.enemies.forEach((enemy) => {
      enemy.update(timeDiff);
    });

    this.enemies = this.enemies.filter((enemy) => {
      return !enemy.destroyed;
    });

    while (this.enemies.length < MAX_ENEMIES) {
      const spot = nextEnemySpot(this.enemies);
      this.enemies.push(new Enemy(this.root, spot));
    }

    if (this.isPlayerDead()) {
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
    return this.enemies.some(enemy => {
      if (enemy.x === this.player.x && (enemy.y + ENEMY_HEIGHT) > this.player.y) {
        return true;
      }
    });
  }
}
