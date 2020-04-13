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
      1: { x: 0, y: -1, c: 2, f: [1, 2, 4] },
    },
  },
  {
    id: 1,
    name: "SE",
    direction: {
      1: { x: 0, y: 1, c: 0, f: [0, 3, 4] },
      2: { x: 1, y: 0, c: 3, f: [2, 3, 5] },
    },
  },
  {
    id: 2,
    name: "SW",
    direction: {
      2: { x: -1, y: 0, c: 1, f: [0, 1, 5] },
      3: { x: 0, y: 1, c: 0, f: [0, 3, 4] },
    },
  },
  {
    id: 3,
    name: "NW",
    direction: {
      0: { x: -1, y: 0, c: 1, f: [0, 1, 5] },
      3: { x: 0, y: -1, c: 2, f: [1, 2, 4] },
    },
  },
  {
    id: 4,
    name: "V",
    direction: {
      0: { x: 0, y: 1, c: 0, f: [0, 3, 4] },
      2: { x: 0, y: -1, c: 2, f: [1, 2, 4] },
    },
  },
  {
    id: 5,
    name: "H",
    direction: {
      1: { x: -1, y: -0, c: 1, f: [0, 1, 5] },
      3: { x: 1, y: 0, c: 3, f: [2, 3, 5] },
    },
  },
  {
    id: 6,
    name: "S",
    direction: {
      0: {},
      1: {},
      2: {},
      3: {},
    },
  },
];
const MAX_TRACK_PROPS = Object.keys(RAIL_TYPES).length;

//x, y, type = railTypes, start 1 = true
/**
 * @param 0: the x value of the tile
 * @param 1: the y value of the tile
 * @param 2: the type of the Rail (the index number of RAIL_TYPES)
 * @param 3: direction: only for the Type Station. Tells how the station is oriented (direction number form 0-3) see description RAIL_TYPES
 * @param 4: color: only for the Type Station. Sets the color of the Station
 * @param 5: startDirecton: only for the start Tile: if set this tile is the start point of the track
 */

class Track {
  constructor(data = null) {
    this.data = data;
    this.route = []; //route of tiles
    this.start = {};
    this.possibleColors = []; //all Possible Colors for the train
    this.switches = [];
  }
  addRoute(tiles) {
    for (let i = 0; i < this.data.length; i++) {
      const el = this.data[i];
      const x = el[0];
      const y = el[1];
      const type = el[2];
      const dir = 3 in el ? el[3] : 0;

      const color = 4 in el ? el[4] : 0;
      let tile = tiles[x][y];
      //Start Point
      if (5 in el) {
        this.start = tile;
        this.start.element.tint = 0x555555;
        tile.direction = el[5];
      }
      // let orient = this.calcOrientation(beforeIndex, tile);
      tile.set(type, color, dir);
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

    this.calcSwitches();
    this.calcRailBefore(this.start);
    // this.calcSwitcheOrientation();
  }

  /**@todo calc all Before tiles */
  calcRailBefore(tile) {
    let tileN = true;
    while (tileN) {
      tileN = tile.getNext(tile);
      if (tileN && !tile.marked) {
        tileN.before = tile;
        if (tile.type <= 3) {
          let rail = RAIL_TYPES[tile.type].direction;
          tileN.direction = rail[tile.direction].c;
        } else {
          tileN.direction = tile.direction;
        }
        tile = tileN;
        tile.marked === true;
        this.calcSwitchOrientations2(tile);
      }
    }
  }

  getDirectionPassed(tile) {
    let rail = RAIL_TYPES[tile.type]["direction"][tile.direction];
    return rail.c;
  }

  calcSwitchOrientations2(tile) {
    if (tile.isSwitch && !tile.marked) {
      game.grid.calcSwitchOrientations(tile);
      let orients = tile.switchOrientations;
      //temp switch tiles
      let temp = tile.type;
      tile.type = orients[1];
      if (orients[1] === temp) {
        tile.type = orients[0];
      }

      let tileN = tile.getNext(tile);
      if (tileN) {
        let newDir = this.getDirectionPassed(tile);
        tileN.direction = newDir;
        this.calcRailBefore(tileN);
      }
      //reswitch tiles
      tile.type = temp;
    }
  }

  containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === obj) {
        return true;
      }
    }
    return false;
  }
  /** two neighored switches are not possible! */
  calcSwitches() {
    for (let i = 0; i < this.route.length; i++) {
      const el = this.route[i];
      let neighbors = game.grid.getConnectableNeighbors(el);
      if (neighbors.length >= 3) {
        if (!this.containsObject(el, this.switches)) {
          this.switches.push(el);
          el.element.tint = TILE_COLOR.h;
          el.addSwitchSprite();
        }
      }
    }
  }

  calcSwitcheOrientation() {
    for (let i = 0; i < this.switches.length; i++) {
      let el = this.switches[i];
      let neighbors = game.grid.getConnectableNeighbors(el);
      // let neighbors = game.grid.getNeighbors(el.x, el.y);
      for (let i = 0; i < neighbors.length; i++) {
        const element = neighbors[i];
        if (
          Object.keys(element.before).length === 0 &&
          element.before.constructor === Object
        ) {
          element.before = el;
          element.direction = game.grid.getDir(element);
          // this.calcRailBefore(element);
        }
      }
      game.grid.calcSwitchOrientations(el);
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
    //check if any train is on the tile
    let hasTrain = tile.hasTrains();
    if (hasTrain) {
      let curtyp = tile.type;
      let len = tile.switchOrientations.length;
      let newType;
      if (len > 0) {
        let i = tile.switchOrientations.indexOf(curtyp) + 1;
        let newIndex = i % len;
        newType = tile.switchOrientations[newIndex];
        tile.set(newType);
      }
    }
  }
  addElement(tile, selection) {
    if (!selection) {
      tile.incrementType();
    } else {
      tile.set(selection);
    }
    this.route.push(tile);
  }
  updateRoute(tile) {
    let i = this.getIndex(tile.x, tile.y);
    //if tile is a rail type
    if (i && tile.type != 6) {
      this.changeElement(tile);
    }
  }
  loadRoute(tiles) {
    this.addRoute(tiles);
  }
}
