class TopdownEntity {
  constructor(entityLane, entityWidth, entityHeight) {
    this.root = gameApp;
    this.destroyed = false;

    this.x = entityLane * entityWidth;
    this.y = -entityHeight;

    this.domElement = document.createElement('img');
    this.domElement.style.position = 'absolute';
    this.domElement.style.zIndex = 5;
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = `${this.y}px`;

    this.root.appendChild(this.domElement);
  }

  increaseSpeed(startTime) {
    let currentTime = new Date().getTime();
    let secondsElapsed = (currentTime - startTime) / 1000;

    this.speed += secondsElapsed * 0.0005;
  }

  destroy() {
    if (!this.destroyed) {
      this.root.removeChild(this.domElement);
      this.destroyed = true;
    }
  }
}
