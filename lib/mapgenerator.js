class MapGenerator {
  constructor() {
    this.init();
    this.seed = 123;
  }
  init() {
    game.addGrid();
    this.calcStations();
  }
  calcStations() {
    let num = this.getRand(2, COLORS.length);
    for (let i = 0; i <= num; i++) {
      let tile = this.getTile();
      let orientation = this.getRand(0, 4);

      tile.set(6, i, orientation);
      //   console.log(x, y);
    }
  }

  getTile() {
    let grid = game.grid;
    let endCondition = true;
    let end = 0;
    let tile;
    while (endCondition || end >= 50) {
      let x = this.getRand(0, grid.x);
      let y = this.getRand(0, grid.y);
      tile = grid.tiles[x][y];
      let neighbors = grid.getNeighbors(x, y, true);
      let filtered = neighbors.filter(tl => tl.type >= 0 && tl.type <= 6);
      if (filtered.length <= 0) {
        endCondition = false;
        break;
      }
      end++;
    }
    return tile;
  }

  getRand(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
