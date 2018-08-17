var rad;
var mod;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rad = 10;
  mod = 0;
}

function draw() {
  background(50);
  stroke(240);
  strokeWeight(2);
    
  for(var i = 0; i < 364; i++){
    mod = random(dist(0,0, width/2, height/2));
    stroke(random(120,240));
    line((rad+mod)*(cos(radians(i)))+width/2, (rad+mod)*(sin(radians(i)))+height/2,
      (rad+mod)*(cos(radians(i+1)))+width/2, (rad+mod)*(sin(radians(i+1)))+height/2);
  }  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(50);
}
