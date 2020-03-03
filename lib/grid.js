class Grid {
  constructor(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = x; //number of columns
    this.y = y; //number of rows
    this.txt = null;
    this.xWidth = this.width / x;
    this.yHeight = this.height / y;
    this.tiles = this.init();
  }
  init() {
    let arr = [];
    for (var i = 0; i < this.x; i++) {
      arr[i] = [];
      for (var j = 0; j < this.y; j++) {
        let midpoint = this.getMidpoint(i, j)
        let txt = new Text(i + "|" + j, midpoint.x, midpoint.y);
        arr[i][j] = new Tile(i, j, midpoint, txt);
      }
    }
    return arr;
  }
  // drawElement(x, y) {
  //   let element = this.getElement(x, y);
  //   const container = new PIXI.Container();
  //   var line = drawLine(element.pos, element.style);
  //   container.addChild(line);
  //   return container;
  // }
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
  setTile(x, y, name = "railV") {
    let tile = this.getTile(x, y);
    tile.set(name, this.xWidth, this.yHeight);
  }
  getAllTiles() {
    const container = new PIXI.Container();
    for (let i = 0; i < this.x; i++) {
      for (let j = 0; j < this.y; j++) {
        let tile = this.getTile(i, j);
        container.addChild(tile.text);
        let element = tile.element;
        if (element) {
          container.addChild(element);
        }
      }
    }
    return container;
  }
  getMidpoint(x, y) {
    let pos = {
      x: x * this.xWidth + this.xWidth / 2,
      y: y * this.yHeight + this.yHeight / 2
    };
    return pos;
  }
  drawGrid() {
    let pos = {};
    const container = new PIXI.Container();

    pos.y1 = 0;
    pos.x2 = 0;
    for (let i = 0; i < this.x; i++) {
      pos.x1 = i * this.xWidth;
      pos.y2 = this.height;
      let line = new Line(pos, gridStyle);

      container.addChild(line);
    }
    pos.x1 = 0;
    pos.y2 = 0;
    for (let i = 0; i < this.y; i++) {
      pos.y1 = i * this.yHeight;
      pos.x2 = this.width;
      let line = new Line(pos, gridStyle);
      container.addChild(line);
    }
    return container;
  }
}
