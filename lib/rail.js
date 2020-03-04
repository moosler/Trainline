class Rail {
    constructor(pos, name ="", mid = null) {
      this.style = {
        color: "0x624A2E",
        width: 10,
        alpha: 1
      };
      this.pos = pos;
      this.mid = mid;
      this.control = null;
      this.end = null;
      this.name = name;
      this.element = {};
    }
    get(){
      return this.element;
    }
    setLine(){
      this.element = new Line(this.pos, this.style);
    }
  
    /**
     * 
     * @param {*} width 
     * @param {*} height 
     * @param {*} type 
     */
    setCurve(width, height, type){
      let sign = 1;
      if(type == 2 || type == 3){
        sign = -1;
      }
      if(type == 0 || type == 3){
        this.pos = {x: this.mid.x+(width/2*sign), y: this.mid.y};
        this.end = {x: this.mid.x, y: this.mid.y- height / 2};
        this.control = {x1:  this.mid.x+(width/4*sign), y1: this.mid.y ,x2: this.mid.x, y2: this.mid.y-(height/4)};
        this.element = new Bezier(this.pos, this.control, this.end);
      }
      else{
        this.pos = {x: this.mid.x, y: this.mid.y+ height / 2};
        this.control = {x1:  this.mid.x, y1: this.mid.y+(height/4) ,x2: this.mid.x+(width/4*sign), y2: this.mid.y};
        this.end = {x: this.mid.x+(width/2*sign), y: this.mid.y};
        this.element = new Bezier(this.pos, this.control, this.end);
      }
      
    }
  }
  