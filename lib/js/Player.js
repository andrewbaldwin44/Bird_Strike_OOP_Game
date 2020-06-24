class Player {
  constructor(root) {
    this.x = 2 * PLAYER_WIDTH;
    this.y = GAME_HEIGHT - PLAYER_HEIGHT - 10;

    this.lives = 3;

    this.domElement = document.createElement('img');
    this.showAlive();
    this.domElement.style.position = 'absolute';
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = ` ${this.y}px`;
    this.domElement.style.zIndex = '10';
    root.appendChild(this.domElement);
  }

  showAlive() {
    this.domElement.src = `${IMAGE_ROOT}/player.png`;
  }

  showDead() {
    this.domElement.src = `${IMAGE_ROOT}/playerdied.png`;
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

    setTimeout(() => {
      this.invicible = false;
      this.domElement.classList.toggle('lost-life');
    }, 1000);
  }

  movePlayer() {
    this.x = calculateMovement(this.x, 'ArrowLeft', 'ArrowRight', MAX_WIDTH);
    this.y = calculateMovement(this.y, 'ArrowUp', 'ArrowDown', MAX_HEIGHT);

    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = `${this.y}px`;
  }
}
