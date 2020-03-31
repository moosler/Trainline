class Station {
  constructor(pos, mid = null, name = "", color = 0, orient) {
    this.style = {
      color: COLORS[color],
      width: 10,
      alpha: 1
    };
    this.pos = pos;
    this.mid = mid;
    this.name = name;
    this.orientation = orient;
    this.line = {};
    this.container = new PIXI.Container();
    this.graphic = new PIXI.Graphics();
    this.init();
  }
  init() {
    let offset = { x: this.pos.width / 6, y: this.pos.height / 6 };
    // this.graphic.lineStyle(gridStyle);
    // this.graphic.beginFill("0xffffff", 1);
    // this.graphic.drawRect(
    //   this.pos.x + offset.x,
    //   this.pos.y + offset.y,
    //   this.pos.width - offset.x * 2,
    //   this.pos.height - offset.y * 2
    // );
    // this.graphic.endFill();

    let sprite;
    sprite = new PIXI.Sprite(textureId["station.png"]);
    sprite.rotation = Math.PI * this.orientation * 0.5;
    sprite.rotation -= Math.PI * 2 * 0.5;
    sprite.width = this.pos.width;
    sprite.height = this.pos.height;
    sprite.anchor.set(0.5);
    let x = this.mid.x;
    let y = this.mid.y;
    sprite.position.set(x, y);
    this.graphic = sprite;

    this.graphic.tint = this.style.color;
    this.container.addChild(this.graphic);
  }
}
