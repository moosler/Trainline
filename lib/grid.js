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
        let txtV = "";
        if (DEBUG_MODE) {
          txtV = i + "|" + j;
        }
        let txt = new Text(txtV, midpoint.x, midpoint.y, gridTextStyle);
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
  // setTilesToApp(app) {
  //   for (let i = 0; i < this.x; i++) {
  //     for (let j = 0; j < this.y; j++) {
  //       let tile = this.getTile(i, j);
  //       app.stage.addChild(tile.container);
  //     }
  //   }
  // }
  getMidpoint(x, y) {
    let pos = {
      x: x * this.col + this.col / 2,
      y: y * this.row + this.row / 2
    };
    return pos;
  }
  getNeighbors(x, y, all = false) {
    let neighbors = [];
    if (x - 1 >= 0) {
      let tile = this.tiles[x - 1][y];
      if (this.calcNeighborCondition(tile, 1, all)) {
        neighbors.push(tile);
      }
    }
    if (x + 1 < this.x) {
      let tile = this.tiles[x + 1][y];
      if (this.calcNeighborCondition(tile, 3, all)) {
        neighbors.push(tile);
      }
    }
    if (y - 1 >= 0) {
      let tile = this.tiles[x][y - 1];
      if (this.calcNeighborCondition(tile, 2, all)) {
        neighbors.push(tile);
      }
    }
    if (y + 1 < this.y) {
      let tile = this.tiles[x][y + 1];
      if (this.calcNeighborCondition(tile, 0, all)) {
        neighbors.push(tile);
      }
    }
    return neighbors;
  }

  calcNeighborCondition(tile, dir, all = false) {
    if (all) {
      return true;
    }
    if (tile.type != -1) {
      let connect = this.isConnectable(tile, dir);
      if (connect) {
        return true;
      }
    }
    return false;
  }

  isConnectable(tile, dir) {
    let rail = RAIL_TYPES[tile.type]["direction"];
    //all tiles that are connectable
    if (tile.type != 6) {
      if (rail.hasOwnProperty(dir)) {
        return true;
      }
      return false;
    }
    //all station tiles if the orientation of the station matches
    else {
      // let newdir = (dir + 2) % 4;
      if (tile.direction == dir) {
        return true;
      }
      return false;
    }
  }
  getDiff(tile) {
    let diff = {
      x: tile.x - tile.before.x,
      y: tile.y - tile.before.y
    };
    return diff;
  }
  getDir(tile) {
    let diff = this.getDiff(tile);
    if (diff.x == 1) {
      return 3;
    }
    if (diff.x == -1) {
      return 1;
    }
    if (diff.y == 1) {
      return 0;
    }
    if (diff.y == -1) {
      return 2;
    }
  }

  calcSwitchOrientations(tile) {
    let neighbors = this.getNeighbors(tile.x, tile.y);
    // console.log(tile);
    // console.log(neighbors);
    let newNeighbors = [];
    let others = [];
    for (let i = 0; i < neighbors.length; i++) {
      const element = neighbors[i];
      if (element.x == tile.before.x && element.y == tile.before.y) {
        newNeighbors.push(element);
      } else if (element.type == 6) {
        newNeighbors.push(element);
      } else {
        others.push(element);
      }
    }
    let types;

    //2 neighbors that are no station and not the tile itself
    if (others.length == 2) {
      let a = newNeighbors[0];
      let b = others[0];
      let c = others[1];
      if (a.x > b.x || a.y < b.y) {
        a = others[0];
        b = newNeighbors[0];
      }
      // if (a.x > c.x || a.y < c.y) {
      //   a = others[1];
      //   c = newNeighbors[0];
      // }

      let type1 = this.loopRailTypes(a, b);
      let type2 = this.loopRailTypes(a, c);
      let type3 = tile.type;
      let typ;
      if (type1 != tile.type) {
        typ = type1;
      } else {
        typ = type2;
      }

      types = [typ, type3];
    } else {
      let type1 = this.loopRailTypes(newNeighbors[0], newNeighbors[1]);
      let type2 = tile.type;
      types = [type1, type2];
    }

    tile.switchOrientations = types;
  }
  loopRailTypes(a, b) {
    let type;
    if (a.x == b.x) {
      type = 4;
    } else if (a.y == b.y) {
      type = 5;
    } else if (a.x - b.x == -1 && a.y - b.y == -1) {
      type = 2;
    } else if (a.x - b.x == 1 && a.y - b.y == 1) {
      type = 0;
    } else if (a.x - b.x == -1 && a.y - b.y == 1) {
      type = 3;
    } else if (a.x - b.x == 1 && a.y - b.y == -1) {
      type = 1;
    }
    return type;
  }
}
