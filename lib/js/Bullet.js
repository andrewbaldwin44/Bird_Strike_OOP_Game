class Bullet extends Entity {
  constructor(originObject, originObjectWidth, originObjectHeight, image) {
    let initialLeft = originObject.x + (originObjectWidth / 2) - 10;
    let initialTop = originObject.y + originObjectHeight;

    super(initialLeft, initialTop, image, BULLET_WIDTH, BULLET_HEIGHT);

    this.domElement.zIndex = -1;
    this.destroyed = false;
  }

  destroy() {
    if (!this.destroyed) {
      gameApp.removeChild(this.domElement);
      this.destroyed = true;
    }
  }

  update(directionY = 1, directionX = 0) {
    this.y = this.y + (BULLET_OFFSET * directionY);
    this.x = this.x + directionX;
    
    this.domElement.style.top = `${this.y}px`;
    this.domElement.style.left = `${this.x}px`;

    if (this.y <= 0 || this.y > GAME_HEIGHT || this.x >= GAME_WIDTH - GAME_PADDING ||
        this.x <= 0) {
      this.destroy();
    }
  }
}
