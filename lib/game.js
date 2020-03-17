let i = 0;
class Game {
  constructor(width, height, app, config = {}) {
    this.width = width;
    this.height = height;
    this.config = config;
    this.app = app;
    this.grid = new Grid(
      width - MENU_RIGHT.width,
      height - MENU_TOP.height,
      TILES,
      TILE_SHIFT
    );
    this.track = null;
    this.trains = [];
    this.screen = new Screen(width, height);
    this.player = new Player();
    this.scenes = [];
  }
  /** call vars global */
  setup() {
    game.createScenes();
    game.screen.init();
    game.loadTrack();

    game.addTrains();
    app.ticker.autoStart = false;
    app.ticker.stop();
    app.ticker.add(delta => game.loop(delta));
  }
  createScenes() {
    gameScene = new PIXI.Container();
    app.stage.addChild(gameScene);
    gameOverScene = new PIXI.Container();
    app.stage.addChild(gameOverScene);
    gameOverScene.visible = false;
    let message = new PIXI.Text("The End!", {
      fontFamily: "Futura",
      fontSize: "64px",
      fill: "white"
    });
    message.x = 120;
    message.y = app.stage.height / 2 - 32;
    gameOverScene.addChild(message);
  }

  loop(delta) {
    game.play(delta);
  }
  play(delta) {
    for (let i = 0; i < this.trains.length; i++) {
      let train = this.trains[i];
      let alive = train.step();
      if (alive === false) {
        this.addTrain(this.track.start);
        this.trains.splice(i, 1);
      }
    }
    let time = this.app.ticker.elapsedMS;
    this.screen.updateMenus(time);
  }

  loadTrack() {
    this.track = new Track("test");
    this.track.loadRoute(this.grid.tiles);
  }
  addTrains() {
    let startPos = this.track.start;
    this.addTrain(startPos);
  }

  addTrain(startpos) {
    let train = new Train(
      { x: startpos.pos.x, y: startpos.pos.y },
      { x: this.grid.col / 4, y: this.grid.row },
      this.track,
      startpos
    );
    // this.app.stage.addChild(train.graphic);
    this.grid.container.addChild(train.graphic);
    this.trains.push(train);
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
