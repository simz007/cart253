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

// Predators and prey images
let lionImage;
let tigerImage;
let beeImage;
let zebraImage;
let antelopeImage;


// add a function to load images
function preload() {
  lionImage = loadImage("assets/images/lion.png");
  tigerImage = loadImage("assets/images/tiger.png");
  beeImage = loadImage("assets/images/bee.png");
  zebraImage = loadImage("assets/images/zebra.png");
  antelopeImage = loadImage("assets/images/antelope.png");

}
// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);

  // Tiger moves with the arrows and sprint with the SHIFT key
  tiger = new Predator(1000, 300, 5, 60, 38, 40, 37, 39, 16, tigerImage);

  // Create the lion as a new predator, moves with the AWSD keys and sprint with the F key
  // and a diffrent starting position and color
  lion = new Predator(100, 200, 5, 60, 87, 83, 65, 68, 70, lionImage);

  antelope = new Prey(100, 100, 10, 50, antelopeImage);
  zebra = new Prey(100, 100, 8, 60, zebraImage);
  bee = new Prey(100, 100, 20, 30, beeImage);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  background(0);

  //Display preys eaten by the Tiger at the bottom of the screen
  textAlign(CENTER, CENTER);
  textSize(20);
  fill(255);
  text("Prey eaten by Tiger: " + tiger.preyEaten, width / 2, windowHeight - 50);


  //Display preys eaten by the Lion at the bottom of the screen
  textAlign(CENTER, CENTER);
  textSize(20);
  fill(255);
  text("Prey eaten by Lion: " + lion.preyEaten, width / 2, windowHeight - 20);

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
