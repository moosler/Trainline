const type = {
  curveNE: 0,
  curveSE: 1,
  curveSW: 2,
  curveNW: 3,
  railV: 4,
  railH: 5,
  curveH: 6,
  curveV: 7
};

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
  addRoute(map, tiles, dimensions) {
    for (let i = 0; i < map.length; i++) {
      const el = map[i];
      const x = el[0];
      const y = el[1];
      const type = el[2];
      let tile = tiles[x][y]
      tile.set(type, dimensions.width, dimensions.height);
      this.route.push(tile);
    }
  }
  loadRoute(tiles, dimensions) {
    this.addRoute(testTrack, tiles, dimensions);
  }
}

class TackData {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
  }
}
