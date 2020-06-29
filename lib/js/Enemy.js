class Enemy extends TopdownEntity {
  constructor(enemySpot, image, speed) {
    super(enemySpot, image, ENEMY_WIDTH, ENEMY_HEIGHT);

    this.spot = enemySpot;
    this.bullets = [];

    this.speed = speed;
  }

  removeDestroyedBullets() {
    this.bullets = this.bullets.filter(bullet => !bullet.destroyed);
  }

  updateBullets() {
    this.bullets.forEach(bullet => bullet.update());
  }

  shoot() {
    this.bullets.push(new Bullet(this,
                                 ENEMY_WIDTH - ENEMY_BULLET_OFFSET,
                                 ENEMY_HEIGHT + 2 * ENEMY_BULLET_OFFSET));
  }

  shootBullets() {
    this.shoot();
    let shooting = setInterval(() => this.shoot(), 1000);

    let update =
      setInterval(() => {
        if (this.destroyed) {
          clearInterval(update);
          clearInterval(shooting);
        }

        this.removeDestroyedBullets();
        this.updateBullets();
      }, 20)
  }

  explode() {
    this.domElement.height = 120;
    this.domElement.width = 100;
    this.domElement.src = EXPLOSION;
    this.domElement.style.animationName = 'explode';
    this.domElement.style.animationDuration = '200ms';
    this.destroyed = true;
    setTimeout(() => this.destroy(), 200);
  }

  hit() {
    this.explode();
  }

  update() {
    let randomStartOffset =
        Math.floor(Math.random() *
        (ENEMY_SPEED_MAX - ENEMY_SPEED_MIN) + ENEMY_SPEED_MIN);

    this.y = this.y + randomStartOffset * this.speed;
    this.domElement.style.top = `${this.y}px`;

    if (this.y > GAME_HEIGHT - PLAYER_HEIGHT) {
      this.destroy();
    }
  }
}
