class Scene {
  constructor() {
    this.play = new PIXI.Container();
    this.endLevel = new PIXI.Container();
    this.text = new PIXI.Text("", {
      fontFamily: "Futura",
      fontSize: "64px",
      align: "center",
      dropShadow: true,
      strokeThickness: 2,
      wordWrap: true,
      fill: "white"
    });
    this.init();
  }
  init() {
    app.stage.addChild(this.play);
    app.stage.addChild(this.endLevel);
    this.endLevel.visible = false;
    this.text.x = app.stage.width / 2;
    this.text.y = app.stage.height / 2 - 32;
    this.text.anchor.set(0.5);
    this.endLevel.addChild(this.text);
  }
  showEndLevel(val) {
    this.text.text = val;
    this.endLevel.visible = true;
    app.ticker.stop();
  }
}
