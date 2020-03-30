class Tile {
  constructor(x, y, pos, mid, width, height, text = "") {
    this.x = x;
    this.y = y;
    this.mid = mid; //pos {x: 0, y:0}
    this.pos = pos;
    this.width = width;
    this.height = height;
    this.type = -1; //Type Number of the rail element
    this.text = text;
    this.container = new PIXI.Container();
    this.element = {}; //The Tile Element
    this.graphic = new PIXI.Graphics(); //The graphic Element //Rail.graphic or Station.graphic
    this.obj = {}; //The graphic Element Station or Rail
    this.line = null; //The Math of the Line
    this.direction = null;
    this.switchOrientations = []; //possible tile types for the switch
    this.before = {}; //the tile before this tile
    this.init();
  }

  init() {
    this.element = new PIXI.Sprite(textureId["blank_tile.png"]);
    this.element.width = this.width + 1;
    this.element.height = this.height + 1;
    this.element.position.set(this.x * this.width, this.y * this.height);
    let primeColor = TILE_COLOR.p;
    let secColor = TILE_COLOR.s;
    this.element.tint = primeColor;
    this.element.ref = this;
    this.element.interactive = true;
    // this.element = new PIXI.Graphics();
    // this.element
    //   .lineStyle(gridStyle)
    //   .beginFill("0xffffff", 1)
    //   .drawRect(
    //     this.x * this.width,
    //     this.y * this.height,
    //     this.width,
    //     this.height
    //   )
    //   .endFill();
    // this.element.hitArea = new PIXI.Rectangle(
    //   this.x * this.width,
    //   this.y * this.height,
    //   this.width,
    //   this.height
    // );
    this.element.mouseover = function(mouseData) {
      // this.alpha = 1;
      this.beforeTint = this.tint;
      this.tint = secColor;
    };
    this.element.mouseout = function() {
      this.tint = this.beforeTint;
    };
    this.element.mousedown = function() {
      if (game.editMode) {
        let selection = game.selection;
        if (!game.track) {
          game.track = new Track("test", null);
        }
        game.track.addElement(this.ref, selection);
      } else {
        game.track.updateRoute(this.ref);
      }
    };
    this.element.rightdown = function() {
      this.ref.removeRail();
    };

    this.container.addChild(this.element);
    if (DEBUG_MODE) {
      this.container.addChild(this.text);
    }
    this.container.addChild(this.graphic);
  }
  removeRail() {
    this.container.removeChild(this.graphic);
    this.type = -1;
    this.graphic = {};
  }
  set(type, color = 0, orient = 0) {
    this.container.removeChild(this.graphic);
    this.type = type;
    let size = this.getTileSize();
    /** Curves Bezier */
    if (type <= 5) {
      let rail = new Rail(this.pos, this.mid, name, color);
      this.obj = rail;
      rail.setCurve(type, size);
      this.line = rail.line;
      this.graphic = rail.graphic;
    } else if (type == 6) {
      let station = new Station(size, this.mid, name, color, orient);
      this.obj = station;
      this.graphic = station.graphic;
    }
    //if existing tile is changed

    this.container.addChild(this.graphic);
  }
  incrementType(orient) {
    let typeId = this.type + 1;

    if (typeId >= MAX_TRACK_PROPS) {
      typeId = 0;
    }
    this.set(typeId, orient);
  }
  getTileSize() {
    let tilePos = {
      x: this.pos.x,
      y: this.pos.y,
      width: this.width,
      height: this.height
    };
    return tilePos;
  }
  getLine() {
    return this.line;
  }
  getNext(train) {
    if (this.type != 6) {
      let dir = train.direction;
      let rail = RAIL_TYPES[this.type];
      let increment = rail.direction[dir];

      let xShift = increment.x + this.x;
      let yShift = increment.y + this.y;
      let next = game.grid.tiles[xShift][yShift];
      if (train instanceof Train) {
        //is undefined if train leaves the grid
        return this.calcForTrain(next, dir, train);
      } else {
        return this.calcforRoute(next, dir);
      }
    }
    return false;
  }

  calcforRoute(next, dir) {
    if (next) {
      let nextTile = this.checkFollower(next, dir);
      return nextTile;
    }
    return false;
  }

  calcForTrain(next, dir, train) {
    if (next) {
      if (next.type == 6) {
        return this.calcStation(next, dir, train);
      }
      let nextTile = this.checkFollower(next, dir);
      return nextTile;
    }
    return false;
  }

  calcStation(next, dir, train) {
    let rDir = this.getRailDir(this.type, dir);
    let ndir = rDir.c;
    let style = next.obj.style;
    let color = style.color;
    if (next.direction == ndir && train.color == color) {
      game.setPoints();
    } else {
      game.updatePassedTrains();
    }
    return false;
  }
  getRailDir(type, dir) {
    return RAIL_TYPES[type]["direction"][dir];
  }
  checkFollower(next, dir) {
    let nextType = next.type;
    let rDir = this.getRailDir(this.type, dir);
    if (rDir["f"].includes(nextType)) {
      return next;
    }
    return false;
  }
  // calcDirection(nextTile) {
  //   let x = this.x - nextTile.x;
  //   let y = this.y - nextTile.y;
  //   if (y == -1) {
  //     return 0;
  //   } else if (y == 1) {
  //     return 2;
  //   } else if (x == 1) {
  //     return 1;
  //   } else if (x == -1) {
  //     return 3;
  //   }
  // }
  // calcStartDirection() {
  //   let next = game.track.route[1];
  //   return this.calcDirection(next);
  // }
  // setStartDirection() {
  //   let dir = this.calcStartDirection();
  //   console.log(dir);

  //   this.direction = dir;
  // }

  /**
   * calculates if the orientation of the bezier curve has to be swapped
   * end <=> pos
   * c1 <=> c2
   * @param {*} dir
   */
  calcSwap(dir) {
    // let rail = RAIL_TYPES[tile.type];
    // let direc = rail.direction[dir];
    // let dif = { x: tile.pos.x - this.end.x, y: tile.pos.y - this.end.y };
    //never swap dir = 0
    if (dir == 0) {
    } else if (dir == 1) {
      if (this.type == 0 || this.type == 5) {
        return true;
      }
    } else if (dir == 2) {
      if (this.type == 1 || this.type == 2 || this.type == 4) {
        return true;
      }
    } else if (dir == 3 && this.type == 3) {
      return true;
    }
    return false;
  }

  hasTrains() {
    for (let i = 0; i < game.trains.length; i++) {
      let train = game.trains[i];
      if (this.x == train.tile.x && this.y == train.tile.y) {
        return false;
      }
    }
    return true;
  }
}
