const app = new PIXI.Application({
  width: 800,
  height: 500,
  antialias: true,
  backgroundColor: 0xEEEEEE,
  resolution: window.devicePixelRatio || 1
});
document.body.appendChild(app.view);

const _width = app.renderer.view.width;
const _height = app.renderer.view.height;

let grid = new Grid(_width, _height, 10, 10);
app.stage.addChild(grid.drawGrid());

grid.setTile(5, 7);
let tiles = grid.getAllTiles();
app.stage.addChild(tiles);

let bezierLine = new PIXI.Graphics();
bezierLine.lineStyle(4, 0x000000, 1);
bezierLine.moveTo(32,128);
bezierLine.bezierCurveTo(32,20,224,20,224,128);
app.stage.addChild(bezierLine);

// let partialCircle = new PIXI.Graphics();
// partialCircle.lineStyle(10, 0x624A2E, 1);
// //centerX, centerY, circleRadius, startAngle, endAngle
// partialCircle.arc(64,64,64,3.14,5, false);
// partialCircle.x = 64;
// partialCircle.y = 416;
// app.stage.addChild(partialCircle);



console.log(grid);
