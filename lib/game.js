class Game {
  constructor(width, height, app, config = {}) {
    this.width = width;
    this.height = height;
    this.config = config;
    this.app = app;
    this.grid = {};
    this.track = null;
    this.trains = [];
    this.screen = new Screen(width, height);
    this.player = new Player();
    this.scenes = new Scene();
    this.containers = [];
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
    textureId = app.loader.resources[ASSET_REF].textures;
    let generator = false;
    generator = new MapGenerator();
    if (!generator) {
      game.screen.init();
      game.scenes.init();
      game.addStages();
      // game.scenes.showEndLevel("Hallllo");
      app.ticker.autoStart = true;
      app.ticker.stop();
      app.ticker.add(delta => game.loop(delta));
    }
  }
  addGrid() {
    this.grid = new Grid(
      _WIDTH - MENU_RIGHT.width,
      _HEIGHT - MENU_TOP.height,
      TILES,
      TILE_SHIFT
    );
    app.stage.addChild(this.grid.container);
  }
  addStages() {
    app.stage.sortableChildren = true;
    this.containers.push(this.screen.gameMenu);
    this.containers.push(this.screen.editMenu);
    this.containers.push(this.scenes.selectLevel.container);
    this.containers.push(this.scenes.level.container);

    // app.stage.addChild(this.grid.container);
    app.stage.addChild(this.screen.gameMenu);
    app.stage.addChild(this.screen.editMenu);
    app.stage.addChild(this.scenes.container);
    this.setStatus();
  }
  setAllNonVisible() {
    for (let i = 0; i < this.containers.length; i++) {
      const element = this.containers[i];
      element.visible = false;
    }
    if (this.grid.container) {
      this.grid.container.visible = false;
    }
  }
  setStatus(status = null) {
    this.status = status;
    let stat = this.status;
    // Run Level
    if (stat == 1) {
      app.ticker.start();
      this.setAllNonVisible();
      this.grid.container.visible = true;
      this.screen.gameMenu.visible = true;
    }
    //Select Level Menu
    else if (!stat) {
      this.scenes.recalcLevels(this.levelIndex);
      this.setAllNonVisible();
      this.scenes.selectLevel.container.visible = true;
    }
    //End Level
    else if (stat == 2) {
      this.setAllNonVisible();
      this.scenes.level.container.visible = true;
    }
    //Level Editor
    else if (stat == 3) {
      this.setAllNonVisible();
      this.editMode = true;
      this.addGrid();
      this.screen.editMenu.visible = true;
      this.grid.container.visible = true;
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
  checkEndContidion() {
    let keys = Object.keys(this.timetable);
    let maxProperty = Math.max(...keys);
    if (this.trains.length == 0 && this.tilesPassed >= maxProperty) {
      this.setStatus(2);
      let obj = this.calcSuccess();
      this.scenes.calcEndLevel(obj);
    }
  }
  calcSuccess() {
    let point = this.player.points;
    let keys = Object.keys(this.timetable);
    let len = keys.length;
    let result = point / len;
    let text = "Level failed!";
    let stars = 0;
    if (result == 1) {
      text = "Level complete";
      stars = 3;
    } else if (result >= 0.9) {
      text = "Level complete";
      stars = 2;
    } else if (result >= 0.75) {
      text = "Level complete";
      stars = 1;
    }
    let maxTrains = Object.keys(this.timetable).length;
    let obj = {
      text: text,
      stars: stars,
      points: this.player.getPoints() + " | " + maxTrains,
      time: parseInt(this.screen.time / 1000)
    };
    return obj;
  }

  setPoints(points = 1) {
    this.player.incPoint(points);
  }
  updatePassedTrains(points = 1) {
    this.player.incMissed(points);
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
    this.grid.container.addChild(train.graphic);
    this.trains.push(train);
  }

  loadTrack() {
    let track_loaded = app.loader.resources[current_map].data;
    this.track = new Track(track_loaded.track);
    this.track.loadRoute(this.grid.tiles);
    this.timetable = track_loaded.timetable;
    //only for debug only one train
    // this.timetable = {
    //   "0": null
    // };
    this.setStatus(1);
    this.clearRessources();
  }
  clearRessources() {
    for (var propt in app.loader.resources) {
      let strFour = propt.substring(0, 4);
      if (strFour == "maps" && propt != current_map) {
        delete app.loader.resources[propt];
      }
    }
  }
  nextLevel(number = false) {
    !number ? this.levelIndex++ : (this.levelIndex = number);
    // this.scenes.swapVisibility();
    this.reset();
    current_map = "maps/" + MAPS[this.levelIndex] + ".json";
    console.log(current_map);

    app.loader
      .add(current_map)
      .on("progress", loadProgressHandler)
      // .on("error", test)
      // .on("complete", game.loadTrack(current_map))
      .load(function(loader, resources) {
        game.loadTrack(current_map);
      });
  }
  reset() {
    if (this.grid.container) {
      app.stage.removeChild(this.grid.container);
      this.grid.container.removeChildren();
    }
    this.addGrid();
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
