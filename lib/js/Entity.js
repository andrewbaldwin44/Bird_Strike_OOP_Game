class Entity {
  constructor(x, y, image, initialLeft, initialTop, width, height) {
    this.x = x;
    this.y = y;

    this.domElement = document.createElement('img');
    this.domElement.src = image;
    this.domElement.style.position = 'absolute';
    this.domElement.style.zIndex = 10;
    this.domElement.style.left = `${initialLeft}px`;
    this.domElement.style.top = ` ${initialTop}px`;
    this.domElement.style.width = `${width}px`;
    this.domElement.style.height = `${height}px`;

    gameApp.appendChild(this.domElement);
  }
}
