class Bonus extends TopdownEntity {
  constructor() {
    let randomLane =  (Math.random() * LANES);

    super(randomLane, BONUS_DEFAULT_IMAGE,
          BONUS_WIDTH, BONUS_HEIGHT);

    this.speed = (Math.random() * BONUS_MAX_SPEED) + BONUS_MIN_SPEED;
  }

  collected() {
    bacon++;
    this.destroy();
    CHOMP_SOUND.currentTime = 0;
    CHOMP_SOUND.play();
  }

  update() {
    this.y = this.y + BONUS_MOVEMENT * this.speed;
    this.domElement.style.top = `${this.y}px`;

    if (this.y > GAME_HEIGHT - PLAYER_HEIGHT) {
      this.destroy();
    }
  }
}
