class Tile {
  constructor(x, y, pos, mid,width,height, text = "") {
    this.x = x;
    this.y = y;
    this.mid = mid; //pos {x: 0, y:0}
    this.pos = pos;
    this.width = width;
    this.height = height;
    this.type = "";
    this.text = text;
    this.graphic = null;
    this.element = null;
    this.container = new PIXI.Container();
    this.init();
  }
    
  init(){
    this.container.interactive = true;
    this.container.hitArea = new PIXI.Rectangle(this.x, this.y, this.width, this.height);
    this.container.addChild(this.text);
  }
  set(type) {
    this.type = type;
    let obj = undefined;
    /** Curves Bezier */
    let rail = new Rail(this.pos, this.mid, name);
    let size = this.getTileSize();
    rail.setCurve(type, this.width, this.height, size);
    obj = rail.getGraphic();
    this.element = rail;
    this.graphic = obj;
    this.container.addChild(obj)
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
  getLine(){
    return this.element.getLine();
  }
}
