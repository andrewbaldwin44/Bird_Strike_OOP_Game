class Boss extends Enemy {
  constructor() {
    let middle_lane = 0.5;
    super(middle_lane, enemy_boss_image, null, ENEMY_BOSS_WIDTH, ENEMY_BOSS_HEIGHT);
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
  }
}
