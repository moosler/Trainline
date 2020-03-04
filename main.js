gsap.registerPlugin(MotionPathPlugin);

const app = new PIXI.Application({
  width: 800,
  height: 500,
  antialias: true,
  backgroundColor: 0xeeeeee,
  resolution: window.devicePixelRatio || 1
});
document.body.appendChild(app.view);

const _width = app.renderer.view.width;
const _height = app.renderer.view.height;

let game = new Game(_width, _height, app);
game.start();

/**Train */
// let pos = grid.getMidpoint(5, 7);
// let train = new Train({ x: pos.x, y: pos.y, r: grid.xWidth / 4 });
// app.stage.addChild(train.container);

// /**Ticker */
// app.ticker.add(delta => {
//   train.container.y -= 1 * delta;
// });
