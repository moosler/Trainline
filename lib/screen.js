class Screen {
  constructor(width, height, app) {
    this.width = width;
    this.height = height;
    this.menus = [];
    this.app = app;
    this.sprites = [];
    this.loader = {};
    this.init();
  }
  init() {
    this.createMenus();
    for (let i = 0; i < this.menus.length; i++) {
      const element = this.menus[i];
      this.addStage(element.container);
    }

    // const texture = PIXI.Texture.from("assets/blueSheet.png");
    // const sprite = new PIXI.Sprite(texture);
    // sprite.interactive = true;
    // sprite.buttonMode = true;
    // this.addStage(sprite);
  }
  addStage(el) {
    this.app.stage.addChild(el);
  }
  createMenus() {
    let i = 0;
    //Top
    let size2 = { w: 200, h: 20 };
    let pos = { x: 0, y: 0 };
    let margin = { x: 10, y: 0 };

    let menuTop = new Menu(
      i++,
      pos,
      size2,
      MENU_BOTTOM,
      margin,
      "B",
      MENU_NAMES_BOTTOM,
      false
    );
    this.menus.push(menuTop);

    //Right
    let size = { w: 50, h: 30 };
    pos = { x: this.width - size.w, y: 0 };
    margin = { x: 0, y: 10 };
    let menuRight = new Menu(
      i++,
      pos,
      size,
      MENU_RIGHT,
      margin,
      "R",
      MENU_NAMES_RIGHT
    );
    this.menus.push(menuRight);

    //Right Selection
    pos = { x: this.width - size.w, y: 350 };
    margin = { x: 0, y: 0 };
    let menuSelection = new Menu(
      i++,
      pos,
      size,
      MENU_RIGHT,
      margin,
      "R",
      MENU_NAMES_SELECTION,
      false
    );
    this.menus.push(menuSelection);
  }
}
