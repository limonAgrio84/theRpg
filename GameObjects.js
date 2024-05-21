class GameObjects{
    constructor(config){
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = config.direction || "down";
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "images/people/redMod.png",
            useShadow: config.useShadow || false,
            specialAnimation: config.specialAnimation || 32,
        });
    }
    update(){

    }
}