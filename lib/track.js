const railTypes = {
  curveNE: 0,
  curveSE: 1,
  curveSW: 2,
  curveNW: 3,
  railV: 4,
  railH: 5,
  curveH: 6,
  curveV: 7
};
const maxRailProps = Object.keys(railTypes).length;

//x, y, type
const testTrack = [
  [0, 0, 4],
  [0, 1, 4],
  [0, 2, 0],
  [1, 2, 2],
  [1, 3, 4],
  [1, 4, 0],
  [2, 4, 5],
  [3, 4, 5],
  [4, 4, 5],
  [5, 4, 2],
  [5, 5, 3],
  [4, 5, 1],
  [4, 6, 0],
  [5, 6, 2],
  [5, 7, 4],
  [5, 8, 4],
  [5, 9, 4]
];

class Track {
  constructor(name) {
    this.name = name;
    this.route = []; //route of tiles
  }
  addRoute(map, tiles) {
    for (let i = 0; i < map.length; i++) {
      const el = map[i];
      const x = el[0];
      const y = el[1];
      const type = el[2];
      let tile = tiles[x][y];
      tile.set(type);
      this.route.push(tile);
    }
  }
  getIndex(x, y) {
    for (let i = 0; i < this.route.length; i++) {
      const el = this.route[i];
      if (el.x == x && el.y == y) {
        return i;
      }
    }
    return false;
  }
  changeElement(i, type = false) {
    let r = this.route[i];
    if (type != false) {
      r.set(type);
    } else {
      r.incrementType();
    }
  }
  addElement(tile) {
    tile.incrementType();
    this.route.push(tile);
  }
  updateRoute(tile) {
    let i = this.getIndex(tile.x, tile.y);
    if (i) {
      this.changeElement(i);
    } else {
      this.addElement(tile);
    }
  }
  loadRoute(tiles) {
    this.addRoute(testTrack, tiles);
  }
}

class TackData {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
  }
}
