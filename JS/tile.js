class tile{
    constructor(layer,x,y,tileX,tileY){
        this.layer=layer
        this.position={x:x,y:y}
        this.tilePosition={x:tileX,y:tileY}
    }
    display(){
        this.layer.push()
        this.layer.translate(this.position.x,this.position.y)
        this.layer.fill(120)
        this.layer.noStroke()
        regPoly(this.layer,0,0,6,44,20,0)
        this.layer.fill(0)
        this.layer.textSize(10)
        this.layer.text(this.tilePosition.x+','+this.tilePosition.y,0,0)
        this.layer.pop()
    }
}