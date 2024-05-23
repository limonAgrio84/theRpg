class KeyPressListener{
    constructor(keyCode,callback){
        let keySafe = true;
        this.keydownFunction = function(event){
            if(event.code === keyCode){
                if(keySafe){
                    keySafe = false;
                    callback();
                }
            }
         };
         this.keyupFunction = function(event){
            if(event.code === keyCode){
                keySafe = true;
            }

        };
        document.addEventListener("keydown",this.keydownFunction);
        document.addEventListener("keyup",this.keyupFunction);
    }

    unbind(){
        document.addEventListener("keydown",this.keydownFunction);
        document.addEventListener("keyup",this.keyupFunction);

    }
 }