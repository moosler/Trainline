// gsap.registerPlugin(MotionPathPlugin);
const assetRef = "assets/blueSheet.json";
var gameScene, gameOverScene, textureId;
let options = {
  width: _WIDTH,
  height: _HEIGHT,
  antialias: true,
  backgroundColor: 0xeeeeee,
  resolution: window.devicePixelRatio || 1
};
const sprites = {};
const app = new PIXI.Application(options);
document.body.appendChild(app.view);

let game = new Game(_WIDTH, _HEIGHT, app);

PIXI.Loader.shared
  .add(assetRef)
  .on("progress", loadProgressHandler)
  .load(game.setup);

/**global functions */
function map(n, start1, stop1, start2, stop2) {
  const newval = ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
  return newval;
}
function loadProgressHandler(loader, resource) {
  console.log("loading: " + resource.url);
  console.log("progress: " + loader.progress + "%");
}

function updateRoute(tile) {
  game.track.updateRoute(tile, game.selection);
}

function setSelection(index) {
  let val = MENU_NAMES_RIGHT[index];
  game.menus[2].updateMenu(0, val, false);
  game.selection = index;
}
/** ============ */

document.querySelector("body").onload = function() {
  (document.querySelector("#play").onclick = () => {
    // tween.play();
    app.ticker.start();
  }),
    (document.querySelector("#pause").onclick = () => {
      // tween.pause()
      app.ticker.stop();
    });
  document.querySelector("#step").onclick = () => {
    // tween.resume()
    app.ticker.stop();
    app.ticker.update();
    app.ticker.stop();
  };
  document.querySelector("#step10").onclick = () => {
    // tween.reverse()
    app.ticker.stop();
    for (let i = 0; i < 10; i++) {
      app.ticker.update();
    }
    app.ticker.stop();
  };
  document.querySelector("#restart").onclick = () => {
    // tween.restart()
    game.restart();
  };
};
