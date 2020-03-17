class Menu {
  constructor(index, menu) {
    this.index = index;
    this.menu = menu;
    this.container = new PIXI.Container();
    this.elements = [];
    this.init();
  }
  init() {
    for (let i = 0; i <= this.menu.names.length - 1; i++) {
      let pSprite = new PIXI.Sprite(textureId[this.menu.sprite.primary]);
      let sSprite = this.menu.sprite.second
        ? new PIXI.Sprite(textureId[this.menu.sprite.second])
        : null;
      let x = this.menu.pos.x + this.menu.margin.x * i;
      let y = this.menu.pos.y + pSprite.height * i + this.menu.margin.y * i;
      if (this.menu.orientation == "B" || this.menu.orientation == "T") {
        x = this.menu.pos.x + pSprite.width * i + this.menu.margin.x * i;
        y = this.menu.pos.y + this.menu.margin.y * i;
      }
      let size = {
        x: x,
        y: y,
        w: pSprite.width,
        h: pSprite.height
      };
      let tile = new MenuElement(
        size,
        this.menu.names[i],
        this.menu.color,
        this.menu.interactive,
        pSprite,
        sSprite,
        this.menu.textOffset,
        i
      );
      this.elements.push(tile);
      this.container.addChild(tile.graphic);
      this.container.addChild(tile.text);
    }
  }
  updateMenu(index, value, append = true) {
    let menuText = this.elements[index].text;
    let txt = "";
    if (append) {
      txt = this.menu.names[index] + " " + value;
    } else {
      txt = value;
    }
    menuText.text = txt;
  }
}

class MenuElement {
  constructor(
    size,
    text = "",
    color = {},
    active = true,
    prim,
    second,
    textOffset,
    index
  ) {
    this.size = size;
    this.active = active;
    this.prim = prim;
    this.second = second;
    this.textOffset = textOffset;
    this.text = new Text(
      text,
      this.size.x + this.textOffset.x,
      this.size.y + this.size.h / 2 - this.textOffset.y
    );
    // this.graphic = new PIXI.Graphics();
    this.graphic = this.prim;
    this.color = color;
    this.index = index;
    this.init();
  }
  init() {
    let primeColor = this.color.p;
    let secColor = this.color.s;

    this.graphic.interactive = this.active;
    this.graphic.buttonMode = true;
    this.graphic.position.set(this.size.x, this.size.y);
    // this.graphic.lineStyle(gridStyle);
    // this.graphic.beginFill("0xffffff", 1);
    // this.graphic.drawRect(this.size.x, this.size.y, this.size.w, this.size.h);
    // this.graphic.endFill();
    // this.graphic.tint = primeColor;
    // this.graphic.hitArea = new PIXI.Rectangle(
    //   this.size.x,
    //   this.size.y,
    //   this.size.w,
    //   this.size.h
    // );

    if (this.active) {
      let index = this.index;
      let second = this.second;
      this.graphic.mouseover = function(mouseData) {
        this.alpha = 1;
        this.tint = secColor;
        // this.texture = second;
      };
      this.graphic.mouseout = function() {
        this.tint = "0xffffff";
        this.graphic = this.prim;
      };
      this.graphic.mousedown = function() {
        let val = MENU_RIGHT["names"][index];
        game.screen.menus[2].updateMenu(0, val, false);
        game.selection = index;
      };
    }
  }
}
