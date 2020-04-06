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
    this.input = {}; //Text Input for radom Map Generator
    this.selectedLevel = 0;
  }
  //https://github.com/kittykatattack/learningPixi
  //global position inside the animals container
  //   console.log(animals.toGlobal(cat.position));
  //tiger.getGlobalPosition().x
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
        color: "#111111"
      },
      box: {
        default: {
          fill: 0xe3ca8b,
          rounded: 5,
          stroke: { color: 0x914d21, width: 4 }
        },
        focused: {
          fill: 0xc06c37,
          rounded: 5,
          stroke: { color: 0x914d21, width: 4 }
        },
        disabled: { fill: 0xdbdbdb, rounded: 16 }
      }
    });
    input.x = 200 + xOff;
    input.y = yOff;
    input.placeholder = "55";
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
      game.generator = new MapGenerator(input.text);
      console.log(input.text);
    };

    this.inputMenu.addChildAt(text, 0);
    this.inputMenu.addChildAt(button, 1);
    this.inputMenu.addChildAt(input, 2);
  }
}
