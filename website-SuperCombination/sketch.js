// sketch.js
let particles = [];

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('p5-container'); // Inserisce il canvas nel div
  for (let i = 0; i < 80; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  // Sfondo scuro con una leggera trasparenza per creare un effetto "scia"
  background(16, 0, 1, 60); 
  
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].display();
    particles[i].checkEdges();
  }
  drawConnections();
}

function drawConnections() {
  stroke(0, 163, 179, 40); // Colore accento (ciano) semitrasparente
  strokeWeight(1);
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      let d = dist(particles[i].pos.x, particles[i].pos.y, particles[j].pos.x, particles[j].pos.y);
      if (d < 120) {
        line(particles[i].pos.x, particles[i].pos.y, particles[j].pos.x, particles[j].pos.y);
      }
    }
  }
}

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = p5.Vector.random2D().mult(random(0.3, 1.2));
  }
  update() {
    this.pos.add(this.vel);
  }
  display() {
    noStroke();
    fill(0, 163, 179); // var(--color-accent)
    circle(this.pos.x, this.pos.y, 3);
  }
  checkEdges() {
    if (this.pos.x < 0 || this.pos.x > width) this.vel.x *= -1;
    if (this.pos.y < 0 || this.pos.y > height) this.vel.y *= -1;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}