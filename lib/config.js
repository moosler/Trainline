var gridStyle = {
  color: "0x000000",
  width: 1,
  alpha: 0.5
};

var railStyle = {
  color: "0x624A2E",
  width: 10,
  alpha: 1
};

var station = {
  color: "0x000000",
  width: 2,
  alpha: 1
};

/** Text Style */
var textStyle = {
  fontFamily: "Arial",
  fontSize: 20,
  align: "center"
};

var gridTextStyle = {
  fontFamily: "Arial",
  fontSize: 10,
  align: "center"
};

/** Tiles */
const TILES = { x: 10, y: 10 };
const TILE_SHIFT = { x: 0, y: 49 };

/**MENU Design */
const TILE_COLOR = { p: "0xb9de59", s: "0xFEEDCF" };
const _WIDTH = 800;
const _HEIGHT = 500;
const MENU_TOP = {
  sprite: {
    primary: "button13.png",
    second: null
  },
  textOffset: { x: 15, y: 3 },
  orientation: "T",
  width: 0,
  height: TILE_SHIFT.y,
  pos: { x: 0, y: 0 },
  margin: { x: 10, y: 0 },
  names: ["Time:", "Points:"],
  color: { p: "0xe38a31", s: "0xff9966" },
  interactive: false
};

const r_w = 49;
const MENU_RIGHT = {
  sprite: {
    primary: "button08.png",
    second: "button13.png"
  },
  textOffset: { x: 5, y: 0 },
  orientation: "R",
  width: r_w,
  height: 0,
  pos: { x: _WIDTH - r_w, y: 0 },
  margin: { x: 0, y: 10 },
  names: [
    "Curve NE",
    "Curve SE",
    "Curve SW",
    "Curve NW",
    "Vertical",
    "Horizontal",
    "Station"
  ],
  color: { p: "0x00c4fe", s: "0x1176AE" },
  interactive: true
};

const MENU_SELECT = {
  sprite: {
    primary: "button08.png",
    second: null
  },
  textOffset: { x: 5, y: 0 },
  orientation: "T",
  pos: { x: _WIDTH - 49, y: 400 },
  margin: { x: 0, y: 10 },
  names: ["Select:"],
  color: { p: "0x00c4fe", s: "0x1176AE" },
  interactive: false
};
