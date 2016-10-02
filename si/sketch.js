// SI
// By Jaime Patarroyo

var coordinates = [];
var system;
var c = 0;
var c2 = 2;
var c3 = 4;
var c4 = 6;
var c5 = 8;
var c6 = 10;
var c7 = 12;
var c8 = 14;
var c9 = 16;
var c10 = 18;

var r;
var g;
var b;
var rB;
var gB;
var bB;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //noCursor();
  background(255);
  smooth();

  // S
  coordinates.push(createVector(-0.16, -0.5));
  coordinates.push(createVector(-0.4, -0.6));
  coordinates.push(createVector(-0.63, -0.5));
  coordinates.push(createVector(-0.7, -0.3));
  coordinates.push(createVector(-0.6, -0.11));
  coordinates.push(createVector(-0.4, -0.03));
  coordinates.push(createVector(-0.2, 0.06));
  coordinates.push(createVector(-0.1, 0.25));
  coordinates.push(createVector(-0.2, 0.5));
  coordinates.push(createVector(-0.45, 0.6));
  coordinates.push(createVector(-0.7, 0.5));

  //I
  coordinates.push(createVector(0.56, -0.6));
  coordinates.push(createVector(0.56, -0.4));
  coordinates.push(createVector(0.56, -0.2));
  coordinates.push(createVector(0.56, 0.0));
  coordinates.push(createVector(0.56, 0.2));
  coordinates.push(createVector(0.56, 0.4));
  coordinates.push(createVector(0.56, 0.6));
  
  system = new ParticleSystem();

  r = random(255);
  g = random(255);
  b = random(255);

  rB = random(255);
  gB = random(255);
  bB = random(255);

}


function draw() {
  background(rB, gB, bB);
  
  if (c < coordinates.length) {
    system.addParticle(coordinates[c]);
    c++;
  } else {
    c = 0;
  }
  
  if (c2 < coordinates.length) {
    system.addParticle(coordinates[c2]);
    c2++;
  } else {
    c2 = 0;
  }
  
  if (c3 < coordinates.length) {
    system.addParticle(coordinates[c3]);
    c3++;
  } else {
    c3 = 0;
  }
  
  if (c4 < coordinates.length) {
    system.addParticle(coordinates[c4]);
    c4++;
  } else {
    c4 = 0;
  }
  
  if (c5 < coordinates.length) {
    system.addParticle(coordinates[c5]);
    c5++;
  } else {
    c5 = 0;
  }
  
  if (c6 < coordinates.length) {
    system.addParticle(coordinates[c6]);
    c6++;
  } else {
    c6 = 0;
  }
  
  if (c7 < coordinates.length) {
    system.addParticle(coordinates[c7]);
    c7++;
  } else {
    c7 = 0;
  }
  
  if (c8 < coordinates.length) {
    system.addParticle(coordinates[c8]);
    c8++;
  } else {
    c8 = 0;
  }
  
  if (c9 < coordinates.length) {
    system.addParticle(coordinates[c9]);
    c9++;
  } else {
    c9 = 0;
  }
  
  if (c10 < coordinates.length) {
    system.addParticle(coordinates[c10]);
    c10++;
  } else {
    c10 = 0;
  }

  translate(width / 2, height / 2);
  system.run();
  translate(0, 0);

  r += random(-3, 3);
  if (r < 0 || r > 255)
    r = constrain(r, 5, 250);
  g += random(-3, 3);
  if (g < 0 || g > 255)
    g = constrain(g, 5, 250);
  b += random(-3, 3);
  if (b < 0 || b > 255)
    b = constrain(b, 5, 250);

}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(rB, gB, bB);

}


function Particle(lvector) {
  this.location = lvector;

  this.velocity = createVector(random(-1, 1), random(-1, 1));
  this.acceleration = createVector(0, 0);
  this.lifespan = 255.0;

  this.run = function() {
    this.update();
    this.display();
  }

  this.update = function() {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.lifespan -= 2.0;
  }

  this.display = function() {
    noStroke();

    fill(r, g, b, this.lifespan);
    ellipse(this.location.x, this.location.y, 10, 10);
  }

  this.isDead = function() {
    if (this.lifespan < 0.0)
      return true;
    else
      return false;
  }

}


function ParticleSystem() {
  this.particles = [];

  this.addParticle = function(location) {
    var origin = location;
    var s;
    if (width < height) s = width;
    else s = height;
    this.particles.push(new Particle(createVector(origin.x * s / 2, origin.y * s / 2)));
  }

  this.run = function() {
    for (var i = this.particles.length - 1; i >= 0; i--) {
      var p = this.particles[i];
      p.run();
      if (p.isDead())
        this.particles.splice(i, 1);
    }
  }

}