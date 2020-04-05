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
        let txtV = i + "|" + j;

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
    this.container.position.set(this.shift.x, this.shift.y);
    return arr;
  }
  save() {
    let track = [];
    for (var i = 0; i < this.x; i++) {
      for (var j = 0; j < this.y; j++) {
        let tile = this.tiles[i][j];
        let type = tile.type;
        if (type != -1) {
          let el = this.setTrackElement(i, j);
          track.push(el);
        }
      }
    }
    return track;
  }

  setTrackElement(i, j) {
    let tile = this.tiles[i][j];

    let type = tile.type;
    let el = [i, j, type];
    //start Position
    if (tile.direction !== null) {
      el = [i, j, type, false, false, tile.direction];
    }
    if (type === 6) {
      let color = tile.obj.colorIndex;
      let orient = tile.obj.orientation;
      el = [i, j, type, orient, color];
    }
    return el;
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
      neighbors.push(tile);
    }
    if (x + 1 < this.x) {
      let tile = this.tiles[x + 1][y];
      neighbors.push(tile);
    }
    if (y - 1 >= 0) {
      let tile = this.tiles[x][y - 1];
      neighbors.push(tile);
    }
    if (y + 1 < this.y) {
      let tile = this.tiles[x][y + 1];
      neighbors.push(tile);
    }
    return neighbors;
  }

  getDirection(tile, tile2) {
    if (tile.x - tile2.x == -1) return 3;
    if (tile.x - tile2.x == 1) return 1;
    if (tile.y - tile2.y == -1) return 0;
    if (tile.y - tile2.y == 1) return 2;
  }
  getConnectableNeighbors(tile) {
    let neighbors = this.getNeighbors(tile.x, tile.y);
    let newNeigbors = [];

    // if ((tile.x == 5) & (tile.y == 5)) {
    //   console.log(tile);
    // }

    neighbors.forEach(element => {
      let dir = this.getDirection(tile, element);
      let con = this.calcNeighborCondition(element, dir);
      // if ((tile.x == 5) & (tile.y == 5)) {
      //   console.log(element);
      //   console.log(dir);
      //   console.log(con);
      // }
      if (con) {
        newNeigbors.push(element);
      }
    });
    return newNeigbors;
  }

  calcNeighborCondition(tile, dir) {
    if (tile.type != -1) {
      return this.isConnectable(tile, dir);
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
      if (tile.direction == dir || tile.obj.orientation == dir) {
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
    let neighbors = this.getConnectableNeighbors(tile);
    for (let i = 0; i < neighbors.length; i++) {
      const element = neighbors[i];
      if (element == tile.before) {
        neighbors.splice(i, 1);
      }
    }
    let a = tile.before;
    let b = neighbors[0];
    let c = neighbors[1];

    let typesArr = [];
    typesArr.push(this.getTypeBetween(a, tile, b));
    typesArr.push(this.getTypeBetween(a, tile, c));
    tile.switchOrientations = typesArr;
  }

  getTypeBetween(before, current, after) {
    let diff = {
      x: before.x - after.x,
      y: before.y - after.y
    };
    let dif_bc = {
      x: before.x - current.x,
      y: before.y - current.y
    };

    let invert = false;
    if (dif_bc.x == 0) {
      invert = true;
    }

    if (diff.x == 0) return 4;
    if (diff.y == 0) return 5;
    if (diff.x == 1 && diff.y == 1) {
      if (invert) return 2;
      return 0;
    }
    if (diff.x == 1 && diff.y == -1) {
      if (invert) return 3;
      return 1;
    }
    if (diff.x == -1 && diff.y == 1) {
      if (invert) return 1;
      return 3;
    }
    if (diff.x == -1 && diff.y == -1) {
      if (invert) return 0;
      return 2;
    }
  }
}
