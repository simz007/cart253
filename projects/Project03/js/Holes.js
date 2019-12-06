// Holes
//
// A class that represents Black holes in space
// that will appear on screen and could make the player loose health

class Holes {

  // constructor
  //
  // Sets the initial values for the hole's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, radius, holeImg) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = speed;
    this.vy = 0;
    // Health properties
    this.maxHealth = radius;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    // Display properties
    this.holeImg = holeImg;
    this.radius = radius;
    this.HealthLoss = radius;
  }

  // move
  //
  // Updates the position according to velocity
  // Handles wrapping
  move() {
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    // Handle wrapping
    this.handleWrapping();
  }

  // handleWrapping
  //
  // Checks if the holes has gone off the canvas and wrap it around the screen

  handleWrapping() {
    // off the bottom
    if (this.x > width) {
      this.x -= width;
      this.y = random(0, height);
    }
  }

  // display
  //
  // Draw the holes
  // with a radius the same size as its current health.
  display() {
    push();
    noStroke();
    this.radius = this.health;
    // Display Black hole
    if (this.radius > 20) {
      imageMode(CENTER);
      image(this.holeImg, this.x, this.y, this.radius * 2, this.radius * 2);
    }
    pop();
  }
}
