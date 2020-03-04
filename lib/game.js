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
  }
  start() {
    this.loadTrack();
    this.addTrains();
    this.setContainers();
    this.drawContainers();
    this.startTicker();
    console.log(this.grid);
  }
  startTicker() {
    let train = this.trains[0].graphic;
    console.log(train);

    // https://greensock.com/get-started/#sequencing-with-timelines
    var tween = gsap.to(train, {
      duration: 1,
      //   y: -200,
      ease: "none",
      motionPath: {
        path: [
          { x: 0, y: 0 },
          { x: 20, y: 0 },
          { x: 30, y: -50 },
          { x: 50, y: -50 }
        ],
        type: "cubic"
      },
      autoRotate: true,
      repeat: -1,
      yoyo: true
      //   onUpdate: function() {
      //     console.log(train.y); //logs the value on each update.
      //   },
      //   onComplete: tweenComplete, //call function tweenComplete
      //   onCompleteParams: ["done!"],
    });

    // let path = this.getPath();

    /**chain graphics
     * var graphics = new PIXI.Graphics()
  .lineStyle(0)
  .beginFill(0xffffff, 1)
  .drawRect(0, 95, 800, 10)
  .beginFill(0x7FFF00)
  .drawCircle(400, 100,50) */

    // this.app.ticker.add(delta => {
    //   train.y -= 1 * delta;
    // });
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
    let pos = this.grid.getMidpoint(5, 7);
    let train = new Train({ x: pos.x, y: pos.y, r: this.grid.xWidth / 4 });
    this.addTrain(train);
  }
  addTrain(obj) {
    this.trains.push(obj);
  }
  getPath() {
    this.track.route.forEach(el => {
      let tile = this.grid.getTile(el.x, el.y);
      let element = tile.element;
      // let points = element.geometry;
      // console.log(points);
    });
  }

  /**Train */
  // let pos = grid.getMidpoint(5, 7);
  // let train = new Train({ x: pos.x, y: pos.y, r: grid.xWidth / 4 });
  // app.stage.addChild(train.container);

  // /**Ticker */
  // app.ticker.add(delta => {
  //   train.container.y -= 1 * delta;
  // });
}
