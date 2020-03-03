class Tile {
  constructor(x, y, mid, text = "") {
    this.x = x;
    this.y = y;
    this.mid = mid //pos {x: 0, y:0}
    this.type = "";
    this.text = text;
    this.element = null;
  }
  set(name = "railV",width, height) {
    this.type = name;
    let obj = undefined;
    let mid = this.mid;
    if (name == "railV") {
      let pos = {x1: mid.x, y1: this.y * height, x2: 0, y2: height}
      let rail = new Rail(pos, name);
      rail.setLine();
      obj = rail.get();
    } else if (name == "railH") {
      let pos = {x1: this.x * width, y1: mid.y, x2: width, y2: 0}
      let rail = new Rail(pos, name);
      rail.setLine();
      obj = rail.get();
    } else if (name == "curveSW") {
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
       let type = 1;
       rail.setCurve(width, height, type);
       obj = rail.get();
    } else if (name == "curveNE") {
      let rail = new Rail(null, name, mid);
      let type = 0;
      rail.setCurve(width, height, type);
      // let pos = {x1: (this.x + 1) * width, y1: mid.y, x2: -width / 2, y2: -height / 2}
      // let rail = new Rail(pos, name);
      // rail.setLine();
      obj = rail.get();
    } else if (name == "curveSE") {
      // let pos = {x1: mid.x, y1:(this.y + 1) * height, x2:  width / 2, y2: -height / 2}
      // let rail = new Rail(pos, name);
      // rail.setLine();
      let rail = new Rail(null, name, mid);
      let type = 2;
      rail.setCurve(width, height, type);
      
      obj = rail.get();
    } else if (name == "curveNW") {
      // let pos = {x1: this.x * width, y1:mid.y, x2:  width / 2, y2: -height / 2}
      // let rail = new Rail(pos, name);
      // rail.setLine();
      let rail = new Rail(null, name, mid);
      let type = 3;
      rail.setCurve(width, height, type);
      obj = rail.get();
    }
    this.element = obj;
  }
}

class Rail {
  constructor(pos, name ="", mid = null) {
    this.style = {
      color: "0x624A2E",
      width: 10,
      alpha: 1
    };
    this.pos = pos;
    this.mid = mid;
    this.control = null;
    this.end = null;
    this.name = name;
    this.element = {};
  }
  get(){
    return this.element;
  }
  setLine(){
    this.element = new Line(this.pos, this.style);
  }

  /**
   * 
   * @param {*} width 
   * @param {*} height 
   * @param {*} type 0 = NE; 1 =SW; 2=SE; 3 =NW
   *                 type[1] = 0 = right; 1 = left
   */
  setCurve(width, height, type){
    let sign = 1;
    if(type == 2 || type == 3){
      sign = -1;
    }
    if(type == 0 || type == 3){
      this.pos = {x: this.mid.x+(width/2*sign), y: this.mid.y};
      this.end = {x: this.mid.x, y: this.mid.y- height / 2};
      this.control = {x1:  this.mid.x+(width/4*sign), y1: this.mid.y ,x2: this.mid.x, y2: this.mid.y-(height/4)};
      this.element = new Bezier(this.pos, this.control, this.end);
    }
    else{
      this.pos = {x: this.mid.x, y: this.mid.y+ height / 2};
      this.control = {x1:  this.mid.x, y1: this.mid.y+(height/4) ,x2: this.mid.x+(width/4*sign), y2: this.mid.y};
      this.end = {x: this.mid.x+(width/2*sign), y: this.mid.y};
      this.element = new Bezier(this.pos, this.control, this.end);
    }
    
  }
}

class Train {
  constructor(pos, color = "0xe74c3c") {
    this.pos = pos;
    this.color = color;
    this.container = new PIXI.Container();
    this.init();
  }
  init() {
    var graphics = new PIXI.Graphics();
    graphics.beginFill(this.color);
    graphics.drawCircle(this.pos.x, this.pos.y, this.pos.r);
    graphics.endFill();
    this.container.addChild(graphics);
  }
}
