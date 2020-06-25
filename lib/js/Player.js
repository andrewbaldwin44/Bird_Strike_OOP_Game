class Player {
  constructor() {
    this.x = 2 * PLAYER_WIDTH;
    this.y = GAME_HEIGHT - PLAYER_HEIGHT - 10;

    this.lives = 3;

    this.domElement = document.createElement('img');
    this.setImage(PLAYER_IMAGE_DEFAULT);
    this.domElement.style.position = 'absolute';
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = ` ${this.y}px`;
    this.domElement.style.zIndex = '10';
    gameApp.appendChild(this.domElement);
  }

  setImage(image, element = this.domElement) {
    element.src = image;
  }

  setLifeImage() {
    let lifeImage = PLAYER_IMAGE_HAPPY;
    if (this.lives == 2) lifeImage = PLAYER_IMAGE_DEFAULT;
    else if (this.lives == 1) lifeImage = PLAYER_IMAGE_SAD;

    [...this.livesContainer.children].forEach(life => {
      this.setImage(lifeImage, life);
    });
  }

  changeImageDirection() {
    if (keysPressed['ArrowRight']) {
      this.setImage(PLAYER_IMAGE_HAPPY);
      this.domElement.style.transform = 'scale(-1, 1)';
    }
    else if (keysPressed['ArrowLeft']) {
      this.setImage(PLAYER_IMAGE_DEFAULT);
      this.domElement.style.transform = 'none';
    }
  }

  fillLivesContainer() {
    for (let i = 0; i < this.lives; i++) {
      let life = document.createElement('img');
      life.alt = 'life';
      life.classList.add('life');

      this.livesContainer.appendChild(life);
    }
    this.setLifeImage();
  }

  displayLives() {
    this.livesContainer = document.createElement('div');
    this.livesContainer.classList.add('lives-container');

    this.fillLivesContainer();

    gameApp.appendChild(this.livesContainer);
  }

  loseLife() {
    this.lives -= 1;
    this.livesContainer.firstChild.remove();
    this.setLifeImage();
  }

  toggleInvincibility() {
    this.invicible = true;
    this.domElement.classList.toggle('lost-life');
    this.domElement.style.animationDuration = `${INVINCIBLE_DURATION}ms`;

    setTimeout(() => {
      this.invicible = false;
      this.domElement.classList.toggle('lost-life');
    }, INVINCIBLE_DURATION);
  }

  movePlayer() {
    this.changeImageDirection();
    this.x = calculateMovement(this.x, 'ArrowLeft', 'ArrowRight', MAX_WIDTH);
    this.y = calculateMovement(this.y, 'ArrowUp', 'ArrowDown', MAX_HEIGHT);

    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = `${this.y}px`;
  }
}
