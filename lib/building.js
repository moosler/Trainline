class Station {
  constructor(pos, mid = null, name = "") {
    this.style = {
      color: "0xe74c3c",
      width: 10,
      alpha: 1
    };
    this.pos = pos;
    this.mid = mid;
    this.name = name;
    this.line = {};
    this.container = new PIXI.Container();
    this.graphic = new PIXI.Graphics();
    this.init();
  }
  init() {
    let offset = { x: this.pos.width / 6, y: this.pos.height / 6 };
    this.graphic.lineStyle(gridStyle);
    this.graphic.beginFill("0xffffff", 1);
    this.graphic.drawRect(
      this.pos.x + offset.x,
      this.pos.y + offset.y,
      this.pos.width - offset.x * 2,
      this.pos.height - offset.y * 2
    );
    this.graphic.endFill();
    this.graphic.tint = this.style.color;
    this.container.addChild(this.graphic);
  }
}
