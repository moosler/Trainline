class Rail {
  constructor(pos, mid = null) {
    this.style = {
      color: "0x624A2E",
      width: 10,
      alpha: 1
    };
    this.pos = pos;
    this.mid = mid;
    this.orientation = null;
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
    return { pos: pos, end: end, control1: control1, control2: control2 };
  }
  calcType_1_2(tileSize, sign = 1) {
    let pos = { x: this.mid.x, y: this.mid.y + tileSize.height / 2 };
    let control1 = { x: this.mid.x, y: this.mid.y + tileSize.height / 4 };
    let control2 = {
      x: this.mid.x + (tileSize.width / 4) * sign,
      y: this.mid.y
    };
    let end = { x: this.mid.x + (tileSize.width / 2) * sign, y: this.mid.y };
    return { pos: pos, end: end, control1: control1, control2: control2 };
  }
  calcType_4(tileSize) {
    let pos = { x: this.mid.x, y: this.pos.y + tileSize.height };
    let control1 = { x: this.mid.x, y: this.pos.y + (tileSize.height / 3) * 2 };
    let control2 = { x: this.mid.x, y: this.pos.y + tileSize.height / 3 };
    let end = { x: this.mid.x, y: this.pos.y };
    return { pos: pos, end: end, control1: control1, control2: control2 };
  }
  calcType_5(tileSize) {
    //or call: this.setLine(type, width, height)
    let pos = { x: this.pos.x + tileSize.width, y: this.mid.y };
    let control1 = { x: this.pos.x + (tileSize.width / 3) * 2, y: this.mid.y };
    let control2 = { x: this.pos.x + tileSize.width / 3, y: this.mid.y };
    let end = { x: this.pos.x, y: this.mid.y };
    return { pos: pos, end: end, control1: control1, control2: control2 };
  }
  /**
   *
   * @param {*} type
   * @param {*} tileSize size of the tile as rect for the hitarea
   * @param {*} orient 1 = top to bottom and left to right
   */
  setCurve(type, tileSize) {
    /** Curves */
    let res;
    let sign = 1;
    if (type == 2 || type == 3) {
      sign = -1;
    }

    if (type == 0 || type == 3) {
      res = this.calcType_0_3(tileSize, sign);
    } else if (type == 1 || type == 2) {
      res = this.calcType_1_2(tileSize, sign);
    } else if (type == 4) {
      res = this.calcType_4(tileSize);
    } else if (type == 5) {
      res = this.calcType_5(tileSize);
    }
    this.line = new BezierLine(res);
    this.graphic = this.createSprite(type, tileSize, res);
  }

  createSprite(type, tileSize, res) {
    let sprite;
    if (type < 4) {
      sprite = new PIXI.Sprite(textureId["rail_curve.png"]);
      sprite.rotation = Math.PI * type * 0.5;
      sprite.rotation -= Math.PI * 0.5;
    } else if (type < 6) {
      sprite = new PIXI.Sprite(textureId["rail.png"]);
      sprite.rotation = Math.PI * type * 0.5;
      sprite.rotation -= Math.PI * 0.5;
    }
    sprite.anchor.set(0.5);
    sprite.position.set(
      this.pos.x + tileSize.width / 2,
      this.pos.y + tileSize.height / 2
    );
    sprite.width = tileSize.width;
    sprite.height = tileSize.height;
    return sprite;

    // let bezierLine = new PIXI.Graphics();
    // bezierLine.lineStyle(railStyle.width, railStyle.color, railStyle.alpha);
    // bezierLine.moveTo(res.pos.x, res.pos.y);
    // bezierLine.bezierCurveTo(
    //   res.control1.x,
    //   res.control1.y,
    //   res.control2.x,
    //   res.control2.y,
    //   res.end.x,
    //   res.end.y
    // );
    // return bezierLine;
  }
}
