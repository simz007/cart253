// Space War Simulation
// by Simon Zogheib ( Reference code : My project2)
//
// Create a Space game where the Alien have to collect astronauts to gain health,
// Must avoid the astroids and the Ufos(maybe not).


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

// Astonaut images for Array
let astroImg;

//How many Astronaut to simulate
let numAstro = 5;
//Empty erray to store the Astonauts
let astronauts = [];


// Add variables for the sounds
let gameSound;
let alienSound;



// create the function preload to preload images and sounds

function preload() {
  // Load Forest background and foreground tree and starting background
  bgImage = loadImage("assets/images/space.jpg");
  startImg = loadImage("assets/images/StartScreen.png");
  endImg = loadImage("assets/images/endScreen.jpg");
  instructionImg = loadImage("assets/images/instruction.jpg");

  // load Alien and Astronaut images
  alienImg = loadImage("assets/images/alien.png");
  astroImg = loadImage("assets/images/astro.png");

  // // Preload My sounds
  // gameSound = loadSound('assets/sounds/jungle.mp3');
  // alienSound = loadSound('assets/sounds/roar.mp3');

}

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  alienPlayer = new Alien(width / 2, height / 2, 7, 90, alienImg);


  // Run a for loop numAstro times to generate each astronaut and put it in the array
  for (let i = 0; i < numAstro; i++) {
    // Generate (mostly) random values for the arguments of the cobra constructor
    let x = random(0, width);
    let y = random(0, height);
    let speed = random(5, 10);
    let radius = random(30, 50);
    // Create a new Astronaut objects with the random values
    let newAstro = new Astronaut(x, y, speed, radius, astroImg);
    // Add the new object to the END of our array using push()
    astronauts.push(newAstro);
  }

}

// Setting up background sound
// function setupSound() {
//   gameSound.loop();
// }

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // set the background to the forest image
  image(bgImage, 0, 0, width, height);

  if (state === "START") {
    image(startImg, 0, 0, width, height);
    }

    else if (state === "INSTRUCTIONS") {
        // displayInstructionsScreen();
        image(instructionImg, 0, 0, width, height);
      }

   else if (state === "PLAY") {

    if (!gameOver) {
      //Display astronauts eaten by the alien at the bottom of the screen
      textAlign(CENTER, CENTER);
      textFont("Impact");
      textSize(50);
      fill(255);
      text("ASTRONAUT EATEN: " + alienPlayer.preyEaten, width / 2, windowHeight - 50);


      // Handle input for the alien
      alienPlayer.handleInput();

      // Move Alien
      alienPlayer.move();


      // call the function to check if the alien is dead
      alienPlayer.updateHealth();


      // Display the alien
      alienPlayer.display();


      //Go through every Astronaut element in the array in order by index
      for (let i = 0; i < astronauts.length; i++) {
        // And for each one, move it and display it and handleEating for the alien
        astronauts[i].move();
        astronauts[i].display();
        alienPlayer.handleEating(astronauts[i]);
      }


      // // draw the tree as a Foreground
      // image(treeImg, 0, 0, width, height);
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
    }
      else if (state === "INSTRUCTIONS") {
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
  // gameSound.stop();
  // Set up the text to display
  let gameOverText = "YOU DIED\n"; // \n means "new line"
  gameOverText = gameOverText + "YOU ATE " + alienPlayer.preyEaten + " ASTRONAUT \n";
  gameOverText = gameOverText + "ASTEROIDS HIT:  " + alienPlayer.hits;

  text(gameOverText, 100, 700);
  pop();
}

// Reset the game to the START state with original values
function resetGame() {
  gameOver = false;
  state = "START";
  alienPlayer = new Alien(width / 2, height / 2, 7, 90, alienImg);


  // reset the health to full and num of prey eaten to 0
  alienPlayer.health = alienPlayer.maxHealth;
  alienPlayer.preyEaten = 0;
}
