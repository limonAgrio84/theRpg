class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;
        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;
    }

    drawLower(ctx){
        ctx.drawImage(this.lowerImage,0,0);
    }

    drawUpper(ctx){
        ctx.drawImage(this.upperImage,0,0);
    }

    
}


window.OverworldMaps = {
    DemoRoom: {
        lowerSrc: "/images/maps/DemoRoom.png",
        upperSrc: "/images/maps/KitchenUpper.png",
        gameObjects: {
            girl: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(4),
                y: utils.withGrid(6),
                src: "images/people/girlPokemon.png",
                useShadow: true,
            }),
            hero : new Person({
                isPlayerControlled: false,
                x:utils.withGrid(5),
                y:utils.withGrid(4),
                src:"images/people/redMod.png",
                useShadow: true
            })
        
        }
    }
    
}