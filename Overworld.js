class Overworld{
    constructor(config){
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
    }
    startGameLoop(){
      const step = () => {
        //console.log("FPS");
        //clear the canvas 
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);

        //the camera person
        const cameraPerson = this.map.gameObjects.girl;

        //Update all the objects before drawing
        Object.values(this.map.gameObjects).forEach(object =>{
          object.update({
            arrow: this.directionInput.direction,
            button: this.directionInput.button,
            map:this.map,
          })
        })

        //draw lower Image
        this.map.drawLower(this.ctx,cameraPerson);

        //draw GameObjects
        Object.values(this.map.gameObjects).sort((a,b) =>{
          return a.y -b.y;
        }).forEach(object =>{
          object.sprite.draw(this.ctx,cameraPerson);
        })

        //draw upper Image
        this.map.drawUpper(this.ctx,cameraPerson);


        requestAnimationFrame(()=>{
          step();
        })
      }
      step();
    }

    bindActionInput(){
      new KeyPressListener("Space", ()=>{
        //is there a person here to talk?
        this.map.checkForActionCutscene()
        
      })
    }

    bindGirlPosition(){
      document.addEventListener("PersonWalkingComplete",e => {
        if(e.detail.whoId === "girl"){
          //girl's position has change 
          this.map.cheForFoostepCutscene()
        }
      })
    }

    startMap(mapConfig){
      console.log(mapConfig);
      this.map = new OverworldMap(mapConfig);
      this.map.overworld = this;
      this.map.mountObjects();
    }

    init(){
      this.startMap(window.OverworldMaps.DemoRoom);
      this.bindActionInput();
      this.bindGirlPosition();
      this.directionInput = new InputDirection();
      this.directionInput.init()
      this.startGameLoop();

        this.map.startCutscene([
          {who: "girl" ,type: "walk", direction: "left"},
          {who: "npcA" ,type: "walk", direction: "up"},
          {who: "girl" ,type: "walk", direction: "left"},
          {who: "npcA" ,type: "walk", direction: "up"},
          {who: "girl" ,type: "walk", direction: "down"},
          {who: "girl" ,type: "walk", direction: "right"},
          {who: "npcA" ,type: "walk", direction: "up"},
          {who: "npcA" ,type: "walk",direction:"left"},
          {type:"textMessage", text:"The very first message!!"},

        ])


    }
}