// gsap.registerPlugin(MotionPathPlugin);


const _width = 800;
const _height = 500;


const app = new PIXI.Application({
  width: _width,
  height: _height,
  antialias: true,
  backgroundColor: 0xeeeeee,
  resolution: window.devicePixelRatio || 1
});
document.body.appendChild(app.view);
let tiles = {x: 10, y: 10}
let game = new Game(_width, _height, app, tiles);

game.start();

var ticker = game.app.ticker;

/**global functions */
function updateRoute(tile) {
  game.track.updateRoute(tile, game.selection);
}

function setSelection(index) {
  let val = MENU_NAMES_RIGHT[index]
  game.menus[2].updateMenu(0, val, false);
  game.selection = index
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
