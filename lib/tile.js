class Tile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.type = "";
    this.element = null;
  }
}

class Rail {
  constructor() {
    this.style = {
      color: "0xff0000",
      width: 10,
      alpha: 1
    };
    this.pos = {
      x1: 10,
      x2: 100,
      y2: 10,
      y2: 100
    };
  }
  //   draw() {
  //     const container = new PIXI.Container();
  //     var line = drawLine(pos, style);
  //     container.addChild(line);
  //     return container;
  //   }
}
