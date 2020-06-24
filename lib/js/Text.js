class Text {
  constructor(root, xPos, yPos) {
    this.div = document.createElement('div');
    this.text = document.createElement('p');

    this.div.classList.add('text-container');
    this.text.classList.add('text');

    this.div.width = GAME_WIDTH;
    this.div.style.left = xPos;
    this.div.style.top = yPos;
    this.div.style.transform = 'translate(-50%, -50%)';


    this.div.appendChild(this.text);
    root.appendChild(this.div);
  }

  addContainerClass(className) {
    this.div.classList.add(className);
  }

  update(txt) {
    this.text.textContent = txt;
  }
}
