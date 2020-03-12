class Game {
  constructor(width, height, app, config = {}) {
    this.width = width;
    this.height = height;
    this.config = config;
    this.app = app;
    this.grid = new Grid(width, height, 10, 10);
    this.track = null;
    this.trains = [];
  }
  start() {
    this.loadTrack();
    this.setContainers();
    this.addTrains();
    this.tick();
    // console.log(this.grid);
  }
  tick() {
    this.app.ticker.autoStart = false;
    this.app.ticker.stop();
    this.app.ticker.add(delta => this.loop(delta));
  }
  animate(time = performance.now()) {
    this.app.ticker.update(time);
    this.app.renderer.render(this.app.stage);
}

  loop(delta) {
    for (let i = 0; i < this.trains.length; i++) {
      let train = this.trains[i];

      let alive = train.step();
      if (alive === false) {
        this.addTrain(0, 0);
        this.trains.splice(i, 1);
      }
    }
  }

  setContainers() {
    this.grid.setTilesToApp(this.app);
  }
  loadTrack() {
    this.track = new Track("test");
    this.track.loadRoute(this.grid.tiles);
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
