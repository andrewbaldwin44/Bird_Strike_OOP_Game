class Enemy {
  constructor(enemySpot) {
    this.root = gameApp;
    this.spot = enemySpot;

    this.x = enemySpot * ENEMY_WIDTH;
    this.y = -ENEMY_HEIGHT;
    this.destroyed = false;

    this.domElement = document.createElement('img');
    this.createSprite();
    this.domElement.height = ENEMY_HEIGHT;
    this.domElement.width = ENEMY_WIDTH;
    this.domElement.style.position = 'absolute';
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = `${this.y}px`;
    this.domElement.style.zIndex = 5;

    this.root.appendChild(this.domElement);
    this.speed = Math.random() / 2 + 0.25;
  }

  getEnemyImages() {
    let enemyImages = [];
    for (let i = 1; i <= 12; i++) {
      enemyImages.push(`${ENEMY_SPRITES}/enemy${i}.png`);
    }

    return enemyImages;
  }

  createSprite() {
    let enemyImages = this.getEnemyImages();
    this.sprite = new Sprite(enemyImages);
    this.sprite.render(this.domElement, 200);
  }

  destroy() {
    if (!this.destroyed) {
      this.root.removeChild(this.domElement);
      this.destroyed = true;
      this.sprite.destroy();
    }
  }

  increaseSpeed(startTime) {
    let currentTime = new Date().getTime();
    let secondsElapsed = (currentTime - startTime) / 1000;

    this.speed += secondsElapsed * 0.0005;
  }

  update() {
    let randomStartOffset =
        Math.floor(Math.random() * (25 - 20) + 20);

    this.y = this.y + randomStartOffset * this.speed;
    this.domElement.style.top = `${this.y}px`;

    if (this.y > GAME_HEIGHT - PLAYER_HEIGHT) {
      this.destroy();
    }
  }
}
