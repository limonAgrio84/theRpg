class InputDirection {
    constructor() {
        this.isUp = false
        this.heldDirections = [];
        this.heldbuttons = [];
        this.theButtonGet = null;

        this.map = {
            "KeyW":"up",
            "KeyS": "down",
            "KeyA":"left",
            "KeyD":"right"

        };
        this.buttonInputs ={
            "KeyP":"poket"
        }
    }

    get direction(){
        return this.heldDirections[0];

    }
    get button(){
        if(this.isUp){
            this.isUp = false
            return this.theButtonGet;
        }
        this.theButtonGet = null;
        return null;
    }
    init(){
        document.addEventListener("keydown", e =>{
            const dir = this.map[e.code];
            const input = this.buttonInputs[e.code];
            if (dir && this.heldDirections.indexOf(dir)===-1){
                this.heldDirections.unshift(dir);
            }else if (input && this.heldbuttons.indexOf(input)===-1){
                this.heldbuttons.unshift(input);
            }
        });
        document.addEventListener("keyup", e=>{
            const dir = this.map[e.code];
            const input = this.buttonInputs[e.code];
            const index = this.heldDirections.indexOf(dir);
            const inputIndex = this.heldbuttons.indexOf(input);
            if (index > -1) {
                this.heldDirections.splice(index,1);
            }
            if(inputIndex > -1){
                this.isUp = true;
                this.theButtonGet = this.heldbuttons[0];
                this.heldbuttons.splice(inputIndex,1);
            }
        });
    }
}
