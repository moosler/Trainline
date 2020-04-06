var rect_style = {
  width: 5,
  color: 0x000000,
  alpha: 0.5
};

var offset_ = 100;
var rect_ = {
  x: TILE_SHIFT.x + offset_,
  y: TILE_SHIFT.y + 50,
  w: _WIDTH - r_w - offset_ - offset_,
  h: _HEIGHT - offset_ - offset_
};

var tint_ = "0xb66634";

class Scene {
  constructor() {
    // this.endLevel = new PIXI.Container();
    // this.endLevelWindow = new PIXI.Graphics();
    this.container = new PIXI.Container(); //Main Container
    this.selectLevel = {};
    this.level = {};
    // this.text = new PIXI.Text("", TEXT_STYLE_LEVEL_MENU);
  }
  init() {
    /**SCENE SELECT LEVEL ***/
    let size = {
      w: 502,
      h: 422
    };
    let buttonPos = { x: 110, y: -8 };
    let text = { txt: "Select Level", x: _WIDTH / 2, y: 90 };
    this.selectLevel = new Scenewindow("screen_h.png", size);
    this.selectLevel.addMenuText(text);
    this.selectLevel.addButtonGroup(buttonPos);
    this.selectLevel.addLevels(24);
    this.container.addChild(this.selectLevel.container);

    // /**SCENE ENDLEVEL ***/
    size = {
      w: 331,
      h: 355
    };
    buttonPos = { x: 100, y: 35 };
    text = { txt: "Level complete", x: _WIDTH / 2, y: 125 };
    this.level = new Scenewindow("screen_l.png", size);
    // this.level.zIndex = 1000;
    this.level.addMenuText(text);
    this.level.addButtonGroup(buttonPos);
    this.level.addStars();
    this.level.addLevelResult();
    this.container.addChild(this.level.container);
  }
  calcEndLevel(obj) {
    // this.level.container.visible = true;
    this.level.text_header.text = obj.text;
    for (let i = 0; i < 3; i++) {
      this.level.textures[i].visible = false;
      if (obj.stars > i) {
        this.level.textures[i].visible = true;
      }
    }
    this.level.text[0].text = obj.points;
    this.level.text[1].text = obj.time;
  }
  // swapVisibility() {
  //   this.level.container.visible = !this.level.container.visible;
  // }
  recalcLevels(l_index, player_selection) {
    let textures = this.selectLevel.textures;
    l_index;
    for (let i = 0; i < textures.length; i++) {
      const el = textures[i];
      let sprite_gold = new PIXI.Sprite(textureId["blank_gold.png"]);
      let sprite_blank = new PIXI.Sprite(textureId["blank.png"]);

      el.interactive = true;
      el.buttonMode = true;
      el.mousedown = function () {
        el.texture = sprite_gold.texture;
        game.player.selectedLevel = i;
        game.scenes.recalcLevels(game.levelIndex, game.player.selectedLevel);
      };
      el.mouseover = function (mouseData) {
        this.tint = "0xcccc00";
      };
      el.mouseout = function () {
        this.tint = "0xffffff";
      };
      let textureName = el.texture.textureCacheIds[0];
      if (textureName != "blank.png") {
        el.texture = sprite_blank.texture;
      }
      if (i === player_selection) {
        el.texture = sprite_gold.texture;
      }

      if (i > l_index) {
        break;
      }
    }
  }
  playButtonPressed() {
    //End Level
    if (game.status == 2) {
      game.setStatus();
    }
    //Select Level
    else if (!game.status) {
      let level = game.player.selectedLevel;
      game.nextLevel(level);
    }
  }
}

class Scenewindow {
  constructor(textureName, size) {
    this.sprite = new PIXI.Sprite(textureId[textureName]);
    this.size = size;
    this.container = new PIXI.Container();
    this.text_header = {};
    this.buttons = [];
    this.textures = [];
    this.text = [];
    this.init();
  }
  init() {
    this.sprite.width = this.size.w;
    this.sprite.height = this.size.h;
    this.sprite.position.set(
      (_WIDTH - this.sprite.width) / 2,
      (_HEIGHT - this.sprite.height) / 2
    );

    this.container.addChild(this.sprite);
  }
  addMenuText(text) {
    this.text_header = new PIXI.Text(text.txt, TEXT_STYLE_LEVEL_MENU_HEADER);
    this.text_header.anchor.set(0.5);
    this.text_header.x = text.x;
    this.text_header.y = text.y;
    this.container.addChild(this.text_header);
  }
  addLevels(number = 24) {
    let offset = 60;
    let modulo = 6;
    let y = 0;
    let yoff = 0;
    for (let i = 0; i < MAPS.length; i++) {
      let xoff = (i % modulo) * offset;
      if (i % modulo == 0 && i != 0) {
        y++;
        yoff = y * offset;
        xoff = 0;
      } else {
        yoff = y * offset;
      }

      let button = new PIXI.Sprite(textureId["blank_light.png"]);
      button.width = 50;
      button.height = 50;
      button.position.set(
        (_WIDTH - this.sprite.width) / 2 + 65 + xoff,
        (_HEIGHT - this.sprite.height) / 2 + 100 + yoff
      );

      //mouseover and mouseout see Scene.recalcLevels()

      this.textures.push(button);
      this.container.addChild(button);

      let windowTextLevel = new PIXI.Text(i + 1, TEXT_STYLE_LEVEL_MENU_HEADER);
      windowTextLevel.anchor.set(0.5);
      windowTextLevel.x = (_WIDTH - this.sprite.width) / 2 + 92 + xoff;
      windowTextLevel.y = (_HEIGHT - this.sprite.height) / 2 + 125 + yoff;
      this.container.addChild(windowTextLevel);
    }
  }
  addButtonGroup(buttonPos) {
    let buttons = ["select.png", "plus.png", "play.png"];
    let offset = 60;
    for (let i = 0; i < buttons.length; i++) {
      const name = buttons[i];
      let button = new PIXI.Sprite(textureId[name]);
      button.width = 50;
      button.height = 50;
      button.position.set(
        (_WIDTH - this.sprite.width) / 2 + buttonPos.x + offset * i,
        this.sprite.height + buttonPos.y
      );
      button.interactive = true;
      button.buttonMode = true;
      button.mouseover = function (mouseData) {
        this.tint = "0xcccc00";
      };
      button.mouseout = function () {
        this.tint = "0xffffff";
      };
      button.mousedown = function () {
        /**@todo refactor with callbacks */
        //LevelEditor
        if (i == 0) {
          game.setStatus(3);
        }
        // Map Generator
        else if (i == 1) {
          game.setAllNonVisible();
          game.generator = new MapGenerator();
        }
        // Play Button
        else if (i == 2) {
          game.scenes.playButtonPressed();
        }
      };

      this.buttons.push(button);
      this.container.addChild(button);
    }
  }
  addStars() {
    let stars = [];
    let star1 = new PIXI.Sprite(textureId["star.png"]);
    star1.width = 115;
    star1.height = 115;
    star1.position.set(this.sprite.x + 32, this.sprite.y + 75);
    star1.visible = false;
    stars.push(star1);
    this.container.addChild(star1);

    let star2 = new PIXI.Sprite(textureId["star.png"]);
    star2.width = 115;
    star2.height = 115;
    star2.position.set(this.sprite.width - 43, this.sprite.y + 75);
    star2.visible = false;
    stars.push(star2);
    this.container.addChild(star2);

    let star3 = new PIXI.Sprite(textureId["star.png"]);
    star3.width = 125;
    star3.height = 125;
    star3.position.set(this.sprite.x + 98, this.sprite.y + 51);
    star3.visible = false;
    stars.push(star3);
    this.container.addChild(star3);

    this.textures = stars;
  }
  addLevelResult() {
    let text1 = new PIXI.Text("Points: ", TEXT_STYLE_MENU);
    text1.anchor.set(0.5);
    text1.x = this.sprite.x + 98;
    text1.y = this.sprite.y + 190;
    this.container.addChild(text1);

    let text2 = new PIXI.Text("", TEXT_STYLE_MENU_2);
    text2.x = this.sprite.x + 140;
    text2.y = this.sprite.y + 175;
    this.text.push(text2);
    this.container.addChild(text2);

    let text3 = new PIXI.Text("Time: ", TEXT_STYLE_MENU);
    text3.anchor.set(0.5);
    text3.x = this.sprite.x + 98;
    text3.y = this.sprite.y + 240;
    this.container.addChild(text3);

    let text4 = new PIXI.Text("", TEXT_STYLE_MENU_2);
    text4.x = this.sprite.x + 140;
    text4.y = this.sprite.y + 225;
    this.text.push(text4);
    this.container.addChild(text4);
  }
}
