class Train {
  constructor(pos, color = "0xe74c3c") {
    this.pos = pos;
    this.color = color;
    this.graphic = {};
    this.init();
  }
  init() {
    let graphics = new PIXI.Graphics();
    graphics.beginFill(this.color);
    // graphics.drawCircle(this.pos.x, this.pos.y, this.pos.r);
    graphics.drawRect(this.pos.x, this.pos.y, this.pos.r, this.pos.r * 2);

    graphics.endFill();
    this.graphic = graphics;
  }
}
