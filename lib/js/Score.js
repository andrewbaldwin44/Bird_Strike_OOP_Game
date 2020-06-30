class Score {
  constructor() {
    this.current_score = 0;
    this.score = new Text(gameApp, 60, 30);
    this.score.update(this.current_score);
    this.score.addContainerClass('score');
  }

  update(secondsElapsed, amount = SCORE_INCREMENT) {
    this.current_score += amount + (secondsElapsed * 10);
    this.score.update(this.current_score);
  }
}
