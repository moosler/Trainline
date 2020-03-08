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
   * @param {*} width
   * @param {*} height
   * @param {*} tileSize size of the tile as rect for the hitarea
   */
  setCurve(type, width, height, tileSize) {
    /** Curves */
    let sign = 1;
    let pos, control1, control2, end;
    if (type == 2 || type == 3) {
      sign = -1;
    }
    if (type == 0 || type == 3) {
      pos = { x: this.mid.x + (width / 2) * sign, y: this.mid.y };
      end = { x: this.mid.x, y: this.mid.y - height / 2 };
      control1 = { x: this.mid.x + (width / 4) * sign, y: this.mid.y };
      control2 = { x: this.mid.x, y: this.mid.y - height / 4 };
    } else if (type == 1 || type == 2) {
      pos = { x: this.mid.x, y: this.mid.y + height / 2 };
      control1 = { x: this.mid.x, y: this.mid.y + height / 4 };
      control2 = { x: this.mid.x + (width / 4) * sign, y: this.mid.y };
      end = { x: this.mid.x + (width / 2) * sign, y: this.mid.y };
    } else if (type == 5) {
      /** Line Horizontal */
      //or call: this.setLine(type, width, height)
      pos = { x: this.pos.x + width, y: this.mid.y };
      control1 = { x: this.pos.x + (width / 3) * 2, y: this.mid.y };
      control2 = { x: this.pos.x + width / 3, y: this.mid.y };
      end = { x: this.pos.x, y: this.mid.y };
    } else if (type == 4) {
      /** Line Vertical */
      //or call: this.setLine(type, width, height)
      pos = { x: this.mid.x, y: this.pos.y + height };
      control1 = { x: this.mid.x, y: this.pos.y + (height / 3) * 2 };
      control2 = { x: this.mid.x, y: this.pos.y + height / 3 };
      end = { x: this.mid.x, y: this.pos.y };
    }
    let bezier = new Bezier(pos, control1, control2, end, tileSize);
    this.line = bezier;
    this.graphic = bezier.getGraphic();
  }
}
