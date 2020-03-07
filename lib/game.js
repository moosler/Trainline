class Game {
  constructor(width, height, app, config = {}) {
    this.width = width;
    this.height = height;
    this.config = config;
    this.app = app;
    this.grid = new Grid(width, height, 10, 10);
    this.track = null;
    this.containers = [];
    this.trains = [];
    this.tween = null;
  }
  start() {
    this.loadTrack();
    this.addTrains();
    this.setContainers();
    this.drawContainers();
    this.startTicker();
    // console.log(this.grid);
  }
  startTicker() {
    let train = this.trains[0].graphic;
    // let path = this.getPath();
    let tile = this.grid.getTileFromPos(train.x, train.y);
    let bez = this.grid.getBezier(tile.x, tile.y);
    this.track.setIndex(tile.x, tile.y);

    let i = 0;
    let framePerTile = 20;
    this.app.ticker.autoStart = false;
    this.app.ticker.stop();

    this.app.ticker.add(delta => {
      let mod = i % framePerTile;
      if (mod == 0 && i > 1) {
        console.log(train);
        console.log(train.rotation);

        // tile = this.grid.getTileFromPos(train.x, train.y);

        tile = this.track.getNext();
        if (tile === false) {
          //kill train
        }
        bez = this.grid.getBezier(tile.x, tile.y);
      }
      let time = map(mod, 0, framePerTile, 0, 1);
      let pos = bez.getPos(time);
      let rot = bez.getOrient(time);
      console.log(rot);

      train.x = pos.x;
      train.y = pos.y;
      train.rotation -= 0.1 * delta;
      i++;
    });
  }

  setContainers() {
    let tileCon = this.grid.getAllTiles();
    this.addContainer(tileCon);
    let gridCon = this.grid.getGrid();
    this.addContainer(gridCon);
    let trainCon = this.getTrains();
    this.addContainer(trainCon);
  }
  addContainer(obj) {
    this.containers.push(obj);
  }
  drawContainers() {
    this.containers.forEach(el => {
      this.app.stage.addChild(el);
    });
  }
  loadTrack() {
    this.track = new Track("test");
    this.track.loadRoute();
    this.grid.setTrack(this.track);
  }
  getTrains() {
    const container1 = new PIXI.Container();
    this.trains.forEach(el => {
      container1.addChild(el.graphic);
    });
    return container1;
  }
  addTrains() {
    // let pos = this.grid.getMidpoint(5, 7);
    // let train = new Train({ x: pos.x, y: pos.y, r: this.grid.xWidth / 4 });
    let train = new Train({ x: 0, y: 0, r: this.grid.xWidth / 4 });
    this.addTrain(train);
  }
  addTrain(obj) {
    this.trains.push(obj);
  }
  getPath() {
    let len = this.track.route.length;
    let path = [];
    var xOffset = -this.width / 2;
    var yOffset = -this.height / 2;
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
