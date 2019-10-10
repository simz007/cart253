"use strict";

/******************************************************

Fish O Fish
Simon Zogheib

A "simple" game of cat and mouse. The player is a circle and can move with keys,
if they overlap the (randomly moving) prey they "eat it" by sucking out its life
and adding it to their own. The player "dies" slowly over time so they have to keep
eating to stay alive.

Includes: Physics-based movement, keyboard controls, health/stamina,
random movement, screen wrap.

******************************************************/


// Track whether the game is over
let gameOver = false;


// To let the game start with an action
let state = "START";


// Player position, size, velocity
let playerX;
let playerY;
let playerRadius = 35;
// New variable for Eating preyRadius
let playerEatingRadius = 0.5;

let playerVX = 0;
let playerVY = 0;

// Increased the player max speed to make the game faster
// and to give more room for speed decrease evrytime the player eats a prey
let playerMaxSpeed = 3;
// Player health
let playerHealth;
let playerMaxHealth = 900;
// Player fill color
let playerFill = 50 ;

// Create variables for player sprint speed and player initial speed
let playerSprintSpeed = 5;

// Increased the player initial speed to make the game faster
// and to give more room for speed decrease evrytime the player eats a prey
let playerInitialSpeed = 3;

// Create the variable for player's speed decrease after eating a prey
let playerDecreaseSpeed = 0.03;

// Create variable for player health loss
let playerHealthLoss = 3;

// Player and prey images
let playerImage;
let preyImage;

// background image
let bgImage;



// Prey position, size, velocity
let preyX;
let preyY;
let preyRadius = 15;
let preyVX;
let preyVY;

// Increase the prey max speed to make it harder to catch and more intresting to play
let preyMaxSpeed = 6;
// Prey health
let preyHealth;
let preyMaxHealth = 100;
// Prey fill color
let preyFill = 200;

// Amount of health obtained per frame of "eating" (overlapping) the prey
let eatHealth = 10;
// Number of prey eaten during the game (the "score")
let preyEaten = 0;

// Time variables for noise movement
let tx;
let ty;

// Add variables for the sounds
let waterSound;
let eatSound;



function preload() {
  // Preload my images
  playerImage = loadImage("assets/images/puff.png");
  preyImage = loadImage("assets/images/prey.png");
  bgImage = loadImage("assets/images/bg1.png");

  // Preload My sounds
  waterSound = loadSound('assets/sounds/bub.wav');
  eatSound = loadSound('assets/sounds/dj.mp3');

}

// setup()
//
// Sets up the basic elements of the game
function setup() {
  createCanvas(700, 500);

  noStroke();

  // We're using simple functions to separate code out
  setupPrey();
  setupPlayer();

  // Set random noise values
  tx = random(0, 1000);
  ty = random(0, 1000);
}


function setupSound() {
  // Setting up water sound
    // waterSound.play();

    waterSound.loop();

}

// setupPrey()
//
// Initialises prey's position, velocity, and health
function setupPrey() {
  preyX = width / 5;
  preyY = height / 2;
  preyVX = -preyMaxSpeed;
  preyVY = preyMaxSpeed;
  preyHealth = preyMaxHealth;
}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  playerX = 4 * width / 5;
  playerY = height / 2;
  playerHealth = playerMaxHealth;
}

// draw()
//
// While the game is active, checks input
// updates positions of prey and player,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
function draw() {

  // Add the Background image
  image(bgImage, 0, 0);

  if (state === "START") {
  image(bgImage, 0, 0);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(50);
  textFont("Helvetica");
  text("START", 350, 250);
}

else if (state === "PLAY") {

  if (!gameOver) {
    handleInput();

    movePlayer();
    movePrey();

    updateHealth();
    checkEating();

    drawPrey();
    drawPlayer();

    showScore();
    showHealth();
}

  else {
    showGameOver();

  }
}
}
// handleInput()
//
// Checks arrow keys and adjusts player velocity accordingly
function handleInput() {
  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    playerVX = -playerMaxSpeed;
  } else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerMaxSpeed;
  } else {
    playerVX = 0;
  }

  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    playerVY = -playerMaxSpeed;
  } else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerMaxSpeed;
  } else {
    playerVY = 0;
  }


  // Make player move faster and loose health faster when shift is down

  if (keyIsDown(16)) {
    playerMaxSpeed = playerSprintSpeed;
    playerHealth = playerHealth - playerHealthLoss;

  } else {
    playerMaxSpeed = playerInitialSpeed;

  }


}

// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  // Update position
  playerX = playerX + playerVX;
  playerY = playerY + playerVY;

  // Wrap when player goes off the canvas
  if (playerX < 0) {
    // Off the left side, so add the width to reset to the right
    playerX = playerX + width;
  } else if (playerX > width) {
    // Off the right side, so subtract the width to reset to the left
    playerX = playerX - width;
  }

  if (playerY < 0) {
    // Off the top, so add the height to reset to the bottom
    playerY = playerY + height;
  } else if (playerY > height) {
    // Off the bottom, so subtract the height to reset to the top
    playerY = playerY - height;
  }
}

// updateHealth()
//
// Reduce the player's health (happens every frame)
// Check if the player is dead
function updateHealth() {
  // Reduce player health
  playerHealth = playerHealth - 0.5;
  // Constrain the result to a sensible range
  playerHealth = constrain(playerHealth, 0, playerMaxHealth);
  // Check if the player is dead (0 health)
  if (playerHealth === 0) {
    // If so, the game is over
    gameOver = true;
  }
}

// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkEating() {
  // Get distance of player to prey
  let d = dist(playerX, playerY, preyX, preyY);
  // Check if it's an overlap
  if (d < playerRadius + preyRadius) {
    // Increase the player health
    playerHealth = playerHealth + eatHealth;
    // Constrain to the possible range
    playerHealth = constrain(playerHealth, 0, playerMaxHealth);
    // Reduce the prey health
    preyHealth = preyHealth - eatHealth;
    // Constrain to the possible range
    preyHealth = constrain(preyHealth, 0, preyMaxHealth);

    // Increase the player's radius after eating a prey
    playerRadius += playerEatingRadius;
    // Constrain the player radisu size so it won't get too big
    playerRadius = constrain(playerRadius, 35, 150);

    // Decrease the player's speed after eating a prey
    playerInitialSpeed -= playerDecreaseSpeed;
    // Constrain the speed so it wont get to 0
    playerInitialSpeed = constrain(playerInitialSpeed, 1, playerInitialSpeed);

    // Check if the prey died (health 0)
    if (preyHealth === 0) {
      // Move the "new" prey to a random position
      preyX = random(0, width);
      preyY = random(0, height);
      // Give it full health
      preyHealth = preyMaxHealth;
      // Track how many prey were eaten
      preyEaten = preyEaten + 1;
      eatSound.play();
    }



  }
}

// movePrey()
//
// Moves the prey based on random velocity changes
function movePrey() {
  // Change the prey's velocity at random intervals
  // random() will be < 0.05 5% of the time, so the prey
  // will change direction on 5% of frames
  // if (random() < 0.05) {
  // Set velocity based on random values to get a new direction
  // and speed of movement
  //
  // Use map() to convert from the 0-1 range of the random() function
  // to the appropriate range of velocities for the prey


  // New map based on noise
  preyVX = map(noise(tx), 0, 1, -preyMaxSpeed, preyMaxSpeed);
  preyVY = map(noise(ty), 0, 1, -preyMaxSpeed, preyMaxSpeed);


  // Update prey position based on velocity
  preyX = preyX + preyVX;
  preyY = preyY + preyVY;

  // Time Values for noise based movement
  tx += 0.05;
  ty += 0.05;

  // Screen wrapping
  if (preyX < 0) {
    preyX = preyX + width;
  } else if (preyX > width) {
    preyX = preyX - width;
  }

  if (preyY < 0) {
    preyY = preyY + height;
  } else if (preyY > height) {
    preyY = preyY - height;
  }
}

// drawPrey()
//
// Draw the prey as an ellipse with alpha based on health
function drawPrey() {
  push();
  fill(preyFill, preyHealth);
  imageMode(CENTER);
  image(preyImage, preyX, preyY, 30, 30);
  pop();
}

// drawPlayer()
//
// Draw the player as an ellipse with alpha value based on health
function drawPlayer() {
push();
  tint(255, playerHealth);
  imageMode(CENTER);
  image(playerImage, playerX, playerY, playerRadius*2, playerRadius*2);
  pop();

}

// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  // Set up the font
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(0);
  // Set up the text to display
  let gameOverText = "GAME OVER PUFFY\n"; // \n means "new line"
  gameOverText = gameOverText + "You ate " + preyEaten + " fish\n";
  gameOverText = gameOverText + "Swim faster next time!."
  // Display it in the centre of the screen
  text(gameOverText, width / 2, height / 2);
    waterSound.stop();
}


// Function that Displays the player's health
  function showHealth() {
 textFont("Helvetica");
  textAlign(LEFT, TOP);
  textSize(20);
  fill(255);
  text("Puff Health: " + playerHealth, 10, 10);
}

// Function that Displays the ammount of fish eaten
    function showScore() {
    textFont("Helvetica");
    textAlign(LEFT, TOP);
    textSize(20);
    fill(255);
    text("Fish Eaten: " + preyEaten, 10, 35);
  }

// Create an action to allow music to play
  function mousePressed() {
    if (state === "START") {
      state = "PLAY";
      setupSound();
    }



}
