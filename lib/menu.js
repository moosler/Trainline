const MENU_NAMES_RIGHT = ["Curve NE", "Curve SE", "Curve SW", "Curve NW", "Vertical", "Horizontal", "Station"];
const MENU_NAMES_BOTTOM = ["Time:", "Points:"];
const MENU_NAMES_SELECTION = ["Select:"];
const MENU_RIGHT = { p: "0x00c4fe", s: "0x1176AE" };
const MENU_BOTTOM = { p: "0xe38a31", s: "0xff9966" };
const TILE_COLOR = { p: "0xb9de59", s: "0xFEEDCF" };

class Menu {
  constructor(
    index,
    pos,
    elementSize,
    color = {},
    margin = { x: 0, y: 0 },
    orient = "R",
    elementNames,
    active = true
  ) {
    this.index = index;
    this.name = name;
    this.pos = pos;
    this.margin = margin;
    this.elementSize = elementSize;
    this.container = new PIXI.Container();
    this.orientation = orient;
    this.active = active;
    this.elementNames = elementNames;
    this.elements = [];
    this.init(color);
  }
  init(color) {
    for (let i = 0; i <= this.elementNames.length - 1; i++) {
      let x = this.pos.x + this.margin.x * i;
      let y = this.pos.y + this.elementSize.h * i + this.margin.y * i;
      if (this.orientation == "B" || this.orientation == "T") {
        x = this.pos.x + this.elementSize.w * i + this.margin.x * i;
        y = this.pos.y + this.margin.y * i;
      }
      let size = {
        x: x,
        y: y,
        w: this.elementSize.w,
        h: this.elementSize.h
      };
      let tile = new MenuElement(
        size,
        this.elementNames[i],
        color,
        this.active,
        i
      );
      this.elements.push(tile);
      this.container.addChild(tile.graphic);
      this.container.addChild(tile.text);
    }
  }
  updateMenu(index, value, append = true) {
    let menuText= this.elements[index].text
    let txt = ""
    if(append){
      txt = this.elementNames[index] + value;
    }else {
      txt = value;
    }
    menuText.text = txt
  }
}

class MenuElement {
  constructor(size, text = "", color = {}, active = true, index) {
    this.size = size;
    this.textOffset = { x: 5, y: 5 };
    this.active = active;
    this.text = new Text(
      text,
      this.size.x + this.textOffset.x,
      this.size.y + this.size.h / 2
    );
    
    this.graphic = new PIXI.Graphics();
    this.color = color;
    this.index = index;
    this.init();
  }
  init() {
    let primeColor = this.color.p;
    let secColor = this.color.s;
    this.graphic.interactive = this.active;
    this.graphic.lineStyle(gridStyle);
    this.graphic.beginFill("0xffffff", 1);
    this.graphic.drawRect(this.size.x, this.size.y, this.size.w, this.size.h);
    this.graphic.endFill();
    this.graphic.tint = primeColor;
    this.graphic.hitArea = new PIXI.Rectangle(
      this.size.x,
      this.size.y,
      this.size.w,
      this.size.h
    );
    if (this.active) {
      let index = this.index;
      this.graphic.mouseover = function(mouseData) {
        this.alpha = 1;
        this.tint = secColor;
      };
      this.graphic.mouseout = function() {
        this.tint = primeColor;
      };
      this.graphic.mousedown = function() {
        setSelection(index)
      };
    }
  }
}
