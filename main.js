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

// app.stage.addChild(grid.drawGrid());

// grid.setTile(0, 0);
// app.stage.addChild(grid.drawElement(0, 0));

let style = {
  color: "0xff0000",
  width: 10,
  alpha: 1
};
let pos = {};
const container = new PIXI.Container();

pos.y1 = 10;
pos.x2 = 100;
pos.x1 = 10;
pos.y2 = 100;
var line = drawLine(pos, style);
container.addChild(line);

app.stage.addChild(container);

console.log(grid);
