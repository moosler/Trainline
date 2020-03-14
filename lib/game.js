class Game {
  constructor(width, height, app, tiles, config = {}) {
    this.width = width;
    this.height = height;
    this.tiles = tiles; //rows and columns
    this.config = config;
    this.app = app;
    this.grid = {}
    this.track = null;
    this.trains = [];
    this.menus = [];
    this.time = 0;
    this.selection = null;
  }
  start() {
    let offset = this.loadMenu();
    this.loadGrid(offset);
    this.loadTrack();
    this.grid.setTilesToApp(this.app);
    this.addTrains();
    this.tick();
    // console.log(this.grid);
  }
  loadGrid(offset){
    this.grid = new Grid(this.width-offset.x, this.height-offset.y, this.tiles, offset);
  }
  tick() {
    this.app.ticker.autoStart = false;
    this.app.ticker.stop();
    this.app.ticker.add(delta => this.loop(delta));
  }
//   animate(time = performance.now()) {
//     this.app.ticker.update(time);
//     this.app.renderer.render(this.app.stage);
// }

  loop(delta) {
    for (let i = 0; i < this.trains.length; i++) {
      let train = this.trains[i];
      let alive = train.step();
      if (alive === false) {
        this.addTrain(0, 0);
        this.trains.splice(i, 1);
      }
    }
    this.time += delta;
    this.updateMenu(1, 0)
  }
  loadMenu(){
    let i = 0
    //Right
    let size = {w: 50, h: 30}
    let pos = {x: this.width-size.w, y:0}
    let margin = {x: 0, y: 10}
    let menu = new Menu(i++, pos, size, MENU_RIGHT, margin, "R",  MENU_NAMES_RIGHT)
    this.menus.push(menu)
    this.app.stage.addChild(menu.container);
    
    //Bottom
    let size2 = {w: 200, h: 20}
    pos = {x:0, y:this.height-size2.h}
    margin = {x: 10, y: 0}

    let menu2 = new Menu(i++, pos, size2, MENU_BOTTOM, margin,"B", MENU_NAMES_BOTTOM, false)
    this.menus.push(menu2)
    this.app.stage.addChild(menu2.container);

    //Right Selection 
    pos = {x: this.width-size.w, y:350}
    margin = {x: 0, y: 0}
    let menu3 = new Menu(i++, pos, size, MENU_RIGHT, margin, "R",  MENU_NAMES_SELECTION, false)
    this.menus.push(menu3)
    this.app.stage.addChild(menu3.container);

    let offset = {x: size.w, y: size2.h}
    return offset

  }
  updateMenu(index, elIndex, value, append = true){
    let menu = this.menus[index]
    let time = parseInt(this.time/100)
    menu.updateMenu(elIndex, time, append)
  }
  loadTrack() {
    this.track = new Track("test");
    this.track.loadRoute(this.grid.tiles);
  }
  restart(){
    for (let i = 0; i < this.trains.length; i++) {
      var element = this.trains[i];
      element.destroy();
      element = {}
      this.trains.splice(i, 1);
      this.addTrains()
      this.app.ticker.start()
    }
  }
  addTrains() {
    this.addTrain(0, 0);
  }
  addTrain(x, y) {
    // let route = [...this.track.route];
    let train = new Train(
      { x: x, y: y },
      { x: this.grid.xWidth / 4, y: this.grid.yHeight },
      this.track
      // route
    );
    this.app.stage.addChild(train.graphic);
    this.trains.push(train);
  }
  getPath() {
    let len = this.track.route.length;
    let path = [];
    for (let i = 0; i < len; i++) {
      const el = this.track.route[i];
      let tile = this.grid.getTile(el.x, el.y);
      let bezier = tile.element.line;
      path.push(bezier.end);
      path.push(bezier.control2);
      path.push(bezier.control1);
      //last element
      if (i == len - 1) {
        path.push(bezier.pos);
      }
    }
    return path;
  }
}

/**
  * chain graphics
  var graphics = new PIXI.Graphics()
  .lineStyle(0)
  .beginFill(0xffffff, 1)
  .drawRect(0, 95, 800, 10)
  .beginFill(0x7FFF00)
  .drawCircle(400, 100,50) 
  */

/**
   * Tweens with gsap3
   * 
   * let options = {
      duration: duration,
      // alignOrigin: [-0.5, -0.5],
      // transformOrigin: "-50% -50%",
      // xPercent: -50,
      // yPercent: -50,
      ease: "none",
      motionPath: {
        path: path,
        type: "cubic",
        // align: "self",
        // alignOrigin: [0.5, 0.5],
        offsetX: -this.width / 2 - 50,
        offsetY: -this.height / 2 - 125
      },
      autoRotate: true,
      repeat: -1,
      yoyo: true,
      paused: true
      // onUpdate: function() {
      //   console.log(train.x, train.y);
      // },
      //   onComplete: tweenComplete, //call function tweenComplete
      //   onCompleteParams: ["done!"],
    };
     this.tween = gsap.to(train, options);
   */
