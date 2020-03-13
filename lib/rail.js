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

  calcType_0_3(tileSize, sign = 1) {
    let pos = { x: this.mid.x + (tileSize.width / 2) * sign, y: this.mid.y };
    let end = { x: this.mid.x, y: this.mid.y - tileSize.height / 2 };
    let control1 = {
      x: this.mid.x + (tileSize.width / 4) * sign,
      y: this.mid.y
    };
    let control2 = { x: this.mid.x, y: this.mid.y - tileSize.height / 4 };
    return { p: pos, e: end, c1: control1, c2: control2 };
  }
  calcType_1_2(tileSize, sign = 1) {
    let pos = { x: this.mid.x, y: this.mid.y + tileSize.height / 2 };
    let control1 = { x: this.mid.x, y: this.mid.y + tileSize.height / 4 };
    let control2 = {
      x: this.mid.x + (tileSize.width / 4) * sign,
      y: this.mid.y
    };
    let end = { x: this.mid.x + (tileSize.width / 2) * sign, y: this.mid.y };
    return { p: pos, e: end, c1: control1, c2: control2 };
  }
  calcType_4(tileSize) {
    let pos = { x: this.mid.x, y: this.pos.y + tileSize.height };
    let control1 = { x: this.mid.x, y: this.pos.y + (tileSize.height / 3) * 2 };
    let control2 = { x: this.mid.x, y: this.pos.y + tileSize.height / 3 };
    let end = { x: this.mid.x, y: this.pos.y };
    return { p: pos, e: end, c1: control1, c2: control2 };
  }
  calcType_5(tileSize) {
    //or call: this.setLine(type, width, height)
    let pos = { x: this.pos.x + tileSize.width, y: this.mid.y };
    let control1 = { x: this.pos.x + (tileSize.width / 3) * 2, y: this.mid.y };
    let control2 = { x: this.pos.x + tileSize.width / 3, y: this.mid.y };
    let end = { x: this.pos.x, y: this.mid.y };
    return { p: pos, e: end, c1: control1, c2: control2 };
  }
  /**
   *
   * @param {*} type
   * @param {*} tileSize size of the tile as rect for the hitarea
   * @param {*} orient 1 = top to bottom and left to right
   */
  setCurve(type, tileSize, orient = { x: 1, y: 1 }) {
    /** Curves */
    let invert = false;
    let res;
    // let sign = 1;
    // let pos, control1, control2, end, res;
    // if (type == 2 || type == 3) {
    //   sign = -1;
    // }

    if (type == 0) {
      if (orient.x === 1) {
        invert = true;
      }
      res = this.calcType_0_3(tileSize);
    } else if (type == 1) {
      if (orient.x === 0) {
        invert = true;
      }
      res = this.calcType_1_2(tileSize);
    } else if (type == 2) {
      if (orient.y === 1) {
        invert = true;
      }
      res = this.calcType_1_2(tileSize, -1);
    } else if (type == 3) {
      if (orient.x === 1) {
        invert = true;
      }
      res = this.calcType_0_3(tileSize, -1);
    } else if (type == 4) {
      /** Line Vertical yy*/
      if (orient.y === 2) {
        invert = true;
      }
      res = this.calcType_4(tileSize);
    } else if (type == 5) {
      /** Line Horizontal  xx*/
      if (orient.x === 2) {
        invert = true;
      }
      res = this.calcType_5(tileSize);
    }

    // if (type == 0 || type == 3) {
    //   pos = { x: this.mid.x + (tileSize.width / 2) * sign, y: this.mid.y };
    //   end = { x: this.mid.x, y: this.mid.y - tileSize.height / 2 };
    //   control1 = { x: this.mid.x + (tileSize.width / 4) * sign, y: this.mid.y };
    //   control2 = { x: this.mid.x, y: this.mid.y - tileSize.height / 4 };
    //   if (orient.y === 1 && orient.x === 1) {
    //     invert = true;
    //   }
    // } else if (type == 1 || type == 2) {
    //   pos = { x: this.mid.x, y: this.mid.y + tileSize.height / 2 };
    //   control1 = { x: this.mid.x, y: this.mid.y + tileSize.height / 4 };
    //   control2 = { x: this.mid.x + (tileSize.width / 4) * sign, y: this.mid.y };
    //   end = { x: this.mid.x + (tileSize.width / 2) * sign, y: this.mid.y };
    //   if (orient.x === 1) {
    //     invert = true;
    //   }
    // } else if (type == 5) {
    //   /** Line Horizontal  xx*/

    //   //or call: this.setLine(type, width, height)
    //   pos = { x: this.pos.x + tileSize.width, y: this.mid.y };
    //   control1 = { x: this.pos.x + (tileSize.width / 3) * 2, y: this.mid.y };
    //   control2 = { x: this.pos.x + tileSize.width / 3, y: this.mid.y };
    //   end = { x: this.pos.x, y: this.mid.y };
    //   if (orient.x === 1) {
    //     invert = true;
    //   }
    // } else if (type == 4) {
    //   /** Line Vertical yy*/
    //   //or call: this.setLine(type, width, height)
    //   pos = { x: this.mid.x, y: this.pos.y + tileSize.height };
    //   control1 = { x: this.mid.x, y: this.pos.y + (tileSize.height / 3) * 2 };
    //   control2 = { x: this.mid.x, y: this.pos.y + tileSize.height / 3 };
    //   end = { x: this.mid.x, y: this.pos.y };
    //   if (orient.y === 1) {
    //     invert = true;
    //   }
    // }
    let bezier;
    if (invert) {
      bezier = new Bezier(res.p, res.c1, res.c2, res.e, tileSize);
    } else {
      bezier = new Bezier(res.e, res.c2, res.c1, res.p, tileSize);
    }
    this.line = bezier;
    this.graphic = bezier.getGraphic();
  }
}
