// Alien
//
// A class that represents a simple alien
// controlled by the arrow keys. It can move around
// the screen and consume astronaut objects to maintain its health.

class Alien {

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, radius, alienImage) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // Health properties
    this.maxHealth = radius;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    this.healthLossPerMove = 0.1;
    this.healthGainPerEat = 0.7;
    this.healthLossPerSting = 15; // Display properties
    this.radius = this.health; // Radius is defined in terms of health
    this.alienImage = alienImage;
    // Input properties
    this.upKey = UP_ARROW;
    this.downKey = DOWN_ARROW;
    this.leftKey = LEFT_ARROW;
    this.rightKey = RIGHT_ARROW;
    // Property to Keep track of how many Astronaut eaten
    this.preyEaten = 0;
    // Property to Keep track of how many asteroids hits
    this.hits = 0;
    //property for the energy speed
    this.energySpeed = this.speed * 2;
    // property to set the speed back to it's original value after a cobra sting
    this.originalSpeed = this.speed;

  }

  // handleInput
  //
  // Checks if an arrow key is pressed and sets the predator's
  // velocity appropriately.
  handleInput() {
    // Horizontal movement
    if (keyIsDown(this.leftKey)) {
      this.vx = -this.speed;
    } else if (keyIsDown(this.rightKey)) {
      this.vx = this.speed;
    } else {
      this.vx = 0;
    }
    // Vertical movement
    if (keyIsDown(this.upKey)) {
      this.vy = -this.speed;
    } else if (keyIsDown(this.downKey)) {
      this.vy = this.speed;
    } else {
      this.vy = 0;
    }
  }

  // move
  //
  // Updates the position according to velocity
  // Lowers health (as a cost of living)
  // Handles wrapping
  move() {
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    // Update health
    this.health = this.health - this.healthLossPerMove;
    this.health = constrain(this.health, 0, this.maxHealth);
    // Handle wrapping
    this.handleWrapping();
  }

  // handleWrapping
  //
  // Checks if the alien has gone off the canvas and
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




  // handleEating
  // Takes an Astronaut object as an argument and checks if the alien
  // overlaps it. If so, reduces the astronaut health and increases
  // the aliens's. If the prey dies, it gets reset.
  handleEating(astronaut) {

    // Calculate distance from this alien to the astronaut
    let d = dist(this.x, this.y, astronaut.x, astronaut.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < this.radius + astronaut.radius) {
      // Increase alien health and constrain it to its possible range
      this.health += this.healthGainPerEat;
      this.health = constrain(this.health, 0, this.maxHealth);
      // Decrease astronaut health by the same amount
      astronaut.health -= astronaut.HealthLoss;
      // Check if the prey died and reset it if so
      if (astronaut.health < 20) {
        astronaut.reset();
        // alienSound.play();
        // change prey Eaten by adding the value 1 and keep track of it
        console.log("Astronaut Eaten: " + this.preyEaten);
        this.preyEaten += 1;
      }
    }
  }

  // Add updateHealth function to chek if the Alien is dead and let the program
  // know it's game over
  updateHealth() {
    if (this.health === 0) {
      // If so, the game is over
      gameOver = true;
    }
  }
  // display
  //
  // Draw the Alien image
  // with a radius the same size as its current health.
  display() {
    push();
    noStroke();
    this.radius = this.health;
    // Display Alien as an image only whyle it's alive
    imageMode(CENTER);
    if (this.radius > 0) {
      // map the alpha value to the health of the Alien and use it for display
      let alpha = map(this.health, 0, this.maxHealth, 75, 255);
      tint(255, alpha);
      image(this.alienImage, this.x, this.y, this.radius * 2, this.radius * 2);
    }
    pop();
  }

}
