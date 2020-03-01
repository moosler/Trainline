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
    let arr = [];
    for (var i = 0; i < this.x; i++) {
      arr[i] = [];
      for (var j = 0; j < this.y; j++) {
        arr[i][j] = new Tile(i, j);
      }
    }
    return arr;
  }
  drawElement(x, y) {
    let element = this.getElement(x, y);
    const container = new PIXI.Container();
    var line = drawLine(element.pos, element.style);
    container.addChild(line);
    return container;
  }
  getElement(x, y) {
    let tile = this.getTile(x, y);
    if (!tile.element) return undefined;
    let element = tile.element;
    return element;
  }
  getTile(x, y) {
    let tile = this.tiles[x][y];
    return tile;
  }
  setTile(x, y, name = "rail") {
    let tile = this.getTile(x, y);
    tile.type = name;
    let obj = undefined;
    if (name == "rail") obj = new Rail();
    tile.element = obj;
  }
  drawGrid() {
    let style = {
      color: "0x000000",
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
