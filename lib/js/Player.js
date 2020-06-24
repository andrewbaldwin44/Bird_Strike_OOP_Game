class Player {
  constructor(root) {
    this.x = 2 * PLAYER_WIDTH;
    this.y = GAME_HEIGHT - PLAYER_HEIGHT - 10;

    this.lives = 3;

    this.domElement = document.createElement('img');
    this.domElement.src = './assets/images/player.png';
    this.domElement.style.position = 'absolute';
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = ` ${this.y}px`;
    this.domElement.style.zIndex = '10';
    root.appendChild(this.domElement);
  }

  displayLives() {
    this.livesContainer = document.createElement('div');
    this.livesContainer.classList.add('lives-container');

    for (let i = 0; i < 3; i++) {
      let life = document.createElement('img');
      life.src = './assets/images/player.png';
      life.alt = 'life';
      life.classList.add('life');

      this.livesContainer.appendChild(life);
    }

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

  moveLeft() {
    if (this.x > 0) {
      this.x = this.x - PLAYER_WIDTH;
    }

    this.domElement.style.left = `${this.x}px`;
  }

  moveRight() {
    if (this.x + PLAYER_WIDTH < GAME_WIDTH) {
      this.x = this.x + PLAYER_WIDTH;
    }
    this.domElement.style.left = `${this.x}px`;
  }
}
