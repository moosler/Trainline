class Circle {
  constructor(pos, r = 5, style = null) {
    if (style) {
      this.style = style;
    } else {
      this.style = { width: 1, color: "0x3366FF", alpha: 1 };
    }
    this.pos = pos;
    this.r = r;
    return this.get();
  }
  get() {
    var circle = new PIXI.Graphics();
    circle.beginFill(this.style.color);
    circle.lineStyle(this.style.width, this.style.color, this.style.alpha);
    circle.drawCircle(this.pos.x, this.pos.y, this.r);
    return circle;
  }
}

class Line {
  constructor(pos, style = null) {
    if (style) {
      this.style = style;
    } else {
      this.style = gridStyle;
    }
    this.pos = pos;
    return this.get();
  }
  get() {
    let line = new PIXI.Graphics();
    line.lineStyle(this.style.width, this.style.color, this.style.alpha);
    line.position.x = this.pos.x1;
    line.position.y = this.pos.y1;
    // line.pivot.set(0, 140)
    // line.rotation = 0.785398
    line.moveTo(0, 0);
    line.lineTo(this.pos.x2, this.pos.y2);
    return line;
  }
}

class Text {
  constructor(text, x, y, style) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.style = {
      ...textStyle,
      ...style
    };
    return this.get();
  }
  get() {
    const richText = new PIXI.Text(this.text, this.style);
    richText.x = this.x;
    richText.y = this.y - this.style.fontSize / 2;
    return richText;
  }
}

class BezierLine {
  constructor(val) {
    this.pos = val.pos;
    this.control1 = val.control1;
    this.control2 = val.control2;
    this.end = val.end;
  }
  heading(x, y, degree = false) {
    let tx = this.pos.x - x;
    let ty = this.pos.y - y;
    const h = Math.atan2(ty, tx);

    if (degree) {
      const h2 = this._fromRadians(h);
      return h2;
    }
    return h;
  }
  _fromRadians(angle) {
    return (angle * 180.0) / Math.PI;
  }
  getPos(t) {
    let x = this.calcPos(
      t,
      this.end.x,
      this.control2.x,
      this.control1.x,
      this.pos.x
    );
    let y = this.calcPos(
      t,
      this.end.y,
      this.control2.y,
      this.control1.y,
      this.pos.y
    );
    let head = this.heading(x, y);

    return { x: x, y: y, h: head };
  }
  calcPos(t, m1, m2, m3, m4) {
    let res =
      Math.pow(1 - t, 3) * m1 +
      3 * t * Math.pow(1 - t, 2) * m2 +
      3 * t * t * (1 - t) * m3 +
      t * t * t * m4;
    return res;
  }
  swap() {
    let temp = this.pos;
    this.pos = this.end;
    this.end = temp;

    let temp2 = this.control1;
    this.control1 = this.control2;
    this.control2 = temp2;

    this.swapped = true;
  }
}

class Curve {
  constructor(
    center,
    radius,
    pos,
    startAngle,
    endAngle,
    clock = true,
    style = railStyle
  ) {
    this.center = center;
    this.r = radius;
    this.pos = pos;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.style = style;
    this.clock = clock;
    return this.get();
  }
  get() {
    let partialCircle = new PIXI.Graphics();
    partialCircle.lineStyle(
      this.style.width,
      this.style.color,
      this.style.alpha
    );
    //centerX, centerY, circleRadius, startAngle, endAngle
    partialCircle.arc(
      this.center.x,
      this.center.y,
      this.r,
      this.startAngle,
      this.endAngle,
      this.clock
    );
    partialCircle.x = this.pos.x;
    partialCircle.y = this.pos.y;
    return partialCircle;
  }
}
