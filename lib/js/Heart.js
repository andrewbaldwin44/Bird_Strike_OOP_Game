class Heart extends Entity {
  constructor(originObject, width, height) {
    let initialX = originObject.x + width / 2;
    let initialY = originObject.y + height / 2;

    super(initialX, initialY, HEART, width, height);

    this.width = width;
    this.height = height;
  }

  destroy() {
    gameApp.removeChild(this.domElement);
    this.destroyed = true;
  }
}
