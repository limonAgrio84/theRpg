class PoketMonster extends Person{
    constructor(config){
        super(config);
        this.player = config.player;
        this.isActive = false;
        this.specialSize = config.specialSize || false;
    }

    update(state){
        this.checkPocket(state);
        if(this.isActive){
        this.followThePlayer();
        this.updateSprite(state);
        if (this.movingProgressRemaining > 0) {
            this.movingProgressRemaining--; // Restar 1 al progreso de movimiento si aún se está moviendo
        }
        if(this.movingProgressRemaining === 0 && state.arrow){
            this.direction = state.arrow;
            this.movingProgressRemaining = 16;
        }

    }
}
    followThePlayer(){
        const playerX = this.player.x;
        const playerY = this.player.y;
        const dir = this.player.direction;
        if(dir === "up" && this.specialSize){
            this.x = playerX-15;
            this.y = playerY+8;
            return;
        }
        if(dir === "up"){
            this.x = playerX;
            this.y = playerY+16;
            return;
        }
        if(dir === "down" && this.specialSize){
            this.x = playerX-15;
            this.y = playerY-48;
            return;
        }
        else if(dir === "down"){
            this.x = playerX;
            this.y = playerY-16;
            return;
        }
        if(dir === "left" && this.specialSize){
            this.x = playerX+16;
            this.y = playerY-25;
            return;
        }
         else if(dir === "left"){
            this.x = playerX +16;
            this.y = playerY;
            return;
        }
        if(dir === "right" && this.specialSize){
            this.x = playerX-48;
            this.y = playerY-25;
            return;
        }
        else if (dir === "right"){
            this.x = playerX -16;
            this.y = playerY;
            return;
        } 
        
    }
    updateSprite(state) {
        if (this.movingProgressRemaining === 0 && !state.arrow) {
            this.sprite.setAnimation("walk-" + this.direction);
        }
        if (this.movingProgressRemaining > 0) {
            this.sprite.setAnimation("walk-" + this.direction);
        }

}

    checkPocket(state) {
        const pocket = state.button;
        if (pocket === "poket") {
            this.toogleIsActive();
        }
    }

    toogleIsActive(){
        if(this.isActive){
            this.isActive = false;
            this.x = -100;
            this.y = -100;
            console.log("ve a la pokeball!");
        }else{
            this.isActive = true
            this.direction = this.player.direction;
            console.log("sal de la pokeball!");
        }
    }
}