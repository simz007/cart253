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

// The cobra
let cobraOne;


// the starting background
let startImg;

// the gameOver background
let endImg;

// The background Image
let bgImage;

// The Foreground image of the tree
let treeImg;

// Predators and prey images
let tigerImage;
let beeImage;
let zebraImage;
let antelopeImage;

// Cobra images
let cobraImg;


// Add variables for the sounds
let drumSound;
let tigerSound;
let catSound;




// create the function preload to preload images and sounds

function preload() {
  // Load Forest background and foreground tree and starting background
  bgImage = loadImage("assets/images/forest.png");
  treeImg = loadImage("assets/images/tree.png");
  startImg = loadImage("assets/images/StartScreen.png");
  endImg = loadImage("assets/images/endScreen.png");

  // load Predators and prey images
  tigerImage = loadImage("assets/images/tiger.png");
  beeImage = loadImage("assets/images/bee.png");
  zebraImage = loadImage("assets/images/zebra.png");
  antelopeImage = loadImage("assets/images/antelope.png");

  cobraImg = loadImage("assets/images/cobra.png");

  // Preload My sounds
  drumSound = loadSound('assets/sounds/jungle.mp3');
  tigerSound = loadSound('assets/sounds/roar.mp3');
  catSound = loadSound('assets/sounds/cat.wav');

}

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  tiger = new Predator(width / 2, height / 2, 7, 90, tigerImage);
  antelope = new Prey(100, 100, 10, 60, antelopeImage);
  zebra = new Prey(300, 100, 8, 60, zebraImage);
  bee = new Prey(800, 100, 20, 40, beeImage);
  cobraOne = new Cobra(800, 100, 30, 50, cobraImg);

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

  } else if (state === "PLAY") {

    if (!gameOver) {
      //Display preys eaten by the Tiger at the bottom of the screen
      textAlign(CENTER, CENTER);
      textFont("Impact");
      textSize(50);
      fill(17, 59, 8);
      text("PREY EATEN: " + tiger.preyEaten, width / 2, windowHeight - 50);


      // Handle input for the tiger
      tiger.handleInput();

      // Move all the "animals"
      tiger.move();
      antelope.move();
      zebra.move();
      bee.move();
      cobraOne.move();

      // Handle the tiger eating any of the prey
      tiger.handleEating(antelope);
      tiger.handleEating(zebra);
      tiger.handleEating(bee);

      // Handle the tiger getting bit by the cobra
      tiger.handleSting(cobraOne);

      // call the function to check if tiger is dead
      tiger.updateHealth();

      // Display all the "animals"
      tiger.display();
      antelope.display();
      zebra.display();
      bee.display();
      cobraOne.display();

      // draw the tree as a Foreground
      image(treeImg, 0, 0, width, height);
      // Display the energy bar
      energyBar();
    }
    else {
      showGameOver();

    }
  }
}

// Create a fuction for displaying an Energy bar that represents player Health
// map the player health to the size of the background and call the fuction in draw
function energyBar() {
  let energySize;
  energySize = map(tiger.health, 0, tiger.maxHealth, 0, 300);
  push();
  fill(255, 0, 0);
  rect(10, 10, 300, 25);

  fill(0, 255, 0);
  rect(10, 10, energySize, 25);

  pop()

}


// Create an action to allow the game to start and music to play after clicking the mouse
function mousePressed() {
  if (state === "START") {
    state = "PLAY";
    setupSound();
  }

if (gameOver === true) {
        resetGame();
      }
}

// Create a function to show gameover screen
function showGameOver() {
  push();
  // Set up the font
  image(endImg, 0, 0, width, height);
  textSize(80);
  textAlign(LEFT);
  fill(255);
  drumSound.stop();
  // Set up the text to display
  let gameOverText = "YOU DIED\n"; // \n means "new line"
  gameOverText = gameOverText + "YOU ATE " + tiger.preyEaten + " PREY \n";
  gameOverText = gameOverText + "COBRA BITES:  " + tiger.stings;

  text(gameOverText, 100, 700);
  pop();
}

// Reset the game to the START state with original values
function resetGame() {
  gameOver = false;
  state = "START";
  tiger = new Predator(width / 2, height / 2, 7, 90, tigerImage);
  antelope = new Prey(100, 100, 10, 60, antelopeImage);
  zebra = new Prey(300, 100, 8, 60, zebraImage);
  bee = new Prey(800, 100, 20, 40, beeImage);
  cobraOne = new Cobra(800, 100, 30, 50, cobraImg);
  tiger.health = tiger.maxHealth;
  tiger.preyEaten = 0;

}
