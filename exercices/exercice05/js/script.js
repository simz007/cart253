// Predator-Prey Simulation
// by Simon Zogheib
//
// Creates a Two predator and three prey (of different sizes and speeds)
// The predators chases the prey using the arrow keys(Tiger) and the WASD keys(Lion) and consumes them.
// The predator loses health over time, so must keep eating to survive.


// Our predators
// tiger moves with arrow keys
let tiger;
// lion moves with WASD keys
let lion;



// The three prey
let antelope;
let zebra;
let bee;

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);

  // Tiger moves with the arrows and sprint with the SHIFT key
  tiger = new Predator(500, 300, 5, color(200, 200, 0), 40, 38, 40, 37, 39, 16);

  // Create the lion as a new predator, moves with the AWSD keys and sprint with the F key
  // and a diffrent starting position and color
  lion = new Predator(100, 200, 5, color(255, 0, 0), 40, 87, 83, 65, 68, 70);

  antelope = new Prey(100, 100, 10, color(255, 100, 10), 50);
  zebra = new Prey(100, 100, 8, color(255, 255, 255), 60);
  bee = new Prey(100, 100, 20, color(255, 255, 0), 10);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  background(0);

  // Handle input for the tiger
  tiger.handleInput();

  // Handle input for the lion
  lion.handleInput();

  // Move all the "animals"
  // add the move of the lion
  tiger.move();
  lion.move();
  antelope.move();
  zebra.move();
  bee.move();

  // Handle the tiger eating any of the prey
  tiger.handleEating(antelope);
  tiger.handleEating(zebra);
  tiger.handleEating(bee);

  // Handle the lion eating any of the prey
  lion.handleEating(antelope);
  lion.handleEating(zebra);
  lion.handleEating(bee);

  // Display all the "animals"
  // add the display of the lion
  tiger.display();
  lion.display();
  antelope.display();
  zebra.display();
  bee.display();
}
