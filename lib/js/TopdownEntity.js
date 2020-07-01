class TopdownEntity extends Entity {
  constructor(entityLane, image, entityWidth, entityHeight) {
    let x = entityLane * entityWidth;
    let y = -entityHeight;

    super(x, y, image, entityWidth, entityHeight);

    this.destroyed = false;
  }

  increaseSpeed(secondsElapsed) {
    this.speed += secondsElapsed * 0.000005;
  }

  destroy() {
    if (!this.destroyed) {
      gameApp.removeChild(this.domElement);
      this.destroyed = true;
    }
  }
}
