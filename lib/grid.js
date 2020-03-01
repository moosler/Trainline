class Grid {
  constructor(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = x; //number of columns
    this.y = y; //number of rows
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
    tile.type = name;
    let obj = undefined;
    let mid = this.getMidpoint(x, y);
    if (name == "railV") {
      let x1 = mid.x;
      let y1 = y * this.yHeight;
      obj = new Rail(x1, y1, 0, this.yHeight);
    } else if (name == "railH") {
      let x1 = x * this.xWidth;
      let y1 = mid.y;
      obj = new Rail(x1, y1, this.xWidth, 0);
    } else if (name == "curveSW") {
      let x1 = x * this.xWidth;
      obj = new Rail(x1, mid.y, this.xWidth / 2, this.yHeight / 2);
    } else if (name == "curveNE") {
      let x1 = (x + 1) * this.xWidth;
      obj = new Rail(x1, mid.y, -this.xWidth / 2, -this.yHeight / 2);
    } else if (name == "curveSE") {
      let y1 = (y + 1) * this.yHeight;
      obj = new Rail(mid.x, y1, this.xWidth / 2, -this.yHeight / 2);
    } else if (name == "curveNW") {
      let y1 = (y + 1) * this.yHeight;
      let x1 = x * this.xWidth;
      obj = new Rail(x1, mid.y, this.xWidth / 2, -this.yHeight / 2);
    }
    tile.element = obj;
  }
  getAllTiles() {
    const container = new PIXI.Container();
    for (let i = 0; i < this.x; i++) {
      for (let j = 0; j < this.y; j++) {
        let tile = this.getTile(i, j);
        let mid = this.getMidpoint(i, j);
        let txt = new Text(i + "|" + j, mid.x, mid.y);
        container.addChild(txt.get());

        let element = tile.element;
        if (element) {
          let line = drawLine(element.pos, element.style);
          container.addChild(line);
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
