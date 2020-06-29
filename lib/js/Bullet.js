class Bullet extends Entity {
  constructor(originObject, originObjectWidth, originObjectHeight, image) {
    let initialLeft = originObject.x + (originObjectWidth / 2) - 10;
    let initialTop = originObject.y + originObjectHeight;

    super(originObject.x, originObject.y,
          image, initialLeft, initialTop,
          BULLET_WIDTH, BULLET_HEIGHT);

    this.domElement.zIndex = -1;
    this.destroyed = false;
  }

  destroy() {
    if (!this.destroyed) {
      gameApp.removeChild(this.domElement);
      this.destroyed = true;
    }
  }

  update(direction = 1) {
    this.y = this.y + (BULLET_OFFSET * direction);
    this.domElement.style.top = `${this.y}px`;

    if (this.y <= 0) {
      this.destroy();
    }
  }
}
