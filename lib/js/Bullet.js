class Bullet extends Entity {
  constructor(originObject, originObjectWidth, originObjectHeight) {
    let initialLeft = originObject.x + (originObjectWidth / 2) - 10;
    let initialTop = originObject.y + originObjectHeight;

    super(originObject.x, originObject.y,
          player_bullet_image,
          initialLeft, initialTop,
          BULLET_WIDTH, BULLET_HEIGHT);

    this.destroyed = false;
  }

  destroy() {
    if (!this.destroyed) {
      gameApp.removeChild(this.domElement);
      this.destroyed = true;
    }
  }

  update() {
    this.y = this.y - BULLET_OFFSET;
    this.domElement.style.top = `${this.y}px`;

    if (this.y <= 0) {
      this.destroy();
    }
  }
}
