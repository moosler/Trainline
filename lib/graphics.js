var gridStyle = {
  color: "0x000000",
  width: 1,
  alpha: 0.5
}

var railStyle = {
  color: "0x624A2E",
  width: 10,
  alpha: 1
}

class Line {
  constructor(pos, style = null) {
    if (style) {
      this.style = style
    } else {
      this.style = gridStyle
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
  constructor(pos, control1, control2, end, style = railStyle) {
    this.style = style
    this.pos = pos
    this.control1 = control1
    this.control2 = control2
    this.end = end
    this.graphic = undefined;
    this.set()
  }
  set(){
    let bezierLine = new PIXI.Graphics();
    bezierLine.lineStyle(this.style.width, this.style.color, this.style.alpha);
    bezierLine.moveTo(this.pos.x, this.pos.y);
    bezierLine.bezierCurveTo(this.control1.x, this.control1.y, this.control2.x, this.control2.y, this.end.x, this.end.y);
    this.graphic = bezierLine;
  }
  getGraphic() {
    return this.graphic
  }
}

class Curve {
  constructor(center, radius, pos, startAngle, endAngle, clock = true, style = railStyle) {
    this.center = center
    this.r = radius
    this.pos = pos
    this.startAngle = startAngle
    this.endAngle = endAngle
    this.style = style
    this.clock = clock
    return this.get();
  }
  get() {
    let partialCircle = new PIXI.Graphics();
    partialCircle.lineStyle(this.style.width, this.style.color, this.style.alpha);
    //centerX, centerY, circleRadius, startAngle, endAngle
    partialCircle.arc(this.center.x, this.center.y, this.r, this.startAngle, this.endAngle, this.clock);
    partialCircle.x = this.pos.x;
    partialCircle.y = this.pos.y;
    return partialCircle;
  }
}