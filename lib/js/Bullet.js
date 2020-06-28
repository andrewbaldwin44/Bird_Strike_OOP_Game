class Bullet {
  constructor(originObject, originObjectWidth, originObjectHeight) {
    this.x = originObject.x;
    this.y = originObject.y;

    let bulletOriginX = originObject.x + (originObjectWidth / 2) - 10;
    let bulletOriginY = originObject.y + originObjectHeight;

    this.domElement = document.createElement('img');
    this.domElement.classList.add('bullets');
    this.domElement.src = PLAYER_BULLET;
    this.domElement.style.left = `${bulletOriginX}px`;
    this.domElement.style.top = ` ${bulletOriginY}px`;
    this.domElement.style.width = `${BULLET_WIDTH}px`;
    this.domElement.style.height = `${BULLET_HEIGHT}px`;

    this.destroyed = false;

    gameApp.appendChild(this.domElement);

    this.speed = 1;
  }

  destroy() {
    if (!this.destroyed) {
      gameApp.removeChild(this.domElement);
      this.destroyed = true;
    }
  }

  update() {
    let randomStartOffset =
        Math.floor(Math.random() *
        (ENEMY_SPEED_MAX - ENEMY_SPEED_MIN) + ENEMY_SPEED_MIN);

    this.y = this.y - randomStartOffset * this.speed;
    this.domElement.style.top = `${this.y}px`;

    if (this.y <= 0) {
      this.destroy();
    }
  }
}
