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

console.log(grid);

// drawGrid();
