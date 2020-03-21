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
    this.element = new PIXI.Graphics(); //The Tile Element
    this.graphic = new PIXI.Graphics(); //The graphic Element //Rail.graphic or Station.graphic
    this.obj = {}; //The graphic Element Station or Rail
    this.line = null; //The Math of the Line
    this.direction = null;
    this.init();
  }

  init() {
    /** refactor to MenuElement */
    let primeColor = TILE_COLOR.p;
    let secColor = TILE_COLOR.s;
    this.element.ref = this;
    this.element.interactive = true;
    this.element
      .lineStyle(gridStyle)
      .beginFill("0xffffff", 1)
      .drawRect(
        this.x * this.width,
        this.y * this.height,
        this.width,
        this.height
      )
      .endFill();
    this.element.tint = primeColor;
    this.element.hitArea = new PIXI.Rectangle(
      this.x * this.width,
      this.y * this.height,
      this.width,
      this.height
    );
    this.element.mouseover = function(mouseData) {
      // this.alpha = 1;
      this.tint = secColor;
    };
    this.element.mouseout = function() {
      this.tint = primeColor;
    };
    this.element.mousedown = function() {
      /**global function */
      game.track.updateRoute(this.ref);
    };

    this.container.addChild(this.element);
    this.container.addChild(this.text);
    this.container.addChild(this.graphic);
  }
  set(type, color = 0) {
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
      let station = new Station(size, this.mid, name, color);
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
    let dir = train.direction;
    let rail = RAIL_TYPES[this.type];
    let increment = rail.direction[dir];
    let xShift = increment.x + this.x;
    let yShift = increment.y + this.y;
    let next = game.grid.tiles[xShift][yShift];
    //next ist undefined if train leaves the grid
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
  calcDirection(nextTile) {
    let x = this.x - nextTile.x;
    let y = this.y - nextTile.y;
    if (y == -1) {
      return 0;
    } else if (y == 1) {
      return 2;
    } else if (x == 1) {
      return 3;
    } else if (x == -1) {
      return 1;
    }
  }
  calcStartDirection() {
    let next = game.track.route[1];
    return this.calcDirection(next);
  }
  setStartDirection() {
    let dir = this.calcStartDirection();
    this.direction = dir;
  }
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
}
