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
    rail.setCurve(type, width, height);
    obj = rail.getGraphic();
    this.graphic = obj;
  }
}
