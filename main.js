const app = new PIXI.Application({
  width: 800,
  height: 500,
  antialias: true,
  backgroundColor: 0x1099bb,
  resolution: window.devicePixelRatio || 1
});
document.body.appendChild(app.view);

const _width = app.renderer.view.width;
const _height = app.renderer.view.height;

let grid = new Grid(_width, _height, 10, 10);
app.stage.addChild(grid.drawGrid());

grid.setTile(0, 0);
grid.setTile(5, 5);
grid.setTile(5, 6);
grid.setTile(5, 7);
grid.setTile(2, 4, "railH");
grid.setTile(3, 4, "railH");
grid.setTile(4, 4, "railH");
grid.setTile(5, 4, "curveSW");
grid.setTile(1, 4, "curveNE");
grid.setTile(1, 3, "railV");
grid.setTile(1, 2, "curveSW");
grid.setTile(0, 2, "curveNE");
grid.setTile(0, 1, "railV");

let tiles = grid.getAllTiles();
app.stage.addChild(tiles);

/**Train */
let pos = grid.getMidpoint(5, 7);
let train = new Train({ x: pos.x, y: pos.y, r: grid.xWidth / 4 });
app.stage.addChild(train.container);

app.ticker.add(delta => {
  train.container.y -= 1 * delta;
});

console.log(grid);
