class Enemy extends TopdownEntity {
  constructor(spot, type, image, speed, width = ENEMY_WIDTH, height = ENEMY_HEIGHT) {
    super(spot, image, width, height);

    this.type = type;
    this.spot = spot;
    this.bullets = [];

    if (type == 1) {
      ENEMY_1_SOUND.currentTime = 0;
      ENEMY_1_SOUND.play();
    }
    if (type == 2) this.shootBullets();

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
    EXPLOSION_SOUND.currentTime = 0;
    EXPLOSION_SOUND.play();
    this.domElement.height = EXPLOSION_HEIGHT;
    this.domElement.width = EXPLOSION_WIDTH;
    this.domElement.src = EXPLOSION;
    this.domElement.style.animationName = 'explode';
    this.domElement.style.animationDuration = `${EXPLOSION_DURATION}ms`;
    this.destroyed = true;
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
