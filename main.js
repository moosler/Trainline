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

PIXI.loader
  .add("assets/blueSheet.json")
  .on("progress", loadProgressHandler)
  .load(loadSprites);

let game = new Game(_width, _height, app);
game.start();
var ticker = game.app.ticker;

/**global functions */
function loadProgressHandler(loader, resource) {
  console.log("loading: " + resource.url);
  console.log("progress: " + loader.progress + "%");
}
function loadSprites() {
  let id = PIXI.loader.resources["assets/blueSheet.json"].textures;
  let button0 = new PIXI.Sprite(id["button00.png"]);
  let button1 = new PIXI.Sprite(id["button01.png"]);
  app.stage.addChild(button0);
}

function updateRoute(tile) {
  game.track.updateRoute(tile, game.selection);
}

function setSelection(index) {
  let val = MENU_NAMES_RIGHT[index];
  game.menus[2].updateMenu(0, val, false);
  game.selection = index;
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
    game.restart();
  };
};
