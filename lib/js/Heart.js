class Heart extends Entity {
  constructor(originObject, width, height) {
    let initialX = originObject.x + width / 2;
    let initialY = originObject.y + height / 2;

    super(initialX, initialY, HEART, width, height);

    this.width = width;
    this.height = height;
  }

  collect(player) {
    if (player.lives < 5) {
      HEART_SOUND.currentTime = 0;
      HEART_SOUND.play();
      player.lives += 1;
      player.fillLivesContainer();
    }
    if (this.width > HEART_WIDTH && player.lives < 5) {
        FULL_HEART_SOUND.currentTime = 0;
        FULL_HEART_SOUND.play();
        player.lives = 5;
        player.fillLivesContainer();
    }
  }

  destroy() {
    gameApp.removeChild(this.domElement);
    this.destroyed = true;
  }
}
