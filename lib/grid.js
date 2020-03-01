class Grid {
  constructor(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.xWidth = this.width / x;
    this.yHeight = this.height / y;
    this.tiles = this.init();
  }
  init() {
    var x = new Array(this.x);
    for (var i = 0; i < x.length; i++) {
      x[i] = new Array(this.y);
    }
    return x;
  }
  drawGrid() {
    let style = {
      color: "black",
      width: 1,
      alpha: 0.5
    };
    let pos = {};
    const container = new PIXI.Container();

    pos.y1 = 0;
    pos.x2 = 0;
    for (let i = 0; i < this.x; i++) {
      pos.x1 = i * this.xWidth;
      pos.y2 = this.height;
      var line = drawLine(pos, style);
      container.addChild(line);
    }
    pos.x1 = 0;
    pos.y2 = 0;
    for (let i = 0; i < this.y; i++) {
      pos.y1 = i * this.yHeight;
      pos.x2 = this.width;
      var line = drawLine(pos, style);
      container.addChild(line);
    }
    return container;
  }
}
