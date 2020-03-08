class Train {
  constructor(pos, route, color = "0xe74c3c") {
    this.pos = pos;
    this.route = route;
    this.color = color;
    this.graphic = {};
    this.currentTileIndex = 0;
    this.speed = 20;
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
    if (this.currentTileIndex < this.route.length) {
      let track = this.route[this.currentTileIndex];
      let pos = { x: track.x, y: track.y };
      this.currentTileIndex++;
      return pos;
    }
    return false;
  }
  update(pos) {
    this.graphic.x = pos.x;
    this.graphic.y = pos.y;
  }
}
