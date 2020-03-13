// gsap.registerPlugin(MotionPathPlugin);

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

var ticker = game.app.ticker;

/**global function */
function updateRoute(tile) {
  game.track.updateRoute(tile);
}

document.querySelector("body").onload = function() {
  (document.querySelector("#play").onclick = () => {
    // tween.play();
    ticker.start();
  }),
    (document.querySelector("#pause").onclick = () => {
      // tween.pause()
      ticker.stop();
    });
  document.querySelector("#step").onclick = () => {
    // tween.resume()
    ticker.stop();
    ticker.update();
    ticker.stop();
  };
  document.querySelector("#step10").onclick = () => {
    // tween.reverse()
    ticker.stop();
    for (let i = 0; i < 10; i++) {
      ticker.update();
    }
    ticker.stop();
  };
  document.querySelector("#restart").onclick = () => {
    // tween.restart()
    game.restart()
  };
};
