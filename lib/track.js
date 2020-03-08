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
    this.route = [];
  }
  add(x, y, type) {
    let data = new TackData(x, y, type);
    this.route.push(data);
  }
  addRoute(arr) {
    arr.forEach(el => {
      this.add(el[0], el[1], el[2]);
    });
  }
  loadRoute() {
    this.addRoute(testTrack);
  }
}

class TackData {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
  }
}