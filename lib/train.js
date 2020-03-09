class Train {
  constructor(pos, route, color = "0xe74c3c") {
    this.pos = pos;
    this.route = route;
    this.color = color;
    this.graphic = {};
    this.tileIndex = 0;
    this.speed = 10;
    this.tick = 0;
    this.curLine = {}; //the current Bezier Graphic where the train is
    this.init();
  }
  init() {
    let graphics = new PIXI.Graphics();
    graphics.beginFill(this.color);
    // graphics.drawCircle(this.pos.x, this.pos.y, this.pos.r);
    graphics.drawRect(this.pos.x, this.pos.y, this.pos.r, this.pos.r * 2);
    graphics.pivot.x = graphics.width / 2;
    graphics.pivot.y = graphics.height / 2;
    graphics.endFill();
    this.graphic = graphics;
  }
  getTile() {
    if (this.tileIndex < this.route.length) {
      let track = this.route[this.tileIndex];
      // let pos = { x: track.x, y: track.y };
      this.tileIndex++;
      return track;
    }
    return false;
  }
  step(){
    let tick = this.getTicksPerTile();
    //change tile
    if(tick == 0){
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
  update() {
    let tick = this.getTicksPerTile();
    let time = map(tick, 0, this.speed, 0, 1);
    let pos = this.curLine.getPos(time);
    this.updateGraphic(pos);
    this.tick++;
  }
  updateGraphic(pos){
    this.graphic.x = pos.x;
    this.graphic.y = pos.y;
    let angle = pos.h + (Math.PI / 2); //rotate 90 degree
    this.graphic.rotation = angle;
  }
  getTicksPerTile(){
    return this.tick % this.speed;
  }
  destroy() {
    this.graphic.destroy(true);
  }
}
