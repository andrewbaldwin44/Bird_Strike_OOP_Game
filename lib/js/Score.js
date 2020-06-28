class Score {
  constructor() {
    this.current_score = 0;
    this.score = new Text(gameApp, 60, 30);
    this.score.update(this.current_score);
    this.score.addContainerClass('score');
  }

  update(amount = score_increment) {
    this.current_score += amount;
    this.score.update(this.current_score);
  }
}
