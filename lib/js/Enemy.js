class Enemy extends TopdownEntity {
  constructor(spot, type, image, speed, width = ENEMY_WIDTH, height = ENEMY_HEIGHT) {
    super(spot, image, width, height);

    this.type = type;
    this.spot = spot;
    this.bullets = [];

    this.speed = speed;
  }

  removeBullets() {
    this.bullets.forEach(bullet => bullet.destroy());
    this.bullets = [];
  }

  removeDestroyedBullets() {
    this.bullets = this.bullets.filter(bullet => !bullet.destroyed);
  }

  updateBullets() {
    this.bullets.forEach(bullet => bullet.update());
  }

  shoot() {
    this.bullets.push(new Bullet(this, ENEMY_BULLET_OFFSET, ENEMY_HEIGHT,
                                 enemy_bullet_image));
  }

  shootBullets() {
    this.shoot();
    let shooting = setInterval(() => this.shoot(), enemy_shoot_speed);

    let update =
      setInterval(() => {
        if (this.destroyed) {
          this.removeBullets();
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
        (enemy_speed_max - enemy_speed_min) + enemy_speed_min);

    this.y = this.y + randomStartOffset * this.speed;
    this.domElement.style.top = `${this.y}px`;

    if (this.y > GAME_HEIGHT - PLAYER_HEIGHT) {
      this.destroy();
    }
  }
}
