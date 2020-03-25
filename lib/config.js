const DEBUG_MODE = true;
const _WIDTH = 550;
const _HEIGHT = 550;
/**
 * Textures
 */
// const ASSET_REF = "assets/blueSheet.json";
const ASSET_REF = "assets/spritesheet.json";

const MAPS = ["01", "02", "03"];

let alpha_v = 0.25;
if (DEBUG_MODE) {
  alpha_v = 0.5;
}

var gridStyle = {
  color: "0x000000",
  width: 1,
  alpha: alpha_v
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
  "0x1c1c1c",
  "0x4acef5",
  "0xeff1f0",
  "0xb173bc",
  "0xfbec49"
];

/** Tiles */
const TILES = { x: 10, y: 10 };
const TILE_SHIFT = { x: 0, y: 49 };

/**MENU Design */
const TILE_COLOR = { p: "0xb9de59", s: "0xFEEDCF", h: "0x999999" };

const TEXT_STYLE_MENU = {
  fill: "silver",
  fontFamily: "Impact",
  fontSize: 20,
  strokeThickness: 1
};

const TEXT_STYLE_LEVEL_MENU = {
  fill: "silver",
  fontFamily: "Impact",
  fontSize: 64,
  strokeThickness: 2,
  align: "center",
  dropShadow: true,
  wordWrap: true
};

const TEXT_STYLE_LEVEL_MENU_HEADER = {
  fill: "silver",
  fontFamily: "Tahoma",
  fontSize: 22,
  strokeThickness: 1,
  align: "center",
  dropShadow: true,
  dropShadowColor: "yellow"
};

const MENU_TOP = {
  sprite: {
    primary: "banner_left.png",
    second: null,
    width: 190,
    height: 49
  },
  text: { x_off: 53, y_off: 5 },
  orientation: "T",
  width: 0,
  height: TILE_SHIFT.y,
  pos: { x: 0, y: 0 },
  margin: { x: 10, y: 0 },
  names: ["Time:", "Points:", "Missed:"],
  color: { p: "0xe38a31", s: "0xff9966" },
  interactive: false,
  visible: true
};

const r_w = 49;
const MENU_RIGHT = {
  sprite: {
    primary: "blank.png",
    second: "blank_light.png",
    width: 49,
    height: 49
  },
  text: { x_off: 15, y_off: 5 },
  orientation: "R",
  width: r_w,
  height: 0,
  pos: { x: _WIDTH - r_w, y: 0 },
  margin: { x: 0, y: 10 },
  names: ["NE", "SE", "SW", "NW", "V", "H", "Station"],
  color: { p: "0x00c4fe", s: "0x1176AE" },
  interactive: true,
  visible: false
};

const MENU_SELECT = {
  sprite: {
    primary: "blank.png",
    second: null,
    width: 49,
    height: 49
  },
  text: { x_off: 15, y_off: 5 },
  orientation: "T",
  pos: { x: _WIDTH - 49, y: 400 },
  margin: { x: 0, y: 10 },
  names: ["Select:"],
  color: { p: "0x00c4fe", s: "0x1176AE" },
  interactive: false,
  visible: false
};
