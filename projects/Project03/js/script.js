// Space War Simulation
// by Simon Zogheib ( Reference code : My project2)
//
// Create a Space game where the Alien have to collect astronauts to gain health,
// Must avoid the astroids and destroy them.
// be aware of the darck Holes they will make you lose health and teleport you.
// look for the life bottles they will m ake you gain full health.


// Track whether the game is over
let gameOver = false;

// To let the game start with an action
let state = "START";

// Our Alien
let alienPlayer;


// the starting background
let startImg;

// the instruction background
let instructionImg;

// the gameOver background
let endImg;

// The background Image
let bgImage;

// The Foreground image of the tree
let treeImg;

// Alien Image
let alienImg;

// USA Astronaut images
let astroImg;

// Russian Astronaut images
let rusastroImg;

// Asteroid image
let asteroidImage;

// life bottle image
let lifeImg;

// Black hole image
let holeImg;

// Variable for the asteroids
let asteroid;
let secondAsteroid;

// Variable for the life Bottle
let lifeBottle;

// Variable for the black holes
let blackHole;
let secondHole;
//How many USA Astronaut to simulate
let numAstrousa = 4;
//How many Russian Astronaut to simulate
let numAstrorus = 3;
//Empty erray to store the Astonauts
let astronauts = [];

//How many Stars to simulate
let numStar = 100;
//Empty erray to store the Stars
let stars = [];

// Add variables for the sounds
let gameSound;
let alienSound;
let explosionSound;
let drinkSound;
let diedSound;

// create the function preload to preload images and sounds

function preload() {
  // Load Forest background and foreground tree and starting background
  bgImage = loadImage("assets/images/space.jpg");
  startImg = loadImage("assets/images/StartScreen.png");
  endImg = loadImage("assets/images/endScreen.png");
  instructionImg = loadImage("assets/images/instruction.png");

  // load Alien and Astronauts images
  alienImg = loadImage("assets/images/alien.png");
  astroImg = loadImage("assets/images/astro.png");
  rusastroImg = loadImage("assets/images/astrorus.png");
  // load Asteroid image
  asteroidImage = loadImage("assets/images/Astero.png");
  //Load life3 bottle image
  lifeImg = loadImage("assets/images/life.png");
  //Load black hole image
  holeImg = loadImage("assets/images/hole.png");

  // // Preload My sounds
  gameSound = loadSound('assets/sounds/space.mp3');
  alienSound = loadSound('assets/sounds/alien.mp3');
  explosionSound = loadSound('assets/sounds/explosion.mp3');
  drinkSound = loadSound('assets/sounds/yeah.mp3');
  diedSound = loadSound('assets/sounds/no.mp3');

}

// setup()
//
// Sets up a canvas

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Creates Alien,Asteroid and life bottle objects
  alienPlayer = new Alien(width / 2, height / 2, 7, 90, alienImg);
  asteroid = new Asteroid(200, 0, 5, 40, asteroidImage);
  secondAsteroid = new Asteroid(800, 0, 5, 50, asteroidImage);
  lifeBottle = new Life(500, 0, 5, 30, lifeImg);
  blackHole = new Holes(0, 100, 10, 60, holeImg);
  secondHole = new Holes(0, 600, 5, 80, holeImg);

  // Run a for loop numAstrousa times to generate each astronaut and put it in the array
  for (let i = 0; i < numAstrousa; i++) {
    // Generate (mostly) random values for the arguments of the cobra constructor
    let x = random(0, width);
    let y = random(0, height);
    let speed = random(5, 10);
    let radius = random(30, 50);
    // Create a new Astronaut objects with the random values
    let newAstrousa = new Astronautusa(x, y, speed, radius);
    // Add the new object to the END of our array using push()
    astronauts.push(newAstrousa);
  }

  // Run a for loop numAstrorus times to generate each astronaut and put it in the array
  for (let i = 0; i < numAstrorus; i++) {
    // Generate (mostly) random values for the arguments of the cobra constructor
    let x = random(0, width);
    let y = random(0, height);
    let speed = random(10, 13);
    let radius = random(30, 50);
    // Create a new Astronaut objects with the random values
    let newAstrorus = new Astronautrus(x, y, speed, radius);
    // Add the new object to the END of our array using push()
    astronauts.push(newAstrorus);
  }

  // Run a for loop numStar times to generate each star and put it in the array
  for (let i = 0; i < numStar; i++) {
    // Generate (mostly) random values for the arguments of the star constructor
    let x = random(0, width);
    let y = random(0, height);
    let speed = random(5, 9);
    let fillColor = color(255);
    let radius = random(1, 3);
    // Create a new star objects with the random values
    let newStar = new Stars(x, y, speed, fillColor, radius);
    // Add the new object to the END of our array using push()
    stars.push(newStar);
  }
}

// Setting up background sound
function setupSound() {
  gameSound.loop();
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // set the background to the forest image
  image(bgImage, 0, 0, width, height);

  if (state === "START") {
    image(startImg, 0, 0, width, height);
  } else if (state === "INSTRUCTIONS") {
    // displayInstructionsScreen();
    image(instructionImg, 0, 0, width, height);
  } else if (state === "PLAY") {

    if (!gameOver) {
      //Display astronauts eaten by the alien at the bottom of the screen
      textAlign(CENTER, CENTER);
      textFont("Impact");
      textSize(30);
      fill(255);
      text("ASTRONAUT EATEN: " + alienPlayer.preyEaten, width / 2, windowHeight - 30);
      text("ASTEROIDS DESTROYED: " + alienPlayer.hits, width / 2, windowHeight - 60);

      // Handle input for the alien
      alienPlayer.handleInput();

      // Move Alien
      alienPlayer.move();

      // call the function to check if the alien is dead
      alienPlayer.updateHealth();

      // Call the handlehit and firelaser functions for both asteroids
      alienPlayer.handleHit(asteroid);
      alienPlayer.fireLaser(asteroid);
      alienPlayer.handleHit(secondAsteroid);
      alienPlayer.fireLaser(secondAsteroid);
      alienPlayer.handleHole(blackHole);
      alienPlayer.handleHole(secondHole);

      // Display and move the asteroids
      asteroid.move();
      asteroid.display();
      secondAsteroid.move();
      secondAsteroid.display();

      // Call the handle drink function for the life bottle
      alienPlayer.handleDrink(lifeBottle);

      // Display and move the life Bottle
      lifeBottle.move();
      lifeBottle.display();

      // Display and move the black holes
      blackHole.move();
      blackHole.display();
      secondHole.move();
      secondHole.display();

      // Display the alien
      alienPlayer.display();

      //Go through every Astronaut element in the array in order by index
      for (let i = 0; i < astronauts.length; i++) {
        // And for each one, move it and display it and handleEating for the alien
        astronauts[i].move();
        astronauts[i].display();
        alienPlayer.handleEating(astronauts[i]);
      }

      //Go through every star element in the array in order by index
      for (let i = 0; i < stars.length; i++) {
        // And for each one, move it and display it
        stars[i].move();
        stars[i].display();
      }

      // // draw the tree as a Foreground
      // image(treeImg, 0, 0, width, height);
      // Display the energy bar
      energyBar();
    } else {
      showGameOver();
    }
  }
}

// Create a fuction for displaying an Energy bar that represents player Health
// map the player health to the size of the background and call the fuction in draw
function energyBar() {
  let energySize;
  energySize = map(alienPlayer.health, 0, alienPlayer.maxHealth, 0, 300);
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
    state = "INSTRUCTIONS";
  } else if (state === "INSTRUCTIONS") {
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
  textSize(50);
  textAlign(LEFT);
  fill(0, 255, 0);
  gameSound.stop();
  // Set up the text to display
  let gameOverText = "YOU DIED\n"; // \n means "new line"
  gameOverText = gameOverText + "YOU ATE " + alienPlayer.preyEaten + " ASTRONAUT \n";
  gameOverText = gameOverText + "ASTEROIDS DESTROYED:  " + alienPlayer.hits;

  text(gameOverText, 100, 800);
  pop();
}

// Reset the game to the START state with original values
function resetGame() {
  gameOver = false;
  state = "START";
  alienPlayer = new Alien(width / 2, height / 2, 7, 90, alienImg);
  asteroid = new Asteroid(200, 0, 5, 40, asteroidImage);
  secondAsteroid = new Asteroid(800, 0, 5, 50, asteroidImage);
  lifeBottle = new Life(500, 0, 5, 30, lifeImg);
  blackHole = new Holes(0, 100, 10, 60, holeImg);
  secondHole = new Holes(0, 600, 5, 80, holeImg);

  // reset the health to full and num of prey eaten to 0
  alienPlayer.health = alienPlayer.maxHealth;
  alienPlayer.preyEaten = 0;
}
