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
    this.graphic = new PIXI.Graphics(); //The graphic Element
    this.line = null; //The Math of the Line
    this.init();
  }

  init() {
    /** refactor to MenuElement */
    let primeColor = TILE_COLOR.p;
    let secColor = TILE_COLOR.s;
    this.element.ref = this;
    this.element.interactive = true;
    this.element.lineStyle(gridStyle);
    this.element.beginFill("0xffffff", 1);
    this.element.drawRect(
      this.x * this.width,
      this.y * this.height,
      this.width,
      this.height
    );
    this.element.endFill();
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
      updateRoute(this.ref);
    };

    this.container.addChild(this.element);
    this.container.addChild(this.text);
    this.container.addChild(this.graphic);
  }
  set(type, orient = { x: 1, y: 1 }) {
    this.type = type;
    /** Curves Bezier */
    if (type <= 5) {
      let rail = new Rail(this.pos, this.mid, name);
      let size = this.getTileSize();
      rail.setCurve(type, size, orient);
      this.line = rail.line;
      this.graphic = rail.graphic;
    } else if (type == 6) {
      let pos = this.getTileSize();
      let station = new Station(pos, this.mid, name);
      this.graphic = station.graphic;
    }
    //if existing tile is changed
    this.container.removeChild(this.graphic);
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
}
