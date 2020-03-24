class Player {
  constructor(name) {
    this.name = name;
    this.points = 0;
    this.missed = 0;
  }
  incPoint(points) {
    this.points += points;
  }
  incMissed(points) {
    this.missed += points;
  }
}
