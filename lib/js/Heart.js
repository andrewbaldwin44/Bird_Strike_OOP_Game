class Heart extends Entity {
  constructor(originObject, width = HEART_WIDTH, height = HEART_HEIGHT) {
    super(originObject.x, originObject.y, HEART, width, height);

    this.width = width;
    this.height = height;
  }

  destroy() {
    gameApp.removeChild(this.domElement);
    this.destroyed = true;
  }
}
