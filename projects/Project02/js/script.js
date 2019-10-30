// Predator-Prey Simulation
// by Simon Zogheib
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

// Our predator
let tiger;

// The three prey
let antelope;
let zebra;
let bee;

// The background Image
let bgImage;
// The Foreground image of the tree
let treeImg;
// Predators and prey images
let tigerImage;
let beeImage;
let zebraImage;
let antelopeImage;

// create the function preload to preload images and sounds

function preload(){
  // Load Forest background and foreground tree
  bgImage = loadImage("assets/images/forest.png");
  treeImg = loadImage("assets/images/tree.png");

  // load Predators and prey images
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
  tiger = new Predator(width/2, height/2, 7, 70, tigerImage);
  antelope = new Prey(100, 100, 10, 60, antelopeImage);
  zebra = new Prey(300, 100, 8, 60, zebraImage);
  bee = new Prey(800, 100, 20, 40, beeImage);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // set the background to the forest image
  image(bgImage, 0, 0, width, height);

  // Handle input for the tiger
  tiger.handleInput();

  // Move all the "animals"
  tiger.move();
  antelope.move();
  zebra.move();
  bee.move();

  // Handle the tiger eating any of the prey
  tiger.handleEating(antelope);
  tiger.handleEating(zebra);
  tiger.handleEating(bee);

  // Display all the "animals"
  tiger.display();
  antelope.display();
  zebra.display();
  bee.display();

  // draw the tree as a Foreground
  image(treeImg, 0, 0, width, height);

}