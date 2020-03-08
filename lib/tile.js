class Tile {
  constructor(x, y, pos, mid, text = "") {
    this.x = x;
    this.y = y;
    this.mid = mid; //pos {x: 0, y:0}
    this.pos = pos;
    this.type = "";
    this.text = text;
    this.graphic = null;
    this.element = null;
  }
  set(type, width, height) {
    this.type = type;
    let obj = undefined;
    /** Curves Bezier */
    let rail = new Rail(this.pos, this.mid, name);
    this.element = rail;
    let size = this.getTileSize(width, height);
    rail.setCurve(type, width, height, size);
    obj = rail.getGraphic();
    this.graphic = obj;
  }
  getTileSize(width, height) {
    let tilePos = {
      x: this.pos.x,
      y: this.pos.y,
      width: width,
      height: height
    };
    return tilePos;
  }
}
