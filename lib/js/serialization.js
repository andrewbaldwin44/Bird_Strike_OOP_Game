function serialize(score) {
  localStorage.setItem('highScore', JSON.stringify(score));
}

function deserialize() {
  if (localStorage.highScore) return JSON.parse(localStorage.highScore);
}
