var gridStyle = {
  color: "0x000000",
  width: 1,
  alpha: 0.5
};

var railStyle = {
  color: "0x624A2E",
  width: 10,
  alpha: 1
};

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
    var line = new PIXI.Graphics();
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
  constructor(text, x, y) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.style = {
      fontFamily: "Arial",
      fontSize: 10
    };
    return this.get();
  }
  get() {
    const richText = new PIXI.Text(this.text, this.style);
    richText.x = this.x;
    richText.y = this.y;
    return richText;
  }
}

class Bezier {
  constructor(pos, control1, control2, end, tileSize, style = railStyle) {
    this.style = style;
    this.pos = pos;
    this.control1 = control1;
    this.control2 = control2;
    this.end = end;
    this.tileSize = tileSize;
    this.graphic = undefined;
    this.set();
  }
  set() {
    let bezierLine = new PIXI.Graphics();
    bezierLine.lineStyle(this.style.width, this.style.color, this.style.alpha);
    bezierLine.moveTo(this.pos.x, this.pos.y);
    bezierLine.bezierCurveTo(
      this.control1.x,
      this.control1.y,
      this.control2.x,
      this.control2.y,
      this.end.x,
      this.end.y
    );
    bezierLine.interactive = true;

    //  bezierLine.getBounds();
    bezierLine.hitArea = new PIXI.Rectangle(
      this.tileSize.x,
      this.tileSize.y,
      this.tileSize.width,
      this.tileSize.height
    );
    bezierLine.mouseover = function(mouseData) {
      // console.log(mouseData);
      this.alpha = 0.5;
    };
    bezierLine.mouseout = function() {
      this.alpha = 1;
    };
    bezierLine.mousedown = function() {};
    this.graphic = bezierLine;
  }
  getGraphic() {
    return this.graphic;
  }
  /** https://javascript.info/bezier-curve */
  getOrient(t) {
    let g1 = this.calcPointPercent(this.control2, this.end, t);
    let g2 = this.calcPointPercent(this.control1, this.control2, t);
    let g3 = this.calcPointPercent(this.control1, this.pos, t);

    let b1 = this.calcPointPercent(g1, g2, t);
    let b2 = this.calcPointPercent(g2, g3, t);

    let c = this.calcPointPercent(b1, b2, t);
    let rad = Math.atan2(c.x, c.y, t);

    // return rad;
    return [g1, g2, g3, b1, b2, c, rad];
  }
  calcPointPercent(p1, p2, t) {
    let x = p1.x + (p2.x - p1.x) * t;
    let y = p1.y + (p2.y - p1.y) * t;
    // let slope = (p2.y - p1.y) / (p2.x - p1.x);
    // let distance = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    return { x: x, y: y };
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
    return { x: x, y: y };
  }
  calcPos(t, m1, m2, m3, m4) {
    let res =
      Math.pow(1 - t, 3) * m1 +
      3 * t * Math.pow(1 - t, 2) * m2 +
      3 * t * t * (1 - t) * m3 +
      t * t * t * m4;
    return res;
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

function map(n, start1, stop1, start2, stop2) {
  const newval = ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
  return newval;
}