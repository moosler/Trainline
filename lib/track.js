// const railTypes = {
//   curveNE: 0,
//   curveSE: 1,
//   curveSW: 2,
//   curveNW: 3,
//   railV: 4,
//   railH: 5,
// };

const railTypes = [
  {
    id: 0,
    name: "NE",
    prev: [2,3,5],
    follow: [1,2,4]
  },
  {
    id: 1,
    name: "SE",
    prev: [0,3,4],
    follow: [2,3,5]
  },
  {
    id: 2,
    name: "SW",
    prev: [0,3,4],
    follow: [0,1,5]
  },
  {
    id: 3,
    name: "NW",
    prev: [0,1,5],
    follow: [1,2,4]
  },
  {
    id: 4,
    name: "V",
    prev: [0,3,4],
    follow: [1,2,4]
  },
  {
    id: 5,
    name: "H",
    prev: [2,3,5],
    follow: [0,1,5]
  }
]

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

//x, y, type
const testTrack1 = [
  [0, 0, 4],
  [0, 1, 4],
  [0, 2, 0],
  [1, 2, 3],
  [1, 1, 4],
  [1, 0, 1],
  [2, 0, 5],
  [3, 0, 5],
  [4, 0, 2],
  [4, 1, 4],
  [4, 2, 4],
  [4, 3, 3],
  [3, 3, 5],
  [2, 3, 5],
  [1, 3, 1],
  [1, 4, 0],
  [2, 4, 5],
  [3, 4, 5],
  [4, 4, 2],
  [4, 5, 3],
  [3, 5, 5],
  [2, 5, 5],
  [1, 5, 1],
  [1, 6, 4],
  [1, 7, 4],
  [1, 8, 0],
  [2, 8, 3],
  [2, 7, 4],
  [2, 6, 1],
  [3, 6, 2],
  [3, 7, 4],
  [3, 8, 0],
  [4, 8, 5],
  [5, 8, 5],
  [6, 8, 5],
  [7, 8, 3],
  [7, 7, 4],
  [7, 6, 2],
  [6, 6, 0],
  [6, 5, 4],
  [6, 4, 1],
  [7, 4, 2],
  [7, 5, 0],
  [8, 5, 3],
  [8, 4, 4],
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
      let beforeIndex = i -1;
      let orient = this.calcOrientation(beforeIndex,tile);
      tile.set(type, orient);
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
   calcOrientation(beforeIndex,tile){
    let orient = {x: 0, y:0}
    let before = this.route[beforeIndex]
     //Start Element: beforeIndex == -1
    if( beforeIndex == -1){
      if(tile.x == 0){
        orient.x = 2
      }
      if(tile.y == 0){
        orient.y = 2
      }
      return orient;
    }else{
      if(before.x == tile.x){
        orient.x = 1
      }else if(before.x < tile.x){
        orient.x = 2
      }
      if(before.y == tile.y){
        orient.y = 1
      }else if(before.y < tile.y){
        orient.y = 2
      }
    }
    return orient
  }
  changeElement(i, type = false, orient) {
    let r = this.route[i];
    if (type != false) {
      r.set(type, orient);
    } else {
      r.incrementType(orient);
    }
  }
  addElement(tile) {
    tile.incrementType();
    this.route.push(tile);
  }
  updateRoute(tile) {
    let i = this.getIndex(tile.x, tile.y);
    if (i) {
      let orient = this.calcOrientation(i,tile);
      this.changeElement(i, false, orient);
    } else {
      let lastIndex = this.route.length-1
      let orient = this.calcOrientation(lastIndex,tile);

      console.log(orient, lastIndex, tile);
      
      this.addElement(tile, orient);
    }
  }
  loadRoute(tiles) {
    this.addRoute(testTrack1, tiles);
  }
}

class TackData {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
  }
}
