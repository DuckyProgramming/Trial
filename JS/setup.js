function setup(){
    createCanvas(windowWidth-50,windowHeight-50)
    setupGraphics()

    current=new battle(graphics.main,game.player)
}
function windowResized(){
    resizeCanvas(windowWidth-50,windowHeight-50)
}
/*
Make Twin Strike
*/