// SI
// By Jaime Patarroyo

var coordinates = [];
var systems = [];
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

  r = random(255);
  g = random(255);
  b = random(255);

  rB = random(255);
  gB = random(255);
  bB = random(255);

  var size;
  if (width < height)
    size = width;
  else
    size = height;

  for (var i = 0; i < coordinates.length; i++) {
    systems.push(new ParticleSystem(createVector(coordinates[i].x * size / 2, coordinates[i].y * size / 2)));
  }

}


function draw() {
  background(rB, gB, bB);

  translate(width / 2, height / 2);
  for (var j = 0; j < systems.length; j++) {
    systems[j].run();
    systems[j].addParticle();

  }
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
  background(255);

  systems = [];
  var size;
  if (width < height)
    size = width;
  else
    size = height;

  for (var i = 0; i < coordinates.length; i++) {
    systems.push(new ParticleSystem(createVector(coordinates[i].x * size / 2, coordinates[i].y * size / 2)));
  }

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


function ParticleSystem(location) {
  this.origin = location;
  this.particles = [];

  this.addParticle = function() {
    this.particles.push(new Particle(createVector(this.origin.x, this.origin.y)));
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