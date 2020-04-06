class Player {
  constructor(name) {
    this.name = name;
    this.points = 0;
    this.missed = 0;
    this.selectedLevel = 0;
  }
  incPoint(points) {
    this.points += points;
  }
  incMissed(points) {
    this.missed += points;
  }
  getPoints() {
    return this.points;
  }
  reset() {
    this.points = 0;
    this.missed = 0;
  }
}
