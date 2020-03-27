class Menu {
  constructor(index, menu) {
    this.index = index;
    this.menu = menu;
    this.container = new PIXI.Container();
    this.elements = [];
    this.visible = menu.visible;
    this.init();
  }
  init() {
    for (let i = 0; i <= this.menu.names.length - 1; i++) {
      let pSprite = new PIXI.Sprite(textureId[this.menu.sprite.primary]);
      pSprite.width = this.menu.sprite.width;
      pSprite.height = this.menu.sprite.height;
      let sSprite = this.menu.sprite.second
        ? new PIXI.Sprite(textureId[this.menu.sprite.second])
        : null;
      if (sSprite) {
        sSprite.width = this.menu.sprite.width;
        sSprite.height = this.menu.sprite.height;
      }
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
        this.menu.text,
        i
      );
      this.elements.push(tile);
      this.container.addChild(tile.graphic);
      this.container.addChild(tile.text);

      if (!this.visible) {
        this.container.visible = false;
      }
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
    text_style,
    index
  ) {
    this.size = size;
    this.active = active;
    this.prim = prim;
    this.second = second;
    this.text_style = text_style;
    this.text = new Text(
      text,
      this.size.x + this.text_style.x_off,
      this.size.y + this.size.h / 2 - this.text_style.y_off,
      new PIXI.TextStyle(TEXT_STYLE_MENU)
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
