class GameObjects{
    constructor(config){
        this.id = null;
        this.isMounted = false;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = config.direction || "down";
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "images/people/redMod.png",
            useShadow: config.useShadow || false,
            specialAnimation: config.specialAnimation || 32,
        });

        this.behaviorLoop = config.behaviorLoop || []
        this.behaviorLoopIndex = 0;
    }
    mount(map){
        console.log("mounting");
        this.isMounted = true;
        map.addWall(this.x,this.y);

        //Add a small delay to let everything load first
        setTimeout(()=>{
            this.doBehaviorEvent(map);
        },10)
    }

    update(){
        
    }

    async doBehaviorEvent(map){

        if (map.isCutscenePlaying || this.behaviorLoop.lenght === 0){
            return;
        }

        let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
        eventConfig.who = this.id;

        const eventHandler = new OverworldEvent({map, event: eventConfig});
        await eventHandler.init();

        this.behaviorLoopIndex += 1;
        if(this.behaviorLoopIndex === this.behaviorLoop.length){
            this.behaviorLoopIndex = 0;
        }
        this.doBehaviorEvent(map);
    }
}