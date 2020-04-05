class Map {
  constructor(ramdomizer = null) {
    if (ramdomizer instanceof Randomizer) {
      this.rand = ramdomizer;
    } else {
      this.rand = new Randomizer(ramdomizer);
    }
  }
  saveMap() {
    let map = this.getMap();
    let json = JSON.stringify(map);
    this.download(json, "test.json");
  }
  getMap() {
    let data = game.grid.save();
    let map = this.createMapObject(data);
    return map;
  }
  createMapObject(map) {
    let timetable = this.createTimtable();
    let map_ = {
      track: map,
      timetable: timetable
    };
    return map_;
  }

  createTimtable() {
    let trains = this.rand.getRand(1, 10);
    let timetable = {};
    timetable[0] = null;
    let before = 0;
    for (let i = 0; i <= trains + 1; i++) {
      let mult = this.rand.getRand(4, 8);
      timetable[mult + before] = null;
      before = mult + before;
    }

    return timetable;
  }
  download(content, fileName, contentType = "text/plain") {
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }
}
