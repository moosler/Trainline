class Screen {
  constructor(width, height, app) {
    this.width = width;
    this.height = height;
    this.menus = [];
    this.app = app;
    this.sprites = sprites;
    this.loader = PIXI.loader;
    this.init();
  }
  //https://github.com/kittykatattack/learningPixi
  //global position inside the animals container
  //   console.log(animals.toGlobal(cat.position));
  //tiger.getGlobalPosition().x
  init() {
    // this.createMenus();
    // for (let i = 0; i < this.menus.length; i++) {
    //   const element = this.menus[i];
    //   this.addStage(element.container);
    // }
    // this.initLoader();
    // this.loadSprites();
  }

  initSprites() {
    var id = PIXI.loader.resources[assetRef].textures;
    let b01 = new PIXI.Sprite(id["button00.png"]);
    sprites.b01 = b01;
    gameScene.addChild(b01);

    let b03 = new PIXI.Sprite(id["button03.png"]);
    sprites.b03 = b03;
    gameScene.addChild(b03);

    // treasure.position.set(
    //   stage.width - treasure.width - 48,
    //   stage.height / 2 - treasure.height / 2
    // );
  }

  loadSprites() {
    for (const key in sprites) {
      if (sprites.hasOwnProperty(key)) {
        const element = sprites[key];
        game.app.stage.addChild(element);
      }
    }
  }
  initLoader() {
    this.loader
      .add(assetRef)
      .on("progress", loadProgressHandler)
      .load(this.setup)
      .onComplete.once(this.loadSprites);
  }
  setup() {
    let id = PIXI.loader.resources[assetRef].textures;
    let button0 = new PIXI.Sprite(id["button00.png"]);
    let button3 = new PIXI.Sprite(id["button03.png"]);
    button3.visible = false;
    button0.visible = false;
    sprites["b0"] = button0;
    sprites["b3"] = button3;
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
