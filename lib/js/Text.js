class Text {
  constructor(root, xPos, yPos) {
    const div = document.createElement('div');
    const text = document.createElement('p');

    div.classList.add('text-container');
    text.classList.add('text');

    div.width = GAME_WIDTH;
    div.style.left = xPos;
    div.style.top = yPos;
    div.style.transform = 'translate(-50%, -50%)';


    div.appendChild(text);
    root.appendChild(div);

    this.domElement = text;
  }

  update(txt) {
    this.domElement.textContent = txt;
  }
}
