const rightMenu = ["Test1", "Test2"]

class Menu{
    constructor(index, pos, elementSize, name =""){
        this.index = index
        this.name = name
        this.pos = pos
        this.elementSize = elementSize
        this.container = new PIXI.Container();
        this.init()
    }
    init(){
        // let w = (this.elementSize.x -_width) / this.count.x
        // let h = (this.elementSize.y -_height) / this.count.y
        for (let i = 0; i <= rightMenu.length-1; i++) {
            let size = {
                x: this.pos.x ,
                y: (this.pos.y) +(this.elementSize.h *i),
                w: this.elementSize.w,
                h: this.elementSize.h,
            }
            let tile = new MenuElement(size, rightMenu[i]);
            this.container.addChild(tile.graphic);
            this.container.addChild(tile.text);
        }
    }
}

class MenuElement {
  constructor(size, text = "") {
    this.size = size;
    this.text = new Text(text, this.size.x + (this.size.w/2), this.size.y + (this.size.h/2));
    this.graphic = new PIXI.Graphics();
    this.init();
  }
  init() {
    let primeColor = "0x019BD7"
    let secColor = "0x1176AE"
    this.graphic.interactive = true;
    this.graphic.lineStyle(gridStyle);
    this.graphic.beginFill("0xffffff", 1);
    this.graphic.drawRect(
        this.size.x,
        this.size.y,
        this.size.w,
        this.size.h
    );
    this.graphic.endFill();
    this.graphic.tint = primeColor
    this.graphic.hitArea = new PIXI.Rectangle(
      this.size.x,
      this.size.y,
      this.size.w,
      this.size.h
    );
    this.graphic.mouseover = function(mouseData) {
        this.alpha = 1;
        this.tint = secColor;
      };
      this.graphic.mouseout = function() {
        this.tint = primeColor;
      };
      this.graphic.mousedown = function() {
      };
  }
}