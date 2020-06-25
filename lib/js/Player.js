class Player {
  constructor() {
    this.x = 2 * PLAYER_WIDTH;
    this.y = GAME_HEIGHT - PLAYER_HEIGHT - 10;

    this.lives = 3;

    this.domElement = document.createElement('img');
    this.setImage(PLAYER_IMAGE_LEFT);
    this.domElement.style.position = 'absolute';
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = ` ${this.y}px`;
    this.domElement.style.zIndex = '10';
    gameApp.appendChild(this.domElement);
  }

  setImage(image) {
    this.domElement.src = image;
  }

  changeImageDirection() {
    if (keysPressed['ArrowRight']) {
      this.setImage(PLAYER_IMAGE_RIGHT);
    }
    else if (keysPressed['ArrowLeft']) {
      this.setImage(PLAYER_IMAGE_LEFT);
    }
  }

  getPlayerImages() {
    let playerImages = [];
    for (let i = 1; i <= 2; i++) {
      playerImages.push(`${IMAGE_ROOT}/player_sprite/player${i}.png`);
    }

    return playerImages;
  }

  fillLivesContainer() {
    for (let i = 0; i < this.lives; i++) {
      let life = document.createElement('img');
      life.src = `${IMAGE_ROOT}/player.png`;
      life.alt = 'life';
      life.classList.add('life');

      this.livesContainer.appendChild(life);
    }
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
