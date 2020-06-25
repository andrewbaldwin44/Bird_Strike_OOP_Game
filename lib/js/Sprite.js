class Sprite {
  constructor(images) {
    this.sprite = images;
  }

  render(element, speed) {
    element.src = this.sprite[0];

    let index = 0;
    this.render =
      setInterval(() => {
        element.src = this.sprite[index];
        index++;
        if (index == this.sprite.length) index = 0;
      }, speed);
  }

  destroy() {
    clearInterval(this.render);
  }
}