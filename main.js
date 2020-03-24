// gsap.registerPlugin(MotionPathPlugin);

const START_LEVEL = 0;
var current_map = "maps/" + MAPS[START_LEVEL] + ".json";

var textureId;
let options = {
  width: _WIDTH,
  height: _HEIGHT,
  antialias: true,
  backgroundColor: 0xeeeeee,
  resolution: window.devicePixelRatio || 1
};
const app = new PIXI.Application(options);
document.body.appendChild(app.view);

let game = new Game(_WIDTH, _HEIGHT, app);

PIXI.Loader.shared
  .add(ASSET_REF)
  .add(current_map)
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
  if (DEBUG_MODE) {
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
    document.querySelector("#levelEdit").onclick = () => {
      game.levelEditor();
    };
  }
};
