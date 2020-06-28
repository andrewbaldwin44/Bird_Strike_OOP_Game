class TopdownEntity extends Entity {
  constructor(entityLane, image, entityWidth, entityHeight) {
    let x = entityLane * entityWidth;
    let y = -entityHeight;

    super(x, y, image, x, y, entityWidth, entityHeight);

    this.destroyed = false;
  }

  increaseSpeed(startTime) {
    let currentTime = new Date().getTime();
    let secondsElapsed = (currentTime - startTime) / 1000;

    this.speed += secondsElapsed * 0.0005;
  }

  destroy() {
    gameApp.removeChild(this.domElement);
    this.destroyed = true;
  }
}
