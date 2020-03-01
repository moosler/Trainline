class Tile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.type = "";
    this.text = "";
    this.element = null;
  }
}

class Rail {
  constructor(x1, y1, x2, y2) {
    this.style = {
      color: "0x624A2E",
      width: 10,
      alpha: 1
    };
    this.pos = {
      x1: x1,
      x2: x2,
      y1: y1,
      y2: y2
    };
  }
}

class Train {
  constructor(pos, color = "0xe74c3c") {
    this.pos = pos;
    this.color = color;
    this.container = new PIXI.Container();
    this.init();
  }
  init() {
    var graphics = new PIXI.Graphics();
    graphics.beginFill(this.color);
    graphics.drawCircle(this.pos.x, this.pos.y, this.pos.r);
    graphics.endFill();
    this.container.addChild(graphics);
  }
}
