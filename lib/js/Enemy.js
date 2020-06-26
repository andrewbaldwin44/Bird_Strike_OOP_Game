class Enemy extends TopdownEntity {
  constructor(enemySpot) {
    super(enemySpot, ENEMY_WIDTH, ENEMY_HEIGHT);

    this.spot = enemySpot;

    this.createSprite();
    this.domElement.height = ENEMY_HEIGHT;
    this.domElement.width = ENEMY_WIDTH;

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

  update() {
    let randomStartOffset =
        Math.floor(Math.random() * (25 - 20) + 20);

    this.y = this.y + randomStartOffset * this.speed;
    this.domElement.style.top = `${this.y}px`;

    if (this.y > GAME_HEIGHT - PLAYER_HEIGHT) {
      this.destroy();
      this.sprite.destroy();
    }
  }
}
