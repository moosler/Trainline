var rect_style = {
  width: 5,
  color: 0x000000,
  alpha: 0.5
};

var offset_ = 100;
var rect_ = {
  x: TILE_SHIFT.x + offset_,
  y: TILE_SHIFT.y + 50,
  w: _WIDTH - r_w - offset_ - offset_,
  h: _HEIGHT - offset_ - offset_
};

var tint_ = "0xb66634";

class Scene {
  constructor() {
    this.endLevel = new PIXI.Container();
    this.endLevelWindow = new PIXI.Graphics();
    this.container = new PIXI.Container(); //Main Container
    this.selectLevel = {};
    this.text = new PIXI.Text("", TEXT_STYLE_LEVEL_MENU);
  }
  init() {
    this.endLevel.zIndex = 1000;
    // app.stage.addChild(this.play);

    /**SCENE SELECT LEVEL ***/
    let size = {
      w: 450,
      h: 450
    };
    this.selectLevel = new Scenewindow("screen_h.png", size);
    this.container.addChild(this.selectLevel.container);

    // /**SCENE ENDLEVEL ***/
    this.endLevel.addChild(this.endLevelWindow);
    this.endLevelWindow
      .lineStyle(rect_style)
      .beginFill("0xffffff", 1)
      .drawRect(rect_.x, rect_.y, rect_.w, rect_.h)
      .endFill().tint = tint_;

    let b_next = new PIXI.Sprite(textureId["next.png"]);
    b_next.width = 49;
    b_next.height = 49;
    size = {
      x: rect_.x + rect_.w - b_next.width - 5,
      y: rect_.y + rect_.h - b_next.height - 5,
      w: b_next.width,
      h: b_next.height
    };
    b_next.interactive = true;
    b_next.buttonMode = true;
    b_next.position.set(size.x, size.y);
    this.endLevel.addChild(b_next);
    b_next.mouseover = function(mouseData) {
      this.alpha = 1;
      this.tint = "0xff0000";
      // this.texture = second;
    };
    b_next.mouseout = function() {
      this.tint = "0xffffff";
      this.alpha = 0.8;
    };
    b_next.mousedown = function() {
      game.nextLevel();
    };

    this.endLevel.visible = false;
    this.text.x = app.stage.width / 2;
    this.text.y = app.stage.height / 2 - 32;
    this.text.anchor.set(0.5);
  }
  showEndLevel(val) {
    this.text.text = val;
    this.endLevel.visible = true;
    app.ticker.stop();
  }
  swapVisibility() {
    this.endLevel.visible = !this.endLevel.visible;
  }
}

class Scenewindow {
  constructor(textureName, size) {
    this.container = new PIXI.Container();
    this.size = size;
    this.text_header = new PIXI.Text(
      "Select Level",
      TEXT_STYLE_LEVEL_MENU_HEADER
    );
    this.sprite = new PIXI.Sprite(textureId["screen_h.png"]);
    this.button = new PIXI.Sprite(textureId["play.png"]);
    this.textures = new PIXI.Sprite(textureId["blank.png"]);
    this.init();
  }
  init() {
    this.text_header.anchor.set(0.5);
    this.text_header.x = _WIDTH / 2;
    this.text_header.y = 80;

    this.sprite.width = this.size.w;
    this.sprite.height = this.size.h;
    this.sprite.position.set(
      (_WIDTH - this.sprite.width) / 2,
      (_HEIGHT - this.sprite.height) / 2
    );

    this.button.width = 50;
    this.button.height = 50;
    this.button.position.set(
      (_WIDTH - this.sprite.width) / 2 + 300,
      this.sprite.height - 25
    );
    this.button.interactive = true;
    this.button.buttonMode = true;
    this.button.mouseover = function(mouseData) {
      this.tint = "0xcccc00";
    };
    this.button.mouseout = function() {
      this.tint = "0xffffff";
    };
    this.button.mousedown = function() {
      game.setStatus(1);
      app.ticker.start();
    };
    this.textures.width = 50;
    this.textures.height = 50;
    this.textures.position.set(
      (_WIDTH - this.sprite.width) / 2 + 55,
      (_HEIGHT - this.sprite.height) / 2 + 100
    );
    // windowTextLevel.anchor.set(0.5);
    let windowTextLevel = new PIXI.Text("1", TEXT_STYLE_LEVEL_MENU_HEADER);
    windowTextLevel.x = (_WIDTH - this.sprite.width) / 2 + 72;
    windowTextLevel.y = (_HEIGHT - this.sprite.height) / 2 + 108;

    this.container.addChild(this.sprite);
    this.container.addChild(this.text_header);
    this.container.addChild(this.button);
    this.container.addChild(this.textures);
    this.container.addChild(windowTextLevel);
  }
}
