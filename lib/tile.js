class Tile {
  constructor(x, y, pos, mid, width, height, text = "") {
    this.x = x;
    this.y = y;
    this.mid = mid; //pos {x: 0, y:0}
    this.pos = pos;
    this.width = width;
    this.height = height;
    this.type = -1; //Type Number of rail element
    this.text = text;
    this.graphic = null;
    this.element = null;
    this.container = new PIXI.Container();
    this.tileGraphic = new PIXI.Graphics();
    this.init();
  }

  init() {

    /** refactor to MenuElement */
    let primeColor = "0xE8FFCB"
    let secColor = "0xFEEDCF"
    this.tileGraphic.ref = this;
    this.tileGraphic.interactive = true;
    this.tileGraphic.lineStyle(gridStyle);
    this.tileGraphic.beginFill("0xffffff", 1);
    this.tileGraphic.drawRect(
      this.x * this.width,
      this.y * this.height,
      this.width,
      this.height
    );
    this.tileGraphic.endFill();
    this.tileGraphic.tint = primeColor
    this.tileGraphic.hitArea = new PIXI.Rectangle(
      this.x * this.width,
      this.y * this.height,
      this.width,
      this.height
    );
    this.tileGraphic.mouseover = function(mouseData) {
      // this.alpha = 1;
      this.tint = secColor;
    };
    this.tileGraphic.mouseout = function() {
      this.tint = primeColor;
    };
    this.tileGraphic.mousedown = function() {
      /**global function */
      updateRoute(this.ref);
    };

    this.container.addChild(this.tileGraphic);
    this.container.addChild(this.text);
  }
  set(type, orient = {x: 1, y: 1}) {
    this.type = type;
    let obj = undefined;
    /** Curves Bezier */
    let rail = new Rail(this.pos, this.mid, name);
    let size = this.getTileSize();
    rail.setCurve(type, size, orient);
    obj = rail.getGraphic();
    this.element = rail;
    this.container.removeChild(this.graphic);
    this.graphic = obj;
    this.container.addChild(obj);
  }
  incrementType(orient) {
    let typeId = this.type + 1;
    
    if (typeId >= maxRailProps) {
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
    return this.element.getLine();
  }
}
