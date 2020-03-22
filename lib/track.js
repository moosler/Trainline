/**
 * Two neighbored Switches are not possible!
 * The direction of the train is a value from 0-3 like a clock (clockwise) starting from 12 o clock.
 * Then the Direction is a Vector pointing to the middle
 * EXP: 0: => y++
 * EXP: 1: => x--
 * EXP: 2: => y--
 * EXP: 3: => x++
 * @param id: The id of the rail. Its the same like the index of the array
 * @param name: The name of the Rail
 * @param direction: first two values are the direction described above. This Rail can only passed by this directions
 *  x: increment x
 *  y: increment y
 *  c: after passing this rail change the Direction to this value
 *  f: These are the rails that can be followd after passing this rail
 *
 */
const RAIL_TYPES = [
  {
    id: 0,
    name: "NE",
    //x: increment x, y: increment y, c: after passing this rail changeDirection to this value
    direction: {
      0: { x: 1, y: 0, c: 3, f: [2, 3, 5] },
      1: { x: 0, y: -1, c: 2, f: [1, 2, 4] }
    }
  },
  {
    id: 1,
    name: "SE",
    direction: {
      1: { x: 0, y: 1, c: 0, f: [0, 3, 4] },
      2: { x: 1, y: 0, c: 3, f: [2, 3, 5] }
    }
  },
  {
    id: 2,
    name: "SW",
    direction: {
      2: { x: -1, y: 0, c: 1, f: [0, 1, 5] },
      3: { x: 0, y: 1, c: 0, f: [0, 3, 4] }
    }
  },
  {
    id: 3,
    name: "NW",
    direction: {
      0: { x: -1, y: 0, c: 1, f: [0, 1, 5] },
      3: { x: 0, y: -1, c: 2, f: [1, 2, 4] }
    }
  },
  {
    id: 4,
    name: "V",
    direction: {
      0: { x: 0, y: 1, c: 0, f: [0, 3, 4] },
      2: { x: 0, y: -1, c: 2, f: [1, 2, 4] }
    }
  },
  {
    id: 5,
    name: "H",
    direction: {
      1: { x: -1, y: -0, c: 1, f: [0, 1, 5] },
      3: { x: 1, y: 0, c: 3, f: [2, 3, 5] }
    }
  },
  {
    id: 6,
    name: "S",
    direction: {
      0: {},
      1: {},
      2: {},
      3: {}
    }
  }
];
const MAX_TRACK_PROPS = Object.keys(RAIL_TYPES).length;

//x, y, type = railTypes, start 1 = true
/**
 * @param 0: the x value of the tile
 * @param 1: the y value of the tile
 * @param 2: the type of the Rail (the index number of RAIL_TYPES)
 * @param 3: direction: only for the Type Station. Tells how the station is oriented (direction number form 0-3) see description RAIL_TYPES
 * @param 4: color: only for the Type Station. Sets the color of the Station
 * @param 5: start: only for the start Tile: if set this tile is the start point of the track
 */
const testTrack = [
  [0, 0, 4, false, false, 1],
  [0, 1, 4],
  [0, 2, 0],
  [1, 2, 2],
  [1, 3, 4],
  [1, 4, 0],
  [2, 4, 5],
  [3, 4, 5],
  // [3, 4, 1],
  [4, 4, 5],
  [5, 4, 2],
  [5, 5, 3],
  [4, 5, 1],
  [4, 6, 0],
  [5, 6, 2],
  [5, 7, 4],
  [5, 8, 4],
  [5, 9, 4],
  [4, 2, 6, 2, 0],
  [2, 5, 6, 0, 3],
  [6, 8, 6, 3, 6],
  [4, 3, 4]
];

//x, y, type = railTypes, start 1 = true,
const testTrack1 = [
  [0, 0, 4, 1],
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
  [8, 3, 2],
  [7, 3, 0],
  [7, 2, 6]
];

class Track {
  constructor(name) {
    this.name = name;
    this.route = []; //route of tiles
    this.start = {};
    this.possibleColors = []; //all Possible Colors for the train
    this.switches = [];
  }
  addRoute(map, tiles) {
    for (let i = 0; i < map.length; i++) {
      const el = map[i];
      const x = el[0];
      const y = el[1];
      const type = el[2];
      const dir = 3 in el ? el[3] : 0;
      const color = 4 in el ? el[4] : 0;
      let tile = tiles[x][y];
      //Start Point
      if (5 in el) {
        this.start = tile;
      }
      // let orient = this.calcOrientation(beforeIndex, tile);
      tile.set(type, color);
      if (type <= 5) {
        this.route.push(tile);
      }
      if (type == 6) {
        if (this.possibleColors.indexOf(color) === -1) {
          this.possibleColors.push(color);
        }
        tile.direction = dir;
      }
    }

    //Calc StartLocation after all Tracks are set
    /**
     * @todo the start location is only correct calculated
     * if the tile after the start is set as second tile */
    let tile = this.route[0];
    tile.setStartDirection();
    this.calcSwitches();
  }

  /** two neighored switches are not possible! */
  calcSwitches() {
    for (let i = 0; i < this.route.length; i++) {
      const el = this.route[i];
      let neighbors = game.grid.getNeighbors(el.x, el.y);
      if (neighbors.length >= 3) {
        this.switches.push(el);
        el.element.tint = TILE_COLOR.h;
        game.grid.calcSwitchOrientations(el);
      }
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
  changeElement(tile) {
    // let selection = game.selection;
    let curtyp = tile.type;
    let len = tile.switchOrientations.length;
    let newType;
    if (len > 0) {
      let i = tile.switchOrientations.indexOf(curtyp) + 1;
      let newIndex = i % len;
      newType = tile.switchOrientations[newIndex];
    }
    tile.set(newType);
  }
  addElement(tile, selection) {
    if (!selection) {
      tile.incrementType();
    } else {
      tile.set(selection, orient);
    }
    this.route.push(tile);
  }
  updateRoute(tile) {
    let selection = game.selection;
    let i = this.getIndex(tile.x, tile.y);
    if (i) {
      this.changeElement(tile);
    } else {
      let lastIndex = this.route.length - 1;
      // let orient = this.calcOrientation(lastIndex, tile);
      this.addElement(tile, selection);
    }
  }
  loadRoute(tiles) {
    this.addRoute(testTrack, tiles);
  }
}
