class Screen {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.menus = [];
    this.time = 0;
    this.texture = null;
    this.gameMenu = new PIXI.Container();
    this.selectedLevel = 0;
  }
  //https://github.com/kittykatattack/learningPixi
  //global position inside the animals container
  //   console.log(animals.toGlobal(cat.position));
  //tiger.getGlobalPosition().x
  init() {
    this.initSprites();
    this.createMenus();
  }

  initSprites() {
    textureId = PIXI.loader.resources[ASSET_REF].textures;
    this.texture = textureId;
  }

  addStage(el) {
    this.gameMenu.addChild(el);
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
    // gameScene.addChild(menuTop.container);
    this.addStage(menuTop.container);

    if (DEBUG_MODE) {
      //Right
      let menuRight = new Menu(i++, MENU_RIGHT);
      this.menus.push(menuRight);
      // gameScene.addChild(menuTop.container);
      this.addStage(menuRight.container);

      //Right Selection
      let menuSelection = new Menu(i++, MENU_SELECT);
      this.menus.push(menuSelection);
      // gameScene.addChild(menuTop.container);
      this.addStage(menuSelection.container);
    }
  }
  swapVisibility(index) {
    this.menus[index].visible = !this.menus[index].visible;
    this.menus[index].container.visible = !this.menus[index].container.visible;
  }
  reset() {
    this.time = 0;
  }
}
