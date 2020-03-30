/**
 * propertyName = the tileNumber the train is added
 * value = the colorInex for the train// if null a randowm color is added
 */
class Train {
  constructor(pos, dim, start, speed, color = 0) {
    this.pos = new Vector(pos);
    this.velocity = new Vector(1, 1);
    this.acceleration = new Vector(0, 0);
    this.dimension = dim;
    this.color = COLORS[color];
    this.graphic = {};
    this.tileIndex = 0;
    this.passedRails = 0;
    this.speed = speed; //Frames per Tile
    this.tick = 0;
    this.tile = start; //the current Tile the train is on
    this.road = {}; // the Bezier Line where the train is Here is the Position of the Train calculated
    this.tileBefore = null;
    this.direction = null; //direction: 0-3 clockwise start at 12
    this.init();
  }
  init() {
    let graphics = new PIXI.Graphics();
    graphics.beginFill(this.color);
    graphics.lineStyle(1, 0x4a5fb4, 1);
    graphics.drawPolygon([
      0,
      0,
      this.dimension.x,
      0,
      this.dimension.x / 2,
      this.dimension.y,
      0,
      0
    ]);
    graphics.endFill();
    graphics.pivot.x = graphics.width / 2;
    graphics.pivot.y = graphics.height / 2;
    this.graphic = graphics;

    let train = new PIXI.Sprite(textureId["train.png"]);
    train.width = 30;
    train.height = 30;
    train.scale.x *= -1; //flip the sprite
    train.anchor.set(0.5, 0.9);
    train.tint = this.color;
    this.graphic = train;

    this.direction = this.tile.direction;
  }
  setTile() {
    if (this.passedRails !== 1) {
      this.tileBefore = this.tile;
      let tile = this.tile.getNext(this);
      this.setDirection();
      this.tile = tile;
    }
  }
  setDirection() {
    let type = this.tile.type;
    //the direction only changes for curves
    if (type <= 3) {
      let rail = RAIL_TYPES[type].direction;
      this.direction = rail[this.direction].c;
    }
  }

  step() {
    let tick = this.getTicksPerTile();
    //change tile
    if (tick == 0) {
      this.passedRails += 1;
      this.setTile();
      if (!this.tile) {
        this.destroy();
        return false;
      }
      this.calcSwap();
    }
    this.update();
    return true;
  }
  calcSwap() {
    let line = this.tile.getLine();
    this.road = new BezierLine(line);
    let swap = this.tile.calcSwap(this.direction);
    if (swap) {
      this.road.swap();
    }
  }

  update() {
    let tick = this.getTicksPerTile();
    let time = map(tick, 0, this.speed, 0, 1);

    let pos = this.road.getPos(time);
    this.updateGraphic(pos);
    // this.move(pos);
    // this.posBefore.set(pos);
    this.tick++;
  }
  updateGraphic(pos) {
    this.graphic.x = pos.x;
    this.graphic.y = pos.y;
    // let angle = pos.h - Math.PI / 2; //rotate 90 degree
    let angle = pos.h - Math.PI; //rotate 180 degree
    this.graphic.rotation = angle;
  }
  getTicksPerTile() {
    return this.tick % this.speed;
  }
  destroy() {
    // this.graphic.destroy(true);
    game.grid.container.removeChild(this.graphic);
    this.road = {};
    this.graphic = {};
  }
  /**@deprecated */
  move(pos) {
    // this.velocity.add(this.acceleration);
    console.log("newPos: " + pos.x, pos.y);
    this.velocity.set(pos);
    this.velocity.sub(this.posBefore);
    this.velocity.normalize();
    // this.posBefore.sub(pos);
    // console.log( this.posBefore);
    // this.posBefore.normalize();
    console.log(this.velocity);
    this.pos.add(this.velocity);
    this.velocity.limit(this.speed);

    //rock example
    // translate(this.pos.x, this.pos.y);
    // rotate(this.vel.heading());

    // var angle = this.velocity.heading() + Math.PI / 2; //rotate 90 degree
    var angle = this.velocity.heading();
    this.graphic.x = this.pos.x;
    this.graphic.y = this.pos.y;
    this.graphic.rotation = -angle;
    // this.pos.rotate(angle);
    // translate(this.position.x, this.position.y);
    // rotate(angle);
  }
}
