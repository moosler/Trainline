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
    this.frames = 0;
    this.tilesPassed = 0;
    this.speed = 30;
    this.timetable = {};
  }
  /** call vars global */
  setup() {
    game.createScenes();
    game.screen.init();
    game.loadTrack();
    game.loadTimetable();
    app.ticker.autoStart = false;
    app.ticker.stop();
    app.ticker.add(delta => game.loop(delta));
  }
  createScenes() {
    gameScene = new PIXI.Container();
    app.stage.addChild(gameScene);
    endLevelScene = new PIXI.Container();
    app.stage.addChild(endLevelScene);
    endLevelScene.visible = false;
    let message = new PIXI.Text("Failed!", {
      fontFamily: "Futura",
      fontSize: "64px",
      fill: "white"
    });
    message.x = app.stage.width / 2 - 100;
    message.y = app.stage.height / 2 - 32;
    endLevelScene.addChild(message);
  }

  loop(delta) {
    game.play(delta);
  }
  play(delta) {
    for (let i = 0; i < this.trains.length; i++) {
      let train = this.trains[i];
      let alive = train.step();
      if (alive === false) {
        this.trains.splice(i, 1);
        this.checkEndContidion();
      }
    }
    let time = this.app.ticker.elapsedMS;
    this.screen.updateMenus(time, this.player);
    this.incTickandAddTrain();
  }
  checkEndContidion() {
    let keys = Object.keys(this.timetable);
    let maxProperty = Math.max(...keys);
    //Game Over
    if (this.trains.length == 0 && this.tilesPassed >= maxProperty) {
      endLevelScene.visible = true;
      app.ticker.stop();
    }
  }
  incTickandAddTrain() {
    let tilesPassed = this.frames % this.speed;
    if (tilesPassed == 0) {
      if (TRAINS.hasOwnProperty(this.tilesPassed)) {
        this.addTrain(this.track.start, this.timetable[this.tilesPassed]);
      }
      this.tilesPassed++;
    }
    this.frames++;
  }
  setPoints(points = 1) {
    this.player.incPoint(points);
  }

  loadTrack() {
    this.track = new Track("test");
    this.track.loadRoute(this.grid.tiles);
  }
  loadTimetable() {
    this.timetable = TRAINS;
  }

  addTrain(startpos, col = null) {
    let colorIndex;
    if (col) {
      colorIndex = col;
    } else {
      colorIndex = Math.floor(Math.random() * this.track.possibleColors.length);
    }
    let color = this.track.possibleColors[colorIndex];
    let train = new Train(
      { x: startpos.pos.x, y: startpos.pos.y },
      { x: this.grid.col / 4, y: this.grid.row },
      startpos,
      this.speed,
      color
    );
    // this.app.stage.addChild(train.graphic);
    this.grid.container.addChild(train.graphic);
    this.trains.push(train);
  }
}

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
