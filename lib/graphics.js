function drawLine(pos, style = {}) {
  var line = new PIXI.Graphics();
  line.lineStyle(style.width, style.color, style.alpha);
  line.position.x = pos.x1;
  line.position.y = pos.y1;
  // line.pivot.set(0, 140)
  // line.rotation = 0.785398
  line.moveTo(0, 0);
  line.lineTo(pos.x2, pos.y2);
  return line;
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
  }
  get() {
    const richText = new PIXI.Text(this.text, this.style);
    richText.x = this.x;
    richText.y = this.y;
    return richText;
  }
}
