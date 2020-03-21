class Grid {
  constructor(width, height, tiles, shift) {
    this.width = width;
    this.height = height;
    this.x = tiles.x; //number of columns
    this.y = tiles.y; //number of rows
    this.shift = shift;
    this.col = this.width / this.x;
    this.row = this.height / this.y;
    this.container = new PIXI.Container();
    this.tiles = this.init();
  }
  init() {
    let arr = [];
    for (var i = 0; i < this.x; i++) {
      arr[i] = [];
      for (var j = 0; j < this.y; j++) {
        let midpoint = this.getMidpoint(i, j);
        let txt = new Text(i + "|" + j, midpoint.x, midpoint.y, gridTextStyle);
        let pos = { x: i * this.col, y: j * this.row };
        let tile = (arr[i][j] = new Tile(
          i,
          j,
          pos,
          midpoint,
          this.col,
          this.row,
          txt
        ));
        this.container.addChild(tile.container);
      }
    }
    app.stage.addChild(this.container);
    this.container.position.set(this.shift.x, this.shift.y);
    return arr;
  }
  // drawElement(x, y) {
  //   let element = this.getElement(x, y);
  //   const container = new PIXI.Container();
  //   var line = drawLine(element.pos, element.style);
  //   container.addChild(line);
  //   return container;
  // }
  getLine(x, y) {
    let tile = this.getTile(x, y);
    if (!tile.line) return undefined;
    let element = tile.line;
    return element;
  }
  // getBezier(x, y) {
  //   let el = this.getElement(x, y);
  //   return el.line;
  // }
  getTile(x, y) {
    let tile = this.tiles[x][y];
    return tile;
  }
  getTileFromPos(x, y) {
    let tileX = Math.round(x) / this.col;
    let tileY = Math.round(y) / this.row;
    return { x: parseInt(tileX), y: parseInt(tileY) };
  }
  // setTile(x, y, type = 4) {
  //   let tile = this.getTile(x, y);
  //   tile.set(type);
  //   tile.tileGraphic.beginFill("0xff0000");
  // }
  setTilesToApp(app) {
    for (let i = 0; i < this.x; i++) {
      for (let j = 0; j < this.y; j++) {
        let tile = this.getTile(i, j);
        app.stage.addChild(tile.container);
      }
    }
  }
  getMidpoint(x, y) {
    let pos = {
      x: x * this.col + this.col / 2,
      y: y * this.row + this.row / 2
    };
    return pos;
  }
  getNeighbors(x, y) {
    let neighbors = [];
    if (x - 1 >= 0) {
      let tile = this.tiles[x - 1][y];
      if (this.calcNeighborCondition(tile)) {
        neighbors.push(tile);
      }
    }
    if (x + 1 < this.x) {
      let tile = this.tiles[x + 1][y];
      if (this.calcNeighborCondition(tile)) {
        neighbors.push(tile);
      }
    }
    if (y - 1 >= 0) {
      let tile = this.tiles[x][y - 1];
      if (this.calcNeighborCondition(tile)) {
        neighbors.push(tile);
      }
    }
    if (y + 1 < this.y) {
      let tile = this.tiles[x][y + 1];
      if (this.calcNeighborCondition(tile)) {
        neighbors.push(tile);
      }
    }
    return neighbors;
  }
  calcNeighborCondition(tile) {
    if (tile.type != -1) {
      return true;
    }
    return false;
  }

  // getGrid() {
  //   let pos = {};
  //   const container = new PIXI.Container();
  //   pos.y1 = 0;
  //   pos.x2 = 0;
  //   for (let i = 0; i < this.x; i++) {
  //     pos.x1 = i * this.xWidth;
  //     pos.y2 = this.height;
  //     let line = new Line(pos, gridStyle);

  //     container.addChild(line);
  //   }
  //   pos.x1 = 0;
  //   pos.y2 = 0;
  //   for (let i = 0; i < this.y; i++) {
  //     pos.y1 = i * this.yHeight;
  //     pos.x2 = this.width;
  //     let line = new Line(pos, gridStyle);
  //     container.addChild(line);
  //   }
  //   return container;
  // }
}
