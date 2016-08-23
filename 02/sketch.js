// 02 Waves
// By Jaime Patarroyo

var numWaves = 40;
var waves = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
  background(255);
  smooth();
  
  for (var i=0; i<numWaves; i++)
    waves[i] = new Wave(random(width), random(height));
}

function draw() {
  for (var i=0; i<numWaves; i++){
    waves[i].update();
    waves[i].show();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(255);
  
  for (var i=0; i<numWaves; i++)
    waves[i] = new Wave(random(width), random(height));
}

function Wave(_x, _y){
  this.x = _x;
  this.y = _y;
  
  this.rad = 0;
  this.dir = 5;
  this.r = random(255);
  this.g = random(255);
  this.b = random(255);
  
  this.update = function(){
    this.r+= random(-5, 5);
    if (this.r<0 || this.r>255)
      this.r = constrain(this.r, 5, 250);
    this.g+= random(-5, 5);
    if (this.g<0 || this.g>255)
      this.g = constrain(this.g, 5, 250);
    this.b+= random(-5, 5);
    if (this.b<0 || this.b>255)
      this.b = constrain(this.b, 5, 250);

    this.rad+=this.dir;
    if ((dist(this.x, this.y, width, height)<abs(this.rad))
      && (dist(this.x, this.y, 0, height)<abs(this.rad))
      && (dist(this.x, this.y, width, 0)<abs(this.rad))
      && (dist(this.x, this.y, 0, 0)<abs(this.rad)))
      this.dir = -this.dir;
  }
  
  this.show = function(){
    strokeWeight(3);
    stroke(this.r, this.g, this.b);
    noFill();
    ellipse (this.x, this.y, this.rad*2, this.rad*2);
  }
};