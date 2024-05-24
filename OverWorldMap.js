class OverworldMap {
    constructor(config) {
        this.overworld = null;
        this.gameObjects = config.gameObjects;
        this.cutsceneSpaces = config.cutsceneSpaces || {};
        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;
        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;

        this.walls = config.walls || {};

        this.isCutscenePlaying = false;
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

    isSpaceTaken(currentX,currentY,direction){
        const {x,y} = utils.nextPosition(currentX,currentY,direction);
        return this.walls[`${x},${y}`] || false;
    }

    mountObjects(){
        Object.keys(this.gameObjects).forEach(key =>{
            let object = this.gameObjects[key];
            object.id = key
            //TODO: determine if this object is actually mount
            object.mount(this);
        })
    }

    addWall(x,y){
        this.walls[`${x},${y}`] = true;
    }

    removeWall(x,y){
        delete this.walls[`${x},${y}`];
    }

    moveWall(wasX,wasY,direction){
        this.removeWall(wasX,wasY);
        const {x,y} = utils.nextPosition(wasX,wasY,direction);
        this.addWall(x,y);
    }

    async startCutscene(events){
        this.isCutscenePlaying = true;
        for (let i = 0; i < events.length; i++){
            const eventHandler = new OverworldEvent({
                event: events[i],
                map: this,
            });
            await eventHandler.init();
        }
        this.isCutscenePlaying = false;

        //Resets NPC to do their behaviour loop
        Object.values(this.gameObjects).forEach(object => object.doBehaviorEvent(this));
       
    }

    checkForActionCutscene(){
        const girl = this.gameObjects["girl"];
        const nextCoords = utils.nextPosition(girl.x,girl.y,girl.direction);
        const match = Object.values(this.gameObjects).find(object =>{
            return`${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`;
        });
        if(!this.isCutscenePlaying && match && match.talking.length){
            this.startCutscene(match.talking[0].events)
          }
    }
    cheForFoostepCutscene(){
        const girl = this.gameObjects["girl"];
        const match = this.cutsceneSpaces[`${girl.x},${girl.y}`];
        if(!this.isCutscenePlaying && match){
            this.startCutscene(match[0].events)
        }
    }

    
}


window.OverworldMaps = {
    DemoRoom: {
        lowerSrc: "/images/maps/DemoRoom.png",
        upperSrc: "/images/maps/DemoUpper.png",
        gameObjects: {
            lugia: new PoketMonster({
                x: utils.withGrid(-100),
                y:utils.withGrid(-100),
                src: "images/poket-monsters/totodile.png",
                useShadow: true,
                //Solo si es un Pokemon Grande 
                //specialAnimation: 64,
                //Solo si es un Pokemon Grande 
                //specialSize: true,
                player: null 
            }),
            girl: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(4),
                y: utils.withGrid(6),
                src: "images/people/girlPokemon.png",
                useShadow: true,
                
            }),
            red : new Person({
                x:utils.withGrid(7),
                y:utils.withGrid(5),
                src:"images/people/redMod.png",
                useShadow: true,
                behaviorLoop: [

                ],
                talking: [
                    {
                        events:[
                            {type:"textMessage", text:"I need to eat that pizzaaa!!!"},
                            {type:"textMessage", text:"But I need to make sure that no one enters"}
                        ]
                    }
                ]
            }),
            npcA : new Person({
                x: utils.withGrid(5),
                y: utils.withGrid(10),
                src: "images/people/npc4.png",
                useShadow: true,
                behaviorLoop: [
                    {type: "stand", direction: "up", time: 3000},
                    {type: "stand", direction: "right", time: 4000},
                    {type: "stand", direction: "right", time: 2700},
                ],
                talking:[
                    {
                        events:[
                            {type:"textMessage", text:"Tengo hambre :/",faceHero: "npcA"},
                            {type:"textMessage", text:"Tengo hambre :/"},
                        ]
                    }
                ]
            })
        },
        walls: {
            [utils.asGridCoords(7,6)]:true,
            [utils.asGridCoords(7,7)]:true,
            [utils.asGridCoords(8,6)]:true,
            [utils.asGridCoords(8,7)]:true,
            [utils.asGridCoords(1,3)]:true,
            [utils.asGridCoords(2,3)]:true,
            [utils.asGridCoords(3,3)]:true,
            [utils.asGridCoords(4,3)]:true,
            [utils.asGridCoords(5,3)]:true,
            [utils.asGridCoords(5,4)]:true,
            [utils.asGridCoords(7,3)]:true,
            [utils.asGridCoords(7,2)]:true,
            [utils.asGridCoords(7,1)]:true,
            [utils.asGridCoords(7,4)]:true,
            [utils.asGridCoords(8,3)]:true,
            [utils.asGridCoords(9,3)]:true,
            [utils.asGridCoords(10,3)]:true,
            [utils.asGridCoords(5,2)]:true,
            [utils.asGridCoords(5,1)]:true,
            [utils.asGridCoords(0,4)]:true,
            [utils.asGridCoords(0,5)]:true,
            [utils.asGridCoords(0,6)]:true,
            [utils.asGridCoords(0,7)]:true,
            [utils.asGridCoords(0,8)]:true,
            [utils.asGridCoords(0,9)]:true,
            [utils.asGridCoords(1,10)]:true,
            [utils.asGridCoords(2,10)]:true,
            [utils.asGridCoords(3,10)]:true,
            [utils.asGridCoords(4,10)]:true,
            [utils.asGridCoords(6,10)]:true,
            [utils.asGridCoords(7,10)]:true,
            [utils.asGridCoords(8,10)]:true,
            [utils.asGridCoords(9,10)]:true,
            [utils.asGridCoords(10,10)]:true,
            [utils.asGridCoords(11,9)]:true,
            [utils.asGridCoords(11,8)]:true,
            [utils.asGridCoords(11,7)]:true,
            [utils.asGridCoords(11,6)]:true,
            [utils.asGridCoords(11,5)]:true,
            [utils.asGridCoords(11,4)]:true,
        },
        cutsceneSpaces: {
            [utils.asGridCoords(6,4)]: [
                {
                    events: [
                        {who: "red",type:"walk", direction:"left"},
                        {who: "red",type:"stand", direction:"up", time:500},
                        {who: "girl",type:"stand", direction:"down", time:1},
                        {type:"textMessage", text:"HEY!!!"},
                        {type:"textMessage", text:"you can not be in there!"},
                        {type:"textMessage", text:"if you want to leave I recommend you to go to the block with an arrow"},
                        {who: "red",type:"walk", direction:"right"},
                        {who: "girl",type:"walk", direction:"down"},
                        {who: "girl", type:"walk", direction: "left"},
                    ]
            }
        ],
        [utils.asGridCoords(5,10)]:[
            {
            events:[
                {type: "changeMap",map:"smallCity"}
            ]
        }]
    }
    },
    smallCity:{
        lowerSrc: "/images/maps/StreetNorthLower.png",
        upperSrc: "/images/maps/StreetNorthUpper.png",
        gameObjects:{
            lugia: new PoketMonster({
                x: utils.withGrid(-100),
                y:utils.withGrid(-100),
                src: "images/poket-monsters/totodile.png",
                useShadow: true,
                //Solo si es un Pokemon Grande 
                //specialAnimation: 64,
                //Solo si es un Pokemon Grande 
                //specialSize: true,
                player: null 
            }),
            girl: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(4),
                y: utils.withGrid(6),
                src: "images/people/girlPokemon.png",
                useShadow: true,
                
            }),
            npcB : new Person({
                x:utils.withGrid(3),
                y:utils.withGrid(8),
                src:"images/people/redMod.png",
                useShadow: true,
                behaviorLoop: [
                    {type: "stand", direction: "up", time: 1000},
                    {type: "stand", direction: "left", time: 700},
                    {type: "walk", direction: "right"},
                    {type: "stand", direction: "down", time: 1000},
                    {type: "stand", direction: "right", time: 700},
                    {type: "walk", direction: "left"},

                ],
                talking:[
                    {
                        events:[
                            {type:"textMessage", text:"You did it!",faceHero: "npcB"},
                            {type:"textMessage", text:"Welcome to the city"},
                        ]
                    }
                ]
        }),
    }
    
}
}

window.OverworldMaps.DemoRoom.gameObjects.lugia.player =  window.OverworldMaps.DemoRoom.gameObjects.girl;
window.OverworldMaps.smallCity.gameObjects.lugia.player =  window.OverworldMaps.smallCity.gameObjects.girl;