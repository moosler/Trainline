class MapGenerator {
  constructor(seed = 43) {
    this.seed = seed;
    this.rand = new Randomizer(this.seed);
    this.route = [];
    this.stations = [];
    this.start = {};
    this.path = {};
    this.map = new Map(this.rand);
    this.init();
  }
  init() {
    game.addGrid();
    this.path = new Path(game.grid.tiles);

    this.generateMap();
  }
  generateMap() {
    //Start tile is only a straight line
    this.start = this.getRandRail(5, 6);
    this.start.element.tint = 0x555555;
    this.calcDirection(this.start);
    this.calcStations();
    this.calcPaths();
    this.map.saveMap();
    app.ticker.stop();
    app.ticker.update();
  }

  calcPaths() {
    for (let i = 0; i < this.stations.length; i++) {
      const element = this.stations[i];

      let nextTile = this.getNextTileDir(element);
      if (nextTile.type < 0) {
        let path;
        if (i == 0) {
          let nextStart = this.getNextTileDir(this.start);
          path = this.path.bfs(
            [nextTile.x, nextTile.y],
            [nextStart.x, nextStart.y]
          );
          path.push([this.start.x, this.start.y]);
        } else {
          path = this.getNearestPathToRail(nextTile);
        }
        path.unshift([element.x, element.y]);
        this.calcPath(path, element);
      }
    }
  }
  getNearestPathToRail(tile) {
    let filtered = this.route.filter(el => el.type != 6);
    let min = Infinity;
    let sPath = [];
    for (let i = 0; i < filtered.length; i++) {
      const element = filtered[i];

      //make the tile temporarily accessible
      let temp = element.type;
      element.type = -1;
      let path = this.path.bfs([tile.x, tile.y], [element.x, element.y]);
      if (path) {
        if (
          path.length < min &&
          !this.path.equals(path[path.length - 1], [this.start.x, this.start.y])
        ) {
          min = path.length;
          sPath = path;
        }
      }
      element.type = temp;
    }
    return sPath;
  }
  calcPath(path) {
    for (let i = 0; i < path.length - 2; i++) {
      const element = path[i];
      let el = path[i + 1];
      let type = this.getTypeBetween(element, path[i + 1], path[i + 2]);
      let tile = game.grid.tiles[el[0]][el[1]];
      tile.set(type);
      this.route.push(tile);
    }
  }

  getTypeBetween(before, current, after) {
    let diff = {
      x: before[0] - after[0],
      y: before[1] - after[1]
    };
    let dif_bc = {
      x: before[0] - current[0],
      y: before[1] - current[1]
    };

    let tile_b = game.grid.tiles[before[0]][before[1]];
    let type_b = tile_b.type;
    // console.log(
    //   before[0],
    //   before[1],
    //   current[0],
    //   current[1],
    //   after[0],
    //   after[1]
    // );
    // console.log(diff);
    // console.log(dif_bc);
    // console.log(type_b);

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

  calcDirection(tile) {
    let r_type = RAIL_TYPES[tile.type];
    let neighbors = this.getFreeNeighors(tile);
    let successors = [];
    for (const el of neighbors) {
      let dif = {
        x: tile.x - el.x,
        y: tile.y - el.y
      };
      for (const it in r_type.direction) {
        if (
          r_type.direction[it].x == dif.x &&
          r_type.direction[it].y == dif.y
        ) {
          successors.push(it);
        }
      }
    }
    let rand = this.rand.getRand(0, successors.length);
    let result = this.invertDir(successors[rand]);
    tile.direction = result;
  }

  getRandRail(min = 0, max = 6) {
    let tile = this.getRandTile();
    let orientation = this.rand.getRand(0, 4);
    let type = this.rand.getRand(min, max);
    let color = this.rand.getRand(0, COLORS.length);
    tile.set(type, color, orientation);
    return tile;
  }
  calcStations() {
    let num = this.rand.getRand(2, COLORS.length);
    for (let i = 0; i <= num; i++) {
      let tile = this.getRandTile();
      let orientation = this.rand.getRand(0, 4);
      if (this.isOnEdge(tile)) {
        orientation = this.getOrientation(tile);
      }
      tile.set(6, i, orientation);
      this.stations.push(tile);
    }
  }

  calcType(tile, tileBefore) {
    let neighbors = this.getFreeNeighors(tile);
    let min = Infinity;
    let minTile = null;
    neighbors.forEach(element => {
      let minX = Math.abs(element.x - this.start.x);
      let minY = Math.abs(element.y - this.start.y);
      if (minX + minY < min) {
        min = minX + minY;
        minTile = element;
      }
    });

    let type = this.getRailType(tileBefore, minTile);
    return type;
  }
  getRailType(tile, tile2) {
    let diff = {
      x: tile.x - tile2.x,
      y: tile.y - tile2.y
    };
    let orient = tile.obj.orientation;
    // console.log(orient);
    // console.log(diff);

    if (diff.x == -1 && diff.y == -1 && orient == 2) return 0;
    if (diff.x == -1 && diff.y == 1 && orient == 1) return 3;
    if (diff.x == -1 && diff.y == 1 && orient == 0) return 1;
    if (diff.x == 1 && diff.y == 1 && orient == 3) return 0;
    if (diff.x == 1 && diff.y == 1) return 2;
    if (diff.x == 1 && diff.y == -1) return 1;
    if (diff.x == 0) return 4;
    if (diff.y == 0) return 5;
  }

  isOnEdge(tile) {
    if (
      tile.x <= 0 ||
      tile.x >= game.grid.x - 1 ||
      tile.y <= 0 ||
      tile.y >= game.grid.y - 1
    ) {
      return true;
    }
    return false;
  }

  isInBounds(tile) {
    if (
      tile.x >= 0 &&
      tile.x < game.grid.x &&
      tile.y >= 0 &&
      tile.y < game.grid.y
    ) {
      return true;
    }
    return false;
  }

  getOrientation(tile) {
    //the edge cases
    if (tile.x == 0) return 1;
    if (tile.x >= game.grid.x - 1) return 2;
    if (tile.y == 0) return 2;
    if (tile.y >= game.grid.y - 1) return 0;
  }

  getRandTile() {
    let grid = game.grid;
    let endCondition = true;
    let end = 0;
    let tile;
    while (endCondition && end <= 3) {
      let x = this.rand.getRand(0, grid.x);
      let y = this.rand.getRand(0, grid.y);
      tile = grid.tiles[x][y];
      let filtered = this.getOccupiedNeighors(tile);
      if (filtered.length <= 0) {
        endCondition = false;
        break;
      }
      end++;
    }
    this.route.push(tile);
    return tile;
  }

  getNextTileDir(tile) {
    let direction = this.invertDir(tile.direction);
    //only for Type === 6
    if (tile.direction === null) {
      direction = tile.obj.orientation;
    }
    let next = this.getNextTileFromDir(tile, direction);
    return next;
  }

  getNextTileFromDir(tile, dir) {
    let newTile;
    let x = tile.x;
    let y = tile.y;
    if (dir == 0) {
      newTile = game.grid.tiles[x][y - 1];
    } else if (dir == 2) {
      newTile = game.grid.tiles[x][y + 1];
    } else if (dir == 1) {
      newTile = game.grid.tiles[x + 1][y];
    } else if (dir == 3) {
      newTile = game.grid.tiles[x - 1][y];
    }
    if (this.isInBounds(newTile)) {
      return newTile;
    }
    return false;
  }

  invertDir(dir) {
    if (dir == 2) return 0;
    if (dir == 0) return 2;
    if (dir == 3) return 1;
    if (dir == 1) return 3;
  }

  getFreeNeighors(tile) {
    let neighbors = game.grid.getNeighbors(tile.x, tile.y);
    //the tile itself
    neighbors.push(tile);
    let filtered = neighbors.filter(tl => tl.type <= 0);
    return filtered;
  }
  getOccupiedNeighors(tile) {
    let neighbors = game.grid.getNeighbors(tile.x, tile.y);
    //the tile itself
    neighbors.push(tile);
    let filtered = neighbors.filter(tl => tl.type >= 0 && tl.type <= 6);
    return filtered;
  }
}
