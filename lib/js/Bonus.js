class Bonus extends TopdownEntity {
  constructor(bonusSpot) {
    super();

    let randomLane =  Math.floor((Math.random() * 4));
    this.x = randomLane * ENEMY_WIDTH;
    this.y = -ENEMY_HEIGHT;

    this.domElement.src = BACON_BONUS;
    this.domElement.height = ENEMY_HEIGHT;
    this.domElement.width = ENEMY_WIDTH;
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = `${this.y}px`;

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
