// Predator-Prey Simulation
// by Simon Zogheib
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.


// Track whether the game is over
let gameOver = false;

// To let the game start with an action
let state = "START";

// Our predator
let tiger;

// The three prey
let antelope;
let zebra;
let bee;

// the starting background
let startImg

// The background Image
let bgImage;

// The Foreground image of the tree
let treeImg;

// Predators and prey images
let tigerImage;
let beeImage;
let zebraImage;
let antelopeImage;

// Add variables for the sounds
let drumSound;
let tigerSound;




// create the function preload to preload images and sounds

function preload(){
  // Load Forest background and foreground tree and starting background
  bgImage = loadImage("assets/images/forest.png");
  treeImg = loadImage("assets/images/tree.png");
  startImg = loadImage("assets/images/StartScreen.png");

  // load Predators and prey images
  tigerImage = loadImage("assets/images/tiger.png");
  beeImage = loadImage("assets/images/bee.png");
  zebraImage = loadImage("assets/images/zebra.png");
  antelopeImage = loadImage("assets/images/antelope.png");

  // Preload My sounds
  drumSound = loadSound('assets/sounds/jungle.mp3');
  tigerSound = loadSound('assets/sounds/roar.mp3');

}

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  tiger = new Predator(width/2, height/2, 7, 90, tigerImage);
  antelope = new Prey(100, 100, 10, 60, antelopeImage);
  zebra = new Prey(300, 100, 8, 60, zebraImage);
  bee = new Prey(800, 100, 20, 40, beeImage);
}

// Setting up background sound
function setupSound() {
  drumSound.loop();
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // set the background to the forest image
  image(bgImage, 0, 0, width, height);

  if (state === "START") {
  image(startImg, 0, 0, width, height);

}

else if (state === "PLAY") {
  //Display preys eaten by the Tiger at the bottom of the screen
  textAlign(CENTER, CENTER);
  textFont("Impact");
  textSize(50);
  fill(17,59,8);
  text("PREY EATEN: " + tiger.preyEaten, width / 2, windowHeight - 50);


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

 // call the function to check if tiger is dead
  tiger.updateHealth();

  // Display all the "animals"
  tiger.display();
  antelope.display();
  zebra.display();
  bee.display();

  // draw the tree as a Foreground
  image(treeImg, 0, 0, width, height);
  // Display the energy bar
  energyBar();
}
}

// Create a fuction for displaying an Energy bar that represents player Health
// map the player health to the size of the background and call the fuction in draw
function energyBar(){
  let energySize;
  energySize = map(tiger.health,0,tiger.maxHealth,0,300);
  push();
  fill (255, 0, 0);
  rect(10, 10, 300, 25);

  fill(0, 255, 0);
  rect(10, 10,energySize, 25);

  pop()

}


// Create an action to allow the game to start and music to play after clicking the mouse
  function mousePressed() {
    if (state === "START") {
      state = "PLAY";
      setupSound();
    }
  }
