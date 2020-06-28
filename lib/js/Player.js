class Player {
  constructor() {
    this.x = 2 * PLAYER_WIDTH;
    this.y = GAME_HEIGHT - PLAYER_HEIGHT - 10;

    this.lives = PLAYER_DEFAULT_LIVES;
    this.bullets = [];
    this.allowBullets = true;

    let bulletTimeout = setInterval(() => this.allowBullets = true, 500);

    this.domElement = document.createElement('img');
    this.domElement.src = PLAYER_DEFAULT;
    this.domElement.classList.add('player');
    this.domElement.style.width = PLAYER_WIDTH;
    this.domElement.style.height = PLAYER_HEIGHT;
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = ` ${this.y}px`;

    gameApp.appendChild(this.domElement);
  }

  setImage(image, element = this.domElement) {
    element.src = image;
  }

  changeImageDirection() {
    if (keysPressed['ArrowRight']) {
      this.domElement.style.transform = 'scale(-1, 1)';
    }
    else if (keysPressed['ArrowLeft']) {
      this.domElement.style.transform = 'none';
    }
  }

  fillLivesContainer() {
    for (let i = 0; i < this.lives; i++) {
      let life = document.createElement('img');
      life.src = PLAYER_DEFAULT;
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
    this.invincible = true;
    this.domElement.classList.toggle('lost-life');
    this.domElement.style.animationDuration = `${INVINCIBLE_DURATION}ms`;

    setTimeout(() => {
      this.invincible = false;
      this.domElement.classList.toggle('lost-life');
    }, INVINCIBLE_DURATION);
  }

  removeDestroyedBullets() {
    this.bullets = this.bullets.filter(bullet => !bullet.destroyed);
  }

  updateBullets() {
    this.bullets.forEach(bullet => {
      bullet.update()
    });
  }

  shootBullets() {
    if (keysPressed['Space']) {
      if (this.allowBullets) {
        this.bullets.push(new Bullet(this, PLAYER_WIDTH, PLAYER_HEIGHT));
        this.allowBullets = false;
      }
    }

    this.removeDestroyedBullets();
    this.updateBullets();
  }

  movePlayer() {
    this.changeImageDirection();
    this.x = calculateMovement(this.x, 'ArrowLeft', 'ArrowRight', MAX_WIDTH);
    this.y = calculateMovement(this.y, 'ArrowUp', 'ArrowDown', MAX_HEIGHT);

    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = `${this.y}px`;
  }
}
