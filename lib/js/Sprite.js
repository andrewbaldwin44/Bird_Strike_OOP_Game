class Sprite {
  constructor(images) {
    this.sprite = images;
  }

  render(element) {
    element.src = this.sprite[0];

    let index = 1;
    let render =
      setInterval(() => {
        element.src = this.sprite[index];
        if (index == this.sprite.length - 1) index = 0;
        index++;
      }, 200);
  }
}
