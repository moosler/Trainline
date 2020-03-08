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
    this.setContainers();
    this.drawContainers();
    this.addTrains();
    this.tick();
    // console.log(this.grid);
  }
  // tempSetPoints(points) {
  //   let containerRot = new PIXI.Container();
  //   let gg1 = new Circle(points[0], 5, {
  //     width: 1,
  //     color: "0x009933",
  //     alpha: 1
  //   });
  //   let gg2 = new Circle(points[1], 5, {
  //     width: 1,
  //     color: "0x009933",
  //     alpha: 1
  //   });
  //   let gg3 = new Circle(points[2], 5, {
  //     width: 1,
  //     color: "0x009933",
  //     alpha: 1
  //   });
  //   let bb1 = new Circle(points[3]);
  //   let bb2 = new Circle(points[4]);
  //   let c = new Circle(points[5], 10, {
  //     width: 1,
  //     color: "0xCCCC66",
  //     alpha: 1
  //   });
  //   containerRot.addChild(gg1, gg2, gg3, bb1, bb2, c);
  //   this.app.stage.addChild(containerRot);
  //   return [gg1, gg2, gg3, bb1, bb2, c];
  // }
  // tempUpdateOrientPoiunts(points, values) {
  //   for (let i = 0; i < points.length; i++) {
  //     points[i].x = values[i].x;
  //     points[i].y = values[i].y;
  //   }
  // }
  tick() {
    // let train = this.trains[0].graphic;
    // let path = this.getPath();
    // let tile = this.grid.getTileFromPos(train.x, train.y);
    // let bez = this.grid.getBezier(tile.x, tile.y);

    /** */
    // let orientPoints = bez.getOrient(0);
    // let points = this.tempSetPoints(orientPoints);
    /** */

    let tick = 0;
    let tile, bez;
    let framePerTile = 20;
    this.app.ticker.autoStart = false;
    this.app.ticker.stop();

    this.app.ticker.add(delta => {
      let mod = tick % framePerTile;
      for (let i = 0; i < this.trains.length; i++) {
        let train = this.trains[i];
        let graphic = train.graphic;
        //Tile changed
        if (mod == 0) {
          tile = train.getTile();
          if (tile === false) {
            //kill train
            this.addTrain(0, 0);
            this.trains.splice(i, 1);
            // console.log(this.trains);

            // graphic.destroy(true);

            break;
          } else {
            bez = this.grid.getBezier(tile.x, tile.y);
          }
        }
        let time = map(mod, 0, framePerTile, 0, 1);
        let pos = bez.getPos(time);
        /** */
        // orientPoints = bez.getOrient(time);
        // this.tempUpdateOrientPoiunts(points, orientPoints);
        /** */
        train.update(pos);
      }

      tick++;
    });
  }

  setContainers() {
    let tileCon = this.grid.getAllTiles();
    this.addContainer(tileCon);
    let gridCon = this.grid.getGrid();
    this.addContainer(gridCon);
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
  // getTrains() {
  //   const container1 = new PIXI.Container();
  //   this.trains.forEach(el => {
  //     container1.addChild(el.graphic);
  //   });
  //   return container1;
  // }
  addTrains() {
    this.addTrain(0, 0, this.grid.xWidth / 4);
  }
  addTrain(x, y, r = this.grid.xWidth / 4) {
    let route = [...this.track.route];
    let train = new Train({ x: x, y: y, r: r }, route);
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
