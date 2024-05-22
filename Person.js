class Person extends GameObjects{
    constructor(config){
        super(config);
        this.movingProgressRemaining = 0;
        this.isPlayerControlled = config.isPlayerControlled || false;

        this.directionUpdate = {
            "up": ["y",-1],
            "down": ["y",1],
            "left": ["x",-1],
            "right": ["x",1],
        }
    }

    update(state){
        //Set Character Direction to whatever behavior has
        if(this.movingProgressRemaining > 0){
            this.updatePosition();
        } else{

            //More cases for starting to walk will come her
            //
            //

            //Cae: We're keaboard ready and have arrow pressed
            if(this.isPlayerControlled && this.movingProgressRemaining === 0 && state.arrow){
                this.startBehavior(state,{
                    type:"walk",
                    direction: state.arrow,
                })
            }
            this.updateSprite(state);
        }
        
    }

    startBehavior(state,behavior){
        //set character to whatever behavior it has
        this.direction = behavior.direction;
        if(behavior.type = "walk"){
            //if theres a wall it would stop
            if(state.map.isSpaceTaken(this.x,this.y,this.direction)){
                return;
            }
            //is ready to walk
            state.map.moveWall(this.x,this.y,this.direction);
            this.movingProgressRemaining = 16;
            this.updateSprite(state);
        }
    }

    updatePosition(){
            const [property,change] = this.directionUpdate[this.direction];
            this[property] += change;
            this.movingProgressRemaining -= 1;
            if (this.movingProgressRemaining === 0){
                // we finished the walk!
                utils.emitEvent("PersonWalkingComplete",{
                    whoId: this.id
                });
            }
    }

    updateSprite(state){
        if(this.movingProgressRemaining > 0){
            this.sprite.setAnimation("walk-"+this.direction);
            return;
        }
        this.sprite.setAnimation("idle-"+this.direction);

    }
}