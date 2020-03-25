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
    this.play = new PIXI.Container();
    this.endLevel = new PIXI.Container();
    this.endLevelWindow = new PIXI.Graphics();
    this.startScene = new PIXI.Container();
    this.startWindow = {};
    this.text = new PIXI.Text("", TEXT_STYLE_LEVEL_MENU);
  }
  init() {
    this.endLevel.zIndex = 1000;
    // app.stage.addChild(this.play);
    

    this.startWindow = new PIXI.Sprite(textureId["screen_h.png"]);
    this.startWindow.position.set(10, 100);
    this.startWindow.width = 450;
    this.startWindow.height = 450;
    this.startScene.addChild(this.startWindow);

    this.endLevel.addChild(this.endLevelWindow);
    this.endLevelWindow
      .lineStyle(rect_style)
      .beginFill("0xffffff", 1)
      .drawRect(rect_.x, rect_.y, rect_.w, rect_.h)
      .endFill().tint = tint_;

    let b_next = new PIXI.Sprite(textureId["next.png"]);
    b_next.width = 49;
    b_next.height = 49;
    let size = {
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
    this.endLevel.addChild(this.text);
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
