class TopdownEntity extends Entity {
  constructor(entityLane, image, entityWidth, entityHeight) {
    let x = entityLane * entityWidth;
    let y = -entityHeight;

    super(x, y, image, x, y, entityWidth, entityHeight);

    this.destroyed = false;
  }

  increaseSpeed(secondsElapsed) {
    this.speed += secondsElapsed * 0.0005;
  }

  destroy() {
    gameApp.removeChild(this.domElement);
    this.destroyed = true;
  }
}
