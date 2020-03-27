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
    this.scenes = new Scene();
    this.frames = 0;
    this.tilesPassed = 0;
    this.speed = 30;
    this.levelIndex = -1;
    this.editMode = false; //set to true for LevelEditor
    this.timetable = {};
    this.status = false; //The Status of the Game
  }
  /** call vars global */
  setup() {
    game.screen.init();
    game.scenes.init();
    game.addStages();
    // game.scenes.showEndLevel("Hallllo");
    // game.loadTrack();
    app.ticker.autoStart = true;
    app.ticker.stop();
    app.ticker.add(delta => game.loop(delta));
  }
  addStages() {
    app.stage.sortableChildren = true;

    app.stage.addChild(this.grid.container);
    app.stage.addChild(this.screen.gameMenu);
    app.stage.addChild(this.scenes.container);

    this.setStatus();
  }
  setStatus(status = null) {
    if (status) {
      this.status = status;
    }
    let stat = this.status;
    // Run Level
    if (stat == 1) {
      app.ticker.start();
      this.scenes.selectLevel.container.visible = false;
      this.scenes.level.container.visible = false;
      this.grid.container.visible = true;
      this.screen.gameMenu.visible = true;
    }
    //End Level
    else if (stat == 2) {
      // app.ticker.stop();
      this.scenes.level.container.visible = true;
      this.grid.container.visible = false;
      this.screen.gameMenu.visible = false;
      this.scenes.selectLevel.container.visible = false;
    }
    //Start Menu
    else if (!stat) {
      this.grid.container.visible = false;
      this.scenes.level.container.visible = false;
      this.screen.gameMenu.visible = false;
      this.scenes.selectLevel.container.visible = true;
    }
  }

  loop(delta) {
    if (this.status == 1) {
      game.play(delta);
    }
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
    if (this.trains.length == 0 && this.tilesPassed >= maxProperty) {
      this.setStatus(2);
      let obj = this.calcSuccess();
      this.scenes.showEndLevel(obj);
    }
  }
  calcSuccess() {
    let point = this.player.points;
    let keys = Object.keys(this.timetable);
    let len = keys.length;
    let result = point / len;
    let text = "Level failed!";
    let stars = [];
    if (result == 1) {
      text = "Level complete";
      stars.push(true);
    } else if (result >= 0.9) {
      text = "Level complete";
      stars.push(true);
    } else if (result >= 0.75) {
      text = "Level complete";
      stars.push(true);
    }
    let obj = {
      text: text,
      stars: stars,
      points: this.player.getPoints(),
      time: parseInt(this.screen.time / 1000)
    };
    return obj;
  }
  incTickandAddTrain() {
    let tilesPassed = this.frames % this.speed;
    if (tilesPassed == 0) {
      if (this.timetable.hasOwnProperty(this.tilesPassed)) {
        this.addTrain(this.track.start, this.timetable[this.tilesPassed]);
      }
      this.tilesPassed++;
    }
    this.frames++;
  }
  setPoints(points = 1) {
    this.player.incPoint(points);
  }
  updatePassedTrains(points = 1) {
    this.player.incMissed(points);
  }

  loadTrack(map) {
    // let track = PIXI.loader.resources[map].data;
    let track = PIXI.loader.resources[current_map].data;
    console.log(current_map);

    console.log(PIXI.loader.resources[current_map]);

    if (!this) {
      game.track = new Track("test", track.track);
      game.track.loadRoute(game.grid.tiles);
      game.timetable = track.timetable;
    } else {
      this.track = new Track("test", track.track);
      this.track.loadRoute(this.grid.tiles);
      this.timetable = track.timetable;
    }
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
  levelEditor() {
    this.editMode = true;
    this.screen.swapVisibility(1);
    this.screen.swapVisibility(2);
  }
  nextLevel(number = false) {
    !number ? this.levelIndex++ : (this.levelIndex = number);
    //   // this.scenes.swapVisibility();
    this.reset();
    // current_map = "maps/" + MAPS[this.levelIndex] + ".json";
    // PIXI.Loader.shared
    //   .add(current_map)
    //   .on("progress", loadProgressHandler)
    //   // .onError.add(test)
    //   // .load(game.loadTrack(current_map));
    //   .onComplete.add(game.loadTrack(current_map));

    game.loadTrack(current_map);

    //only for debug only one train
    game.timetable = {
      "0": null
    };
  }
  reset() {
    app.stage.removeChild(this.grid.container);
    this.grid = new Grid(
      _WIDTH - MENU_RIGHT.width,
      _HEIGHT - MENU_TOP.height,
      TILES,
      TILE_SHIFT
    );
    app.stage.addChild(this.grid.container);
    this.track = null;
    this.player = {};
    this.player = new Player();
    this.frames = 0;
    this.tilesPassed = 0;
    this.trains = [];
    this.timetable = {};
    this.screen.reset();
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
