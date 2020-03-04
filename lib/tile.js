class Tile {
  constructor(x, y, mid, text = "") {
    this.x = x;
    this.y = y;
    this.mid = mid //pos {x: 0, y:0}
    this.type = "";
    this.text = text;
    this.element = null;
  }
  set(type ,width, height) {
    this.type = type;
    let obj = undefined;
    let mid = this.mid;
    //railV
    if (type == 4) {
      let pos = {x1: mid.x, y1: this.y * height, x2: 0, y2: height}
      let rail = new Rail(pos, name);
      rail.setLine();
      obj = rail.get();
    } 
    //railH
    else if (type == 5) {
      let pos = {x1: this.x * width, y1: mid.y, x2: width, y2: 0}
      let rail = new Rail(pos, name);
      rail.setLine();
      obj = rail.get();
      
    } 
    //"Curves"
    else {
      /**Line */
      // let pos = {x1: this.x * width, y1: mid.y, x2: width / 2, y2: height / 2}
      // let rail = new Rail(pos, name);
      // rail.setLine();
      // obj = rail.get();

      /** Curve */
      // let pos = {x: -width/2, y: height/2};
      // obj = new Curve(mid, width/2, pos, 0, Math.PI*1.5);

       /** Bezier */
       let rail = new Rail(null, name, mid);
       rail.setCurve(width, height, type);
       obj = rail.get();
    } 
    this.element = obj;
  }
}


