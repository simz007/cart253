// Asteroid
//
// A class that represents an asteroid
// that will appear on screen and could make the player loose health if it hits him

class Asteroid {

  // constructor
  //
  // Sets the initial values for the asteroid's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, radius, asteroidImg) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = speed;
    // Health properties
    this.maxHealth = radius;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    // Display properties
    this.asteroidImg = asteroidImg;
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
  // Checks if the asteroid has gone off the canvas and wrap it around the screen

  handleWrapping() {
    // off the bottom
    if (this.y > height) {
      this.y -= height;
      this.x = random(0, width);
    }
  }


  // display
  //
  // Draw the asteroid
  // with a radius the same size as its current health.
  display() {
    push();
    noStroke();
    this.radius = this.health;
    // Display asteroid
    if (this.radius > 20) {
      imageMode(CENTER);
      image(this.asteroidImg, this.x, this.y, this.radius * 2, this.radius * 2);
    }
    pop();
  }

  // reset
  //
  // reset the asteroid after each distruction
  reset() {
    this.x = random(0, width);
    this.y = 0;
    this.vy = random(1, 10);
    this.health = this.maxHealth;
  }


}
