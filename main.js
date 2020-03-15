// gsap.registerPlugin(MotionPathPlugin);
const _width = 800;
const _height = 500;
const assetRef = "assets/blueSheet.json";
var gameScene, gameOverScene;
let options = {
  width: _width,
  height: _height,
  antialias: true,
  backgroundColor: 0xeeeeee,
  resolution: window.devicePixelRatio || 1
};
const sprites = {};
const app = new PIXI.Application(options);
document.body.appendChild(app.view);

let game = new Game(_width, _height, app);

PIXI.Loader.shared
  .add(assetRef)
  .on("progress", loadProgressHandler)
  .load(setup);

function setup() {
  app.ticker.autoStart = false;
  app.ticker.stop();
  gameScene = new PIXI.Container();
  app.stage.addChild(gameScene);
  gameOverScene = new PIXI.Container();
  app.stage.addChild(gameOverScene);
  gameOverScene.visible = false;
  let message = new PIXI.Text("The End!", {
    fontFamily: "Futura",
    fontSize: "64px",
    fill: "white"
  });
  message.x = 120;
  message.y = app.stage.height / 2 - 32;
  gameOverScene.addChild(message);
  game.screen.initSprites();
  app.ticker.add(delta => game.loop(delta));
}

/**global functions */
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
