class SceneTransition{
    constructor(){
        this.element = null
    }
    createElement(){
        this.element = document.createElement("div");
        this.element.classList.add("Scenetransition");
        this.element.addEventListener("onanimationend",() =>{
            this.element.remove();
        },{once:true})
    }

    fadeOut(){
        console.log("hello")
        this.element.classList.add("fade-out");
        console.log(this.element.classList);
    }

    init(container, callback){
        this.createElement();
        container.appendChild(this.element);

        this.element.addEventListener("animationend",() =>{
            callback();
        },{once:true})
    }
}