class Score {
  constructor() {
    this.current_score = 0;
    this.score = new Text(gameApp, 60, 30);
    this.score.update(this.current_score);
  }

  updateScore() {
    this.current_score += 100;
    this.score.update(this.current_score);
  }
}
