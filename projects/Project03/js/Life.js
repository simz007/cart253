// Life
//
// A class that represents Life potion
// that will appear on screen and if consumed by the alien will give him his full life back

class Life {

  // constructor
  //
  // Sets the initial values for the life's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, radius, lifeImg) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = random(4, 15);
    this.speed = speed;
    // Health properties
    this.maxHealth = radius;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    // Display properties
    this.lifeImg = lifeImg;
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
  // Checks if the life bottle has gone off the canvas and wrap it around the screen

  handleWrapping() {
    // off the bottom
    if (this.y > height) {
      this.y -= height;
      this.x = random(0, width);
    }
  }

  // display
  //
  // Draw the life bottle
  // with a radius the same size as its current health.
  display() {
    push();
    noStroke();
    this.radius = this.health;
    // Display life bottle
    if (this.radius > 20) {
      imageMode(CENTER);
      image(this.lifeImg, this.x, this.y, this.radius * 2, this.radius * 2);
    }
    pop();
  }

  // reset
  //
  // reset the life bottle after each consumption
  reset() {
    this.x = random(0, width);
    this.y = 0;
    this.vy = random(4, 15);
    this.health = this.maxHealth;
  }
}
