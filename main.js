gsap.registerPlugin(MotionPathPlugin);

const app = new PIXI.Application({
  width: 800,
  height: 500,
  antialias: true,
  backgroundColor: 0xeeeeee,
  resolution: window.devicePixelRatio || 1
});
document.body.appendChild(app.view);

// const _width = app.renderer.view.width;
// const _height = app.renderer.view.height;
const _width = 800;
const _height = 500;

let game = new Game(_width, _height, app);
game.start();
var tween = game.tween;

document.querySelector("body").onload = function() {
  document.querySelector("#play").onclick = () => tween.play();
  document.querySelector("#pause").onclick = () => tween.pause();
  document.querySelector("#resume").onclick = () => tween.resume();
  document.querySelector("#reverse").onclick = () => tween.reverse();
  document.querySelector("#restart").onclick = () => tween.restart();
};

/**Train */
// let pos = grid.getMidpoint(5, 7);
// let train = new Train({ x: pos.x, y: pos.y, r: grid.xWidth / 4 });
// app.stage.addChild(train.container);

// /**Ticker */
// app.ticker.add(delta => {
//   train.container.y -= 1 * delta;
// });
