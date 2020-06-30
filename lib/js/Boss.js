class Boss extends Enemy {
  constructor() {
    super(ENEMY_BOSS_LANE, 'boss', enemy_boss_image, null,
          ENEMY_BOSS_WIDTH, ENEMY_BOSS_HEIGHT);

    this.lives = boss_lives;
    this.rotate = 0;
    this.rotation = 0.5;
    this.bullet_rotate = 0;
    this.bullet_rotation = 0.1;
  }

  updateBullets() {
    this.bullets.forEach(bullet => {
      bullet.update(1, this.bullet_rotate);

      this.bullet_rotate += this.bullet_rotation;

      if (this.bullet_rotate >= 10) this.bullet_rotation = -0.1;
      if (this.bullet_rotate <= -10) this.bullet_rotation = 0.1;
    });
  }

  shoot() {
    this.bullets.push(new Bullet(this, ENEMY_BULLET_OFFSET,
                                 ENEMY_BOSS_BULLET_OFFSET_Y,
                                 enemy_bullet_image));

    this.bullets.push(new Bullet(this, ENEMY_BOSS_BULLET_OFFSET_X,
                                 ENEMY_BOSS_BULLET_OFFSET_Y,
                                 enemy_bullet_image));
  }

  update() {
    if (this.y < BOSS_Y_POS) {
      this.y = this.y + 2;
      this.domElement.style.top = `${this.y}px`;
    }
    else {
      if (this.rotate > 30) this.rotation = -0.5;
      if (this.rotate < -30) this.rotation = 0.5;

      this.rotate += this.rotation;
      this.domElement.style.transform = `rotate(${this.rotate}deg)`;
    }
  }
}
