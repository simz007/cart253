// Predator
//
// A class that represents a simple predator
// controlled by the arrow keys. It can move around
// the screen and consume Prey objects to maintain its health.

class Predator {

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, radius, predImage) {
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
    this.predImage = predImage;
    // Input properties
    this.upKey = UP_ARROW;
    this.downKey = DOWN_ARROW;
    this.leftKey = LEFT_ARROW;
    this.rightKey = RIGHT_ARROW;
    // Property to Keep track of how many prey eaten
    this.preyEaten = 0;
    // Property to Keep track of how many cobra stings
    this.stings = 0;
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
  // Checks if the predator has gone off the canvas and
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

  // handleDrink
  //Takes a Energy drink object as an argument and checks if the predator
  // overlaps it. If so,  increases
  // the predator's health to max and makes him faster.

  handleDrink(energy) {
    // Calculate distance from this predator to the cobra
    let d = dist(this.x, this.y, energy.x, energy.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < this.radius + energy.radius) {
      // increase predator health and constrain it to its possible range
      this.health = this.maxHealth;
      this.health = constrain(this.health, 0, this.maxHealth);

      // double the tiger speed after each drink
      this.speed = this.energySpeed;

      // so the drink looses it's health and disapears once consumed
      energy.health -= energy.maxHealth;
      // Check if the energy drink is consumed and dont reset it
      if (energy.health < 10) {
        // play roar sound after each enrgy drink consumption
        tigerSound.play();
      }
    }

  }

  // handleSting
  //Takes a Cobra object as an argument and checks if the predator
  // overlaps it. If so, reset the cobra's position and decreases
  // the predator's health by a bunch.

  handleSting(cobra) {

    // Calculate distance from this predator to the cobra
    let d = dist(this.x, this.y, cobra.x, cobra.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < this.radius + cobra.radius) {
      // Decrease predator health and constrain it to its possible range
      this.health -= this.healthLossPerSting;
      this.health = constrain(this.health, 0, this.maxHealth);
      // bring the speed back to original after each stings
      this.speed = this.originalSpeed;
      // Decrease prey health by the same amount
      cobra.health -= cobra.HealthLoss;

      // Check if the cobra bit and reset it if so
      if (cobra.health < 20) {
        cobra.reset();
        catSound.play();

        // add 1 to sting
        this.stings += 1;

      }
    }

  }

  // handleEating
  // Takes a Prey object as an argument and checks if the predator
  // overlaps it. If so, reduces the prey's health and increases
  // the predator's. If the prey dies, it gets reset.
  handleEating(prey) {

    // Calculate distance from this predator to the prey
    let d = dist(this.x, this.y, prey.x, prey.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < this.radius + prey.radius) {
      // Increase predator health and constrain it to its possible range
      this.health += this.healthGainPerEat;
      this.health = constrain(this.health, 0, this.maxHealth);
      // Decrease prey health by the same amount
      prey.health -= prey.HealthLoss;
      // Check if the prey died and reset it if so
      if (prey.health < 20) {
        prey.reset();
        tigerSound.play();
        // change prey Eaten by adding the value 1 and keep track of it
        console.log("Prey Eaten: " + this.preyEaten);
        this.preyEaten += 1;
      }
    }
  }

  // Add updateHealth function to chek if the tiger is dead and let the program
  // know it's game over
  updateHealth() {
    if (this.health === 0) {
      // If so, the game is over
      gameOver = true;
    }
  }
  // display
  //
  // Draw the predator as a tiger image
  // with a radius the same size as its current health.
  display() {
    push();
    noStroke();
    this.radius = this.health;
    // Display predator as an image only whyle it's alive
    imageMode(CENTER);
    if (this.radius > 0) {
      // map the alpha value to the health of the tiger and use it for display
      let alpha = map(this.health, 0, this.maxHealth, 75, 255);
      tint(255, alpha);
      image(this.predImage, this.x, this.y, this.radius * 2, this.radius * 2);
    }
    pop();
  }

}
