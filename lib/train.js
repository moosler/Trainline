class Train {
  constructor(pos, dim, track, color = "0xe74c3c") {
    this.pos = new Vector(pos);
    this.velocity = new Vector(1, 1);
    this.acceleration = new Vector(0, 0);
    this.maxspeed = 10;
    this.dimension = dim;
    this.track = track;
    this.color = color;
    this.graphic = {};
    this.tileIndex = 0;
    this.speed = 10;
    this.tick = 0;
    this.curLine = {}; //the current Bezier Graphic where the train is
    this.posBefore = new Vector();
    this.init();
  }
  init() {
    let graphics = new PIXI.Graphics();
    graphics.beginFill(this.color);
    // graphics.drawCircle(this.pos.x, this.pos.y, this.pos.r);
    graphics.drawRect(
      this.pos.x,
      this.pos.y,
      this.dimension.x,
      this.dimension.y
    );
    graphics.pivot.x = graphics.width / 2;
    graphics.pivot.y = graphics.height / 2;
    graphics.endFill();
    this.graphic = graphics;
  }
  getTile() {
    if (this.tileIndex < this.track.route.length) {
      let track = this.track.route[this.tileIndex];
      this.tileIndex++;
      return track;
    }
    return false;
  }
  step() {
    let tick = this.getTicksPerTile();
    //change tile
    if (tick == 0) {
      let tile = this.getTile();
      //remove train
      if (tile === false) {
        this.destroy();
        return false;
      }
      this.curLine = tile.getLine();
    }
    this.update();
    return true;
  }
  /**refactor */
  move(pos) {
    // this.velocity.add(this.acceleration);
    console.log("newPos: " + pos.x, pos.y);
    this.velocity.set(pos);
    this.velocity.sub(this.posBefore);
    this.velocity.normalize();
    // this.posBefore.sub(pos);
    // console.log( this.posBefore);
    // this.posBefore.normalize();
    console.log(this.velocity);
    this.pos.add(this.velocity);
    this.velocity.limit(this.maxspeed);

    //rock example
    // translate(this.pos.x, this.pos.y);
    // rotate(this.vel.heading());

    // var angle = this.velocity.heading() + Math.PI / 2; //rotate 90 degree
    var angle = this.velocity.heading();
    this.graphic.x = this.pos.x;
    this.graphic.y = this.pos.y;
    this.graphic.rotation = -angle;
    // this.pos.rotate(angle);
    // translate(this.position.x, this.position.y);
    // rotate(angle);
  }
  update() {
    let tick = this.getTicksPerTile();
    let time = map(tick, 0, this.speed, 0, 1);
    let pos = this.curLine.getPos(time);
    this.updateGraphic(pos);
    // this.move(pos);
    this.posBefore.set(pos);
    this.tick++;
  }
  updateGraphic(pos) {
    this.graphic.x = pos.x;
    this.graphic.y = pos.y;
    let angle = pos.h + Math.PI / 2; //rotate 90 degree
    this.graphic.rotation = angle;
  }
  getTicksPerTile() {
    return this.tick % this.speed;
  }
  destroy() {
    this.graphic.destroy(true);
  }
}
