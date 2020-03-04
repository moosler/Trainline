class Game {
    constructor(width, height, app, config = {}) {
        this.width = width
        this.height = height
        this.config = config
        this.app = app
        this.grid = new Grid(width, height, 10, 10);
        this.track = null
        this.containers = []
        this.trains= []
    }
    start(){
        this.loadTrack();
        this.addTrains();
        // this.setContainers();
        this.drawContainers();
        this.startTicker();
        console.log(this.grid);
    }
    startTicker(){
        let train = this.trains[0].graphic;
        let path = this.getPath()
        this.app.ticker.add(delta => {
            train.y -= 1 * delta;
        });
    }
    setContainers(){
        // let tileCon = this.grid.getAllTiles();
        // this.addContainer(tileCon);
        // let gridCon = this.grid.getGrid()
        // this.addContainer(gridCon);
        let trainCon = this.getTrains();
        this.addContainer(trainCon);

    }
    addContainer(obj){
        this.containers.push(obj);
    }
    drawContainers(){
        this.containers.forEach(el => {
            this.app.stage.addChild(el);
        });
    }
    loadTrack(){
        this.track = new Track("test");
        this.track.loadRoute();
        this.grid.setTrack(this.track);
    }
    getTrains(){
        const container1= new PIXI.Container();
        this.trains.forEach(el => {
            container1.addChild(el.graphic);
        });
        return container1;
    }
    addTrains(){
        let pos = this.grid.getMidpoint(5, 7);
        let train = new Train({ x: pos.x, y: pos.y, r: this.grid.xWidth / 4 });
        this.addTrain(train);
    }
    addTrain(obj){
        this.trains.push(obj)
    }
    getPath(){
        this.track.route.forEach(el => {
            let tile = this.grid.getTile(el.x, el.y)
            let element = tile.element
            let points = element.geometry;
            console.log(points);
            
        });
    }

/**Train */
// let pos = grid.getMidpoint(5, 7);
// let train = new Train({ x: pos.x, y: pos.y, r: grid.xWidth / 4 });
// app.stage.addChild(train.container);

// /**Ticker */
// app.ticker.add(delta => {
//   train.container.y -= 1 * delta;
// });


}