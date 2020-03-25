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
    this.text = new PIXI.Text("", {
      fontFamily: "Comic Sans MS",
      // fontFamily: "Impact"
      fontSize: "64px",
      align: "center",
      dropShadow: true,
      strokeThickness: 2,
      wordWrap: true,
      fill: "white"
    });
  }
  init() {
    this.endLevel.zIndex = 1000;
    app.stage.addChild(this.play);
    app.stage.addChild(this.endLevel);

    this.endLevel.addChild(this.endLevelWindow);
    this.endLevelWindow
      .lineStyle(rect_style)
      .beginFill("0xffffff", 1)
      .drawRect(rect_.x, rect_.y, rect_.w, rect_.h)
      .endFill().tint = tint_;

    let b_next = new PIXI.Sprite(textureId["sliderRight.png"]);
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
