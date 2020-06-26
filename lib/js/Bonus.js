class Bonus extends TopdownEntity {
  constructor() {
    let randomLane =  Math.floor((Math.random() * 4));

    super(randomLane, BONUS_WIDTH, BONUS_HEIGHT);

    this.domElement.src = BACON_BONUS;
    this.domElement.width = BONUS_WIDTH;
    this.domElement.height = BONUS_HEIGHT;

    this.speed = 1;
  }

  update() {
    this.y = this.y + 5 * this.speed;
    this.domElement.style.top = `${this.y}px`;

    if (this.y > GAME_HEIGHT - PLAYER_HEIGHT) {
      this.destroy();
    }
  }
}
