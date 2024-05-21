class Sprite{
    constructor(config){
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = ()=>{
            this.isLoaded = true;
        }
        this.specialAnimation = config.specialAnimation;
        
        //shadows
        this.shadow = new Image();
        this.useShadow = config.useShadow;
        if (this.useShadow){
            this.shadow.src = "/images/people/shadow.png";
        }
        this.shadow.onload = ()=>{
            this.isShadowLoaded = true;
        }

        //Configure Animation & Initial State
        //la lista de los frames para las animaciones 
        this.animation = config.animation ||{
            "idle-down": [[0,0]],
            "idle-up": [[0,2]],
            "idle-right": [[0,1]],
            "idle-left": [[0,3]],
            "walk-down": [[1,0],[0,0],[3,0],[0,0]],
            "walk-up": [[0,2],[1,2],[2,2],[3,2]],
            "walk-right": [[0,1],[1,1],[2,1],[3,1]],
            "walk-left": [[0,3],[1,3],[2,3],[3,3]],
         };

         //el current animation y el frame en el que se encuentra 
         this.currentAnimation = "idle-down";
         this.currentAnimationFrame = 0;
         //los que se encargan de manejar el tiempo de duración de la animacion y cuanto le queda para acabar
         this.animationFrameLimit = 12;
         this.animationFrameProgress = this.animationFrameLimit;

         //GameObject
         this.gameObject = config.gameObject;        
    }

    get frame(){
        return this.animation[this.currentAnimation][this.currentAnimationFrame];
    }

    setAnimation(key){
        if (this.currentAnimation !== key){
            this.currentAnimation = key;
            this.currentAnimationFrame = 0;
            this.animationFrameProgress = this.animationFrameLimit;
        }
    }

    updateAnimationProgress(){
        if(this.animationFrameProgress > 0){
            this.animationFrameProgress -= 1;
            return;
        }

        //reset animationProgress
        this.animationFrameProgress = this.animationFrameLimit;
        this.currentAnimationFrame+= 1;
        
        if(this.frame === undefined){
            this.currentAnimationFrame = 0;
        }
    }

    draw(ctx){
        const x = this.gameObject.x -8;
        const y = this.gameObject.y -18;

        const [frameX,frameY] = this.frame;

        this.isLoaded && ctx.drawImage(this.image,
            frameX*this.specialAnimation,
            frameY*this.specialAnimation,
            this.specialAnimation,
            this.specialAnimation,
            x,
            y,
            this.specialAnimation,
            this.specialAnimation,
        )
        this.isShadowLoaded && ctx.drawImage(this.shadow,x,y);
        this.updateAnimationProgress();
    }

    

}