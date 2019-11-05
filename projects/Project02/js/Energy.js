// Energy
//
// A class that represents the energy drinks,
// when the tiger drinks it it will give him max health and increase his speed
// until he gets bitten by a cobra then speed will go back to original

class Energy {

  // constructor
  //
  // Sets the initial values for the energy drink properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, radius, Img) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // Time properties for noise() function
    this.tx = random(0, 1000); // To make x and y noise different
    this.ty = random(0, 1000); // we use random starting values
    // Health properties
    this.maxHealth = radius;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    this.HealthLoss = radius;
    // Display properties
    this.energyImg = energyImg;
    this.radius = this.health;
  }

  // move
  //
  // Sets velocity based on the noise() function and the cobra's speed
  // Moves based on the resulting velocity and handles wrapping
  move() {
    // Set velocity via noise()
    this.vx = map(noise(this.tx), 0, 1, -this.speed, this.speed);
    this.vy = map(noise(this.ty), 0, 1, -this.speed, this.speed);
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    // Update time properties
    this.tx += 0.02;
    this.ty += 0.02;
    // Handle wrapping
    this.handleWrapping();
  }

  // handleWrapping
  //
  // Checks if the cobra has gone off the canvas and
  // wraps it to the other side if so
  handleWrapping() {
    // Off the left or right
    if (this.x < 0) {
      this.x += width;
    } else if (this.x > width) {
      this.x -= width;
    }
    // Off the top or bottom
    if (this.y < 0) {
      this.y += height;
    } else if (this.y > height) {
      this.y -= height;
    }
  }

  // display
  //
  // Draw the cobra
  // with a radius the same size as its current health.
  display() {
    push();
    noStroke();
    this.radius = this.health;
    // Display prey as an image
    if (this.radius > 20) {
      imageMode(CENTER);
      image(this.energyImg, this.x, this.y, this.radius * 2, this.radius * 2);
    }
    pop();
  }

  // reset
  //
  // Set the position to a random location and reset health
  // and radius back to default
  reset() {
    // Random position
    this.x = random(0, width);
    this.y = random(0, height);
    // Default health
    this.health = this.maxHealth;
    // Default radius
    this.radius = this.health;
  }
}
