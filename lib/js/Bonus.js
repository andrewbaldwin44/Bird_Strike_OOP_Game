class Bonus extends TopdownEntity {
  constructor() {
    let randomLane =  (Math.random() * LANES);

    super(randomLane, BONUS_WIDTH, BONUS_HEIGHT);

    this.domElement.src = BACON_BONUS;
    this.domElement.width = BONUS_WIDTH;
    this.domElement.height = BONUS_HEIGHT;

    this.speed = (Math.random() * BONUS_MAX_SPEED) + BONUS_MIN_SPEED;
  }

  update() {
    this.y = this.y + BONUS_MOVEMENT * this.speed;
    this.domElement.style.top = `${this.y}px`;

    if (this.y > GAME_HEIGHT - PLAYER_HEIGHT) {
      this.destroy();
    }
  }
}
