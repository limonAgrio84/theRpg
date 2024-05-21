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
          })
        })

        //draw lower Image
        this.map.drawLower(this.ctx,cameraPerson);

        //draw GameObjects
        Object.values(this.map.gameObjects).forEach(object =>{
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

    init(){
      this.map = new OverworldMap(window.OverworldMaps.DemoRoom);

      this.directionInput = new InputDirection();
      this.directionInput.init()
      this.startGameLoop();

    }
}