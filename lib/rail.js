class Rail {
  constructor(pos, mid = null, name = "") {
    this.style = {
      color: "0x624A2E",
      width: 10,
      alpha: 1
    };
    this.pos = pos;
    this.mid = mid;
    this.name = name;
    this.line = {};
    this.graphic = {};
  }
  getGraphic() {
    return this.graphic;
  }
  getLine() {
    return this.line;
  }
  /**@deprecated */
  setLine(type, width, height) {
    let pos;
    if (type == 4) {
      pos = { x1: this.mid.x, y1: this.pos.y, x2: 0, y2: height };
    } else if (type == 5) {
      pos = { x1: this.pos.x, y1: this.mid.y, x2: width, y2: 0 };
    }
    this.line = new Line(pos, this.style);
  }
  /**@deprecated */
  setArc(type, width, height) {
    /** Arc */
    let pos = { x: -width / 2, y: height / 2 };
    this.line = new Curve(this.mid, width / 2, pos, 0, Math.PI * 1.5);
  }

  /**
   *
   * @param {*} type
   * @param {*} tileSize size of the tile as rect for the hitarea
   * @param {*} orientation 1 = top to bottom and left to right
   */
  setCurve(type, tileSize, orientation = {x: 1, y: 1}) {
    /** Curves */
    let sign = 1;
    let invert = false;
    let pos, control1, control2, end;
    if (type == 2 || type == 3) {
      sign = -1;
    }
    if (type == 0 || type == 3) {
      pos = { x: this.mid.x + (tileSize.width / 2) * sign, y: this.mid.y };
      end = { x: this.mid.x, y: this.mid.y - tileSize.height / 2 };
      control1 = { x: this.mid.x + (tileSize.width / 4) * sign, y: this.mid.y };
      control2 = { x: this.mid.x, y: this.mid.y - tileSize.height / 4 };
    } else if (type == 1 || type == 2) {
      pos = { x: this.mid.x, y: this.mid.y + tileSize.height / 2 };
      control1 = { x: this.mid.x, y: this.mid.y + tileSize.height / 4 };
      control2 = { x: this.mid.x + (tileSize.width / 4) * sign, y: this.mid.y };
      end = { x: this.mid.x + (tileSize.width / 2) * sign, y: this.mid.y };
    } else if (type == 5) {
      /** Line Horizontal  xx*/ 
      //or call: this.setLine(type, width, height)
      pos = { x: this.pos.x + tileSize.width, y: this.mid.y };
      control1 = { x: this.pos.x + (tileSize.width / 3) * 2, y: this.mid.y };
      control2 = { x: this.pos.x + tileSize.width / 3, y: this.mid.y };
      end = { x: this.pos.x, y: this.mid.y };
      if(orientation.x === 1){
        invert = true;
      }
      
    } else if (type == 4) {
      /** Line Vertical yy*/
      //or call: this.setLine(type, width, height)
      pos = { x: this.mid.x, y: this.pos.y + tileSize.height };
      control1 = { x: this.mid.x, y: this.pos.y + (tileSize.height / 3) * 2 };
      control2 = { x: this.mid.x, y: this.pos.y + tileSize.height / 3 };
      end = { x: this.mid.x, y: this.pos.y };
      if(orientation.y === 1){
        invert = true;
      }
    }
    let bezier;
    let x = orientation.x
    let y = orientation.y
    // if((x === 1 && y === 1) || (x === 0 && y === 1)){
      if(invert){
        bezier = new Bezier(pos, control1, control2, end, tileSize);

      }else{
        bezier = new Bezier(end, control2, control1, pos, tileSize);

      }
    // }else if((x === 0 &&  y === 0) || (x === 1 && y === 0)){
    // }
    this.line = bezier;
    this.graphic = bezier.getGraphic();
  }
}
