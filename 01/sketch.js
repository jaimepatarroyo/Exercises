// 01 Echo
// By Jaime Patarroyo

var x, y;
var rad;
var dir;
var r,g,b;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  noCursor();
  smooth();
  strokeWeight(3);
  
  x = random(width);
  y = random(height);
  rad = 0;
  dir = 1;
  r = random(255);
  g = random(255);
  b = random(255);
}

function draw() {
  x += random(-1, 1);
  y += random(-1, 1);
  
  r+= random(-5, 5);
  if (r<0 || r>255)
    r = constrain(r, 5, 250);
  g+= random(-5, 5);
  if (g<0 || g>255)
    g = constrain(g, 5, 250);
  b+= random(-5, 5);
  if (b<0 || b>255)
    b = constrain(b, 5, 250);
    
  stroke(r, g, b, 20);
  noFill();
  ellipse (x, y, rad*2, rad*2);
  rad+=dir;

  if ((dist(x, y, width, height)<abs(rad))
    && (dist(x, y, 0, height)<abs(rad))
    && (dist(x, y, width, 0)<abs(rad))
    && (dist(x, y, 0, 0)<abs(rad)))
    dir = -dir;
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
  x = random(width);
  y = random(height);
  rad = 0;
  dir = 1;
  r = random(255);
  g = random(255);
  b = random(255);
}