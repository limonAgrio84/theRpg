class PoketMonster extends Person{
    constructor(config){
        super(config);
        this.player = config.player;
        this.isActive = true;
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

        if(dir === "up"){
            this.x = playerX;
            this.y = playerY+16;
            return;
        }
        else if(dir === "down"){
            this.x = playerX;
            this.y = playerY-16;
            return;
        } else if(dir === "left"){
            this.x = playerX +16;
            this.y = playerY;
            return;
        }else if (dir === "right"){
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
            this.x = -1000;
            this.y = -1000;
            console.log("ve a la pokeball!");
        }else{
            this.isActive = true
            this.direction = this.player.direction;
            console.log("sal de la pokeball!");
        }
    }
}