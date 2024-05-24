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
      new KeyPressListener("Enter", ()=>{
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

        //this.map.startCutscene([
          //{who: "girl" ,type: "walk", direction: "left"},
          //{who: "red" ,type: "walk", direction: "right"},
          //{who: "girl" ,type: "walk", direction: "left"},
          //{who: "red" ,type: "walk", direction: "left"},
          //{who: "girl" ,type: "walk", direction: "down"},
          //{who: "girl" ,type: "walk", direction: "right"},
          //{who: "red" ,type: "stand", direction: "right",time:700},
          //{who: "red" ,type: "stand", direction: "left",time:1000},
          //{type:"textMessage", text:"Hi, wellcome to the demo of fruitMonsters an open world rpg with tons of customization and variety"},
          //{type:"textMessage", text:"Take this totodile"},
          //{type:"textMessage", text:"Press p to take out of your pocket"},

        //])


    }
}