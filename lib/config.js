const DEBUG_MODE = false;
const _WIDTH = 550;
const _HEIGHT = 550;
/**
 * Textures
 */
// const ASSET_REF = "assets/blueSheet.json";
const ASSET_REF = "assets/spritesheet.json";

const MAPS = ["01", "02", "03", "04", "05"];
const PROC_SEEDS = [
  "19",
  "0",
  "564",
  "55555",
  "28",
  "34",
  "22",
  "1",
  "2",
  "11",
  "7",
  "14",
  "20",
  "9",
  "23",
  "29",
  "3",
  "231",
  "6",
];

let alpha_v = 0.25;
if (DEBUG_MODE) {
  alpha_v = 0.5;
}

var gridStyle = {
  color: "0x000000",
  width: 1,
  alpha: alpha_v,
};

var railStyle = {
  color: "0x624A2E",
  width: 10,
  alpha: 1,
};

var switchStyle = {
  color: "0xddffff",
  width: 5,
  alpha: 0.75,
};

var station = {
  color: "0x000000",
  width: 2,
  alpha: 1,
};

/** Text Style */
var textStyle = {
  fontFamily: "Arial",
  fontSize: 20,
  align: "center",
};

var gridTextStyle = {
  fontFamily: "Arial",
  fontSize: 10,
  align: "center",
};

/**
 * @param 0: pink
 * @param 1: green
 * @param 2: dark
 * @param 3: ligthblue
 * @param 4: white
 * @param 5: purple
 * @param 6: yellow
 */
const COLORS = [
  "0xfa0375",
  "0x07fe00",
  "0x2c2c2c",
  "0x4acef5",
  "0xeff1f0",
  "0xb173bc",
  "0xfbec49",
];

/** Tiles */
const TILES = { x: 10, y: 10 };
const TILE_SHIFT = { x: 0, y: 49 };

/**MENU Design */
const TILE_COLOR = { p: "0xb9de59", s: "0xFEEDCF", h: "0x999999" };

const TEXT_STYLE_MENU = {
  fill: "0xD6AF50",
  fontFamily: "Georgia, serif",
  fontSize: 22,
  strokeThickness: 1,
};

const TEXT_STYLE_MENU_LEVEL_EDIT = {
  fill: "0xD6AF50",
  fontFamily: "Georgia, serif",
  fontSize: 15,
  strokeThickness: 1,
};

const TEXT_STYLE_MENU_2 = {
  fill: "0xffffff",
  fontFamily: "Georgia, serif",
  fontSize: 22,
  // strokeThickness: 1
};

const TEXT_STYLE_LEVEL_MENU = {
  fill: "silver",
  fontFamily: "Impact",
  fontSize: 64,
  strokeThickness: 2,
  align: "center",
  dropShadow: true,
  wordWrap: true,
};

const TEXT_STYLE_LEVEL_MENU_HEADER = {
  fill: "silver",
  fontFamily: "Tahoma",
  fontSize: 22,
  strokeThickness: 1,
  align: "center",
  dropShadow: true,
  // dropShadowColor: "yellow"
};

const MENU_TOP = {
  sprite: {
    primary: "banner_left.png",
    second: null,
    width: 182,
    height: 49,
  },
  text: { x_off: 53, y_off: 5, style: TEXT_STYLE_MENU },
  orientation: "T",
  width: 0,
  height: TILE_SHIFT.y,
  pos: { x: 0, y: 0 },
  margin: { x: 2, y: 0 },
  names: ["Time:", "Points:", "Missed:"],
  color: { p: "0xe38a31", s: "0xff9966" },
  interactive: false,
};

const r_w = 49;
const MENU_RIGHT = {
  sprite: {
    primary: "frame.png",
    second: null,
    width: 50,
    height: 30,
  },
  text: { x_off: 10, y_off: 0, style: TEXT_STYLE_MENU_LEVEL_EDIT },
  orientation: "R",
  width: r_w,
  height: 0,
  pos: { x: _WIDTH - r_w, y: 50 },
  margin: { x: 0, y: 5 },
  names: ["NE", "SE", "SW", "NW", "V", "H", "Station"],
  textures: ["rail_curve.png", "rail.png", "station.png"],
  texture_size: { w: 30, h: 22, xOff: 23, yOff: 13 },
  color: { p: "0x00c4fe", s: "0x1176AE" },
  interactive: true,
};

const MENU_SELECT = {
  sprite: {
    primary: "frame.png",
    second: null,
    width: 49,
    height: 49,
  },
  text: { x_off: 12, y_off: 5, style: TEXT_STYLE_MENU },
  orientation: "R",
  pos: { x: _WIDTH - 49, y: 420 },
  margin: { x: 0, y: 10 },
  names: ["Select:", "Save:"],
  textures: ["rail_curve.png", "save.png"],
  texture_size: { w: 30, h: 25, xOff: 23, yOff: 20 },
  color: { p: "0x00c4fe", s: "0x1176AE" },
  interactive: false,
};
