class Screen {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.menus = [];
    this.time = 0;
    this.texture = null;
    this.gameMenu = new PIXI.Container();
    this.editMenu = new PIXI.Container();
    this.inputMenu = new PIXI.Container();
    this.tooltip = new Tooltip(app.view);
    this.input = {}; //Text Input for radom Map Generator
    this.selectedLevel = 0;
  }
  init() {
    this.createMenus();
  }
  updateMenus(time, player) {
    this.time += time;
    let t = parseInt(this.time / 1000);
    this.updateMenu(0, 0, t); //Time
    let maxTrains = Object.keys(game.timetable).length;
    this.updateMenu(0, 1, player.points + "/" + maxTrains);
    this.updateMenu(0, 2, player.missed);
  }
  updateMenu(index, elIndex, value, append = true) {
    let menu = this.menus[index];
    menu.updateMenu(elIndex, value, append);
  }
  createMenus() {
    let i = 0;
    let menuTop = new Menu(i++, MENU_TOP);
    this.menus.push(menuTop);
    this.gameMenu.addChild(menuTop.container);

    //Right
    let menuRight = new Menu(i++, MENU_RIGHT);
    this.menus.push(menuRight);
    this.editMenu.addChild(menuRight.container);

    //Right Selection
    let menuSelection = new Menu(i++, MENU_SELECT);
    this.menus.push(menuSelection);
    this.editMenu.addChild(menuSelection.container);
  }
  reset() {
    this.time = 0;
  }
  createInput() {
    let xOff = 5;
    let yOff = 10;

    let text = new Text(
      "Enter your Seed...",
      0 + xOff,
      0 + yOff + 10,
      new PIXI.TextStyle(TEXT_STYLE_LEVEL_MENU_HEADER)
    );
    let input = new PIXI.TextInput({
      input: {
        fontSize: "10pt",
        padding: "8px",
        width: "100px",
        color: "#111111",
      },
      box: {
        default: {
          fill: 0xe3ca8b,
          rounded: 5,
          stroke: { color: 0x914d21, width: 4 },
        },
        focused: {
          fill: 0xc06c37,
          rounded: 5,
          stroke: { color: 0x914d21, width: 4 },
        },
        disabled: { fill: 0xdbdbdb, rounded: 16 },
      },
    });
    input.x = 200 + xOff;
    input.y = yOff;
    input.placeholder = "";
    input.focus();
    input.zIndex = 5;
    this.input = input;

    let button = new PIXI.Sprite(textureId["play.png"]);
    button.width = 50;
    button.height = 50;
    button.position.set(input.x + 120, 0);
    button.interactive = true;
    button.buttonMode = true;
    button.mouseover = function (mouseData) {
      this.tint = "0xcccc00";
    };
    button.mouseout = function () {
      this.tint = "0xffffff";
    };
    button.mousedown = function () {
      let inputMenu = game.screen.inputMenu;
      // inputMenu.removeChildAt(2);
      // inputMenu.addChildAt(inputMenu, 2);
      game.reset();
      game.generator = new MapGenerator(input.text, true);
    };

    this.inputMenu.addChildAt(text, 0);
    this.inputMenu.addChildAt(button, 1);
    this.inputMenu.addChildAt(input, 2);
  }
}

/**
 * https://codepen.io/grubergen/pen/eWQyQr
 */
class Tooltip {
  constructor(canvas) {
    this.canvas = canvas;
    this.container = new PIXI.Container();
    this.maxWidth = 300;
    this.padding = 6;
    this.margin = 15;
    this.linesMargin = 4;
    this.w = 0;
    this.h = 0;
  }

  showText(text, x, y) {
    let textArr = [
      { t: text, c: "#000", b: true },
      // { t: "User controlled", c: "#0a0", b: false },
    ];
    this.render(textArr);
    this.update(x - this.w / 2, y - 40);
  }
  render(lines) {
    this.container.zIndex = 10;
    this.container.removeChildren();
    var height = 0;
    var width = 0;
    var texts = [];
    for (var i = 0; i < lines.length; i++) {
      var l = lines[i];
      var t = new PIXI.Text(l.t, {
        fontSize: 14,
        fontFamily: "Arial",
        fontWeight: l.b ? "bold" : "normal",
        fill: l.c,
        wordWrap: true,
        wordWrapWidth: this.maxWidth,
      });
      t.x = this.padding;
      t.y = this.padding + height;
      height += t.height + this.linesMargin;
      if (width < t.width) width = t.width;
      texts.push(t);
    }
    height -= this.linesMargin;
    if (height < 0) height = 0;
    this.w = width;
    this.h = height;
    var rect = new PIXI.Graphics();
    // force canvas rendering for rectangle
    rect.cacheAsBitmap = true;
    rect.lineStyle(2, 0xee6600, 0.6);
    rect.beginFill(0xffffff, 0.8);
    rect.drawRoundedRect(
      0,
      0,
      width + this.padding * 2,
      height + this.padding * 2,
      6
    );
    rect.endFill();
    this.container.addChild(rect);
    for (var i = 0; i < texts.length; i++) {
      this.container.addChild(texts[i]);
    }
  }
  update(x, y) {
    x += this.margin;
    if (x + this.w > this.canvas.width - this.margin) {
      x -= this.w + this.margin * 2;
    }
    if (y + this.h > this.canvas.height - this.margin) {
      y -= this.h + this.margin;
    }
    this.container.x = x;
    this.container.y = y;
  }
}
