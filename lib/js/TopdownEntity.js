class TopdownEntity {
  constructor() {
    this.root = gameApp;
    this.destroyed = false;

    this.domElement = document.createElement('img');
    this.domElement.style.position = 'absolute';
    this.domElement.style.zIndex = 5;

    this.root.appendChild(this.domElement);
  }

  destroy() {
    if (!this.destroyed) {
      this.root.removeChild(this.domElement);
      this.destroyed = true;
    }
  }
}
