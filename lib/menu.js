/**@todo refactor oh yeeeeeees */
class Menu {
  constructor(index, menu) {
    this.index = index;
    this.menu = menu;
    this.container = new PIXI.Container();
    this.elements = [];
    this.sprites = [];
    this.init();
  }
  init() {
    for (let i = 0; i <= this.menu.names.length - 1; i++) {
      let pSprite = new PIXI.Sprite(textureId[this.menu.sprite.primary]);
      pSprite.width = this.menu.sprite.width;
      pSprite.height = this.menu.sprite.height;
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

      let noText = false;
      if (this.menu.hasOwnProperty("textures")) {
        noText = true;
      }
      let tile = new MenuElement(
        size,
        this.menu.names[i],
        this.menu.color,
        this.menu.interactive,
        pSprite,
        this.menu.text,
        noText,
        i
      );

      let sprite = tile.text;
      this.elements.push(tile);
      this.container.addChild(tile.graphic);
      if (this.menu.hasOwnProperty("textures")) {
        sprite = this.addSpriteSymbols(i, size);
      }
      this.container.addChild(sprite);
    }
  }
  addSpriteSymbols(i, size) {
    let sp = this.getSprite(size, i);
    if (this.menu.textures[1] == "save.png" && i == 1) {
      sp = this.getSprite(size, 5);
      sp.interactive = true;
      sp.buttonMode = true;
      sp.mousedown = function() {
        game.grid.save();
      };
    }
    this.sprites.push(sp);
    return sp;
  }
  getSprite(size, i) {
    let sprite;
    if (i < 4) {
      sprite = new PIXI.Sprite(textureId[this.menu.textures[0]]);
      sprite.anchor.set(0.5);
      sprite.rotation = Math.PI * i * 0.5;
      sprite.rotation -= Math.PI * 0.5;
    } else if (i < 6) {
      sprite = new PIXI.Sprite(textureId[this.menu.textures[1]]);
      sprite.anchor.set(0.5);
      sprite.rotation = Math.PI * i * 0.5;
      sprite.rotation -= Math.PI * 0.5;
    } else if (i == 6) {
      sprite = new PIXI.Sprite(textureId[this.menu.textures[2]]);
      sprite.anchor.set(0.5);
    }
    sprite.position.set(
      size.x + this.menu.texture_size.xOff,
      size.y + this.menu.texture_size.yOff
    );
    sprite.width = this.menu.texture_size.w;
    sprite.height = this.menu.texture_size.h;
    return sprite;
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
  updateSelection(index) {
    let element = game.screen.menus[1].sprites[index];
    let textureName = element.texture.textureCacheIds[0];
    let selection = this.sprites[0];
    let angle = element.rotation;
    this.sprites[0].rotation = angle;
    if (textureName != selection.texture.textureCacheIds[0]) {
      let new_t = new PIXI.Sprite(textureId[textureName]);
      this.sprites[0].texture = new_t.texture;
    }
  }
}

class MenuElement {
  constructor(
    size,
    text = "",
    color = {},
    active = true,
    sprite,
    text_style,
    notText = false,
    index
  ) {
    this.size = size;
    this.active = active;
    this.text_style = text_style;
    this.text = null;
    // this.graphic = new PIXI.Graphics();
    this.graphic = sprite;
    this.color = color;
    this.index = index;
    this.init(notText, text);
  }
  init(notText, text) {
    if (!notText) {
      this.text = new Text(
        text,
        this.size.x + this.text_style.x_off,
        this.size.y + this.size.h / 2 - this.text_style.y_off,
        new PIXI.TextStyle(this.text_style.style)
      );
    }

    let secColor = this.color.s;

    this.graphic.interactive = this.active;
    this.graphic.buttonMode = true;
    this.graphic.position.set(this.size.x, this.size.y);
    if (this.active) {
      let index = this.index;
      this.graphic.mouseover = function(mouseData) {
        this.alpha = 1;
        this.tint = secColor;
      };
      this.graphic.mouseout = function() {
        this.tint = "0xffffff";
        this.graphic = this.prim;
      };
      this.graphic.mousedown = function() {
        game.screen.menus[2].updateSelection(index);
        game.selection = index;
      };
    }
  }
}
