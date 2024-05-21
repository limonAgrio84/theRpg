class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;
        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;
    }

    drawLower(ctx,cameraPerson){
        const x = utils.withGrid(10.5)-cameraPerson.x;
        const y = utils.withGrid(6)-cameraPerson.y;
        ctx.drawImage(this.lowerImage,x,y);
    }

    drawUpper(ctx,cameraPerson){
        const x = utils.withGrid(10.5)-cameraPerson.x;
        const y = utils.withGrid(6)-cameraPerson.y;
        ctx.drawImage(this.upperImage,x,y);
    }

    
}


window.OverworldMaps = {
    DemoRoom: {
        lowerSrc: "/images/maps/DemoRoom.png",
        upperSrc: "/images/maps/DemoUpper.png",
        gameObjects: {
            lugia: new PoketMonster({
                x: utils.withGrid(0),
                y:utils.withGrid(0),
                src: "images/poket-monsters/totodile.png",
                useShadow: true,
                //Solo si es un Pokemon Grande specialAnimation: 64,
                //Solo si es un Pokemon Grande specialSize: true,
                player: null 
            }),
            girl: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(4),
                y: utils.withGrid(6),
                src: "images/people/girlPokemon.png",
                useShadow: true,
            }),
            hero : new Person({
                x:utils.withGrid(2),
                y:utils.withGrid(7),
                src:"images/people/redMod.png",
                useShadow: true
            }),
        
        }
    }
    
}

window.OverworldMaps.DemoRoom.gameObjects.lugia.player =  window.OverworldMaps.DemoRoom.gameObjects.girl;