class Player extends Entity {
  constructor() {
    let x = 2 * PLAYER_WIDTH;
    let y = GAME_HEIGHT - PLAYER_HEIGHT - GAME_PADDING_Y;

    super(x, y, player_default_image, PLAYER_WIDTH, PLAYER_HEIGHT);

    this.lives = PLAYER_DEFAULT_LIVES;
    this.bullets = [];
    this.allowBullets = true;

    let bulletTimeout = setInterval(() => this.allowBullets = true, PLAYER_SHOOT_SPEED);
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
    let heartsNeeded = this.lives - this.livesContainer.children.length;

    for (let i = 0; i < heartsNeeded; i++) {
      let life = document.createElement('img');
      life.src = player_lives_image;
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
      bullet.update(-1);
    });
  }

  shootBullets() {
    this.currentTime = new Date().getTime();
    if (!this.lastTime) this.lastTime = 0;

    let timeDifference = this.currentTime - this.lastTime;

    if (keysPressed['Space']) {
      if (timeDifference > 500 && this.allowBullets) {
        this.lastTime = this.currentTime;

        this.bullets.push(new Bullet(this, PLAYER_WIDTH,
                                     PLAYER_HEIGHT, player_bullet_image));
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
