/******************************************************

Game - The Artful Dodger
Simon Zogheib

A simple dodging game with keyboard controls

******************************************************/

// The position and size of our avatar circle
let avatarX;
let avatarY;
let avatarSize = 50;

// The speed and velocity of our avatar circle
let avatarSpeed = 10;
let avatarVX = 0;
let avatarVY = 0;

// The position and size of the enemy circle
let enemyX;
let enemyY;
let enemySize = 50;

// The speed and velocity of our enemy circle
let enemySpeed = 5;
let enemyVX = 5;

// How many dodges the player has made
let dodges = 0;

// Display the Dodge count on screen
let dodgeCount = "Dodges:";

// Create the new Font
let newFont;

// Create variable for new enemy size
let newEnemySize;

// Create variable for new enemy speed
let newEnemySpeed;

// Create the enemy image
let enemyImage;

//Create new background image
let bg;



function preload() {
  // Preload the Font
  newFont = loadFont("assets/fonts/sunday.ttf");

  // Preload the enemy image
  enemyImage = loadImage("assets/images/angry.png");

  // Preload background image
  bg = loadImage("assets/images/bg.png");


}



// setup()
//
// Make the canvas, position the avatar and anemy
function setup() {
  // Create our playing area



  createCanvas(500,500);


  // Put the avatar in the centre
  avatarX = width/2;
  avatarY = height/2;

  // Put the enemy to the left at a random y coordinate within the canvas
  enemyX = 0;
  enemyY = random(0,height);





  // No stroke so it looks cleaner
  noStroke();
}

// draw()
//
// Handle moving the avatar and enemy and checking for dodges and
// game over situations.
function draw() {

  // Draw the image of the background
  imageMode(CORNER);
  background(bg);







  // Default the avatar's velocity to 0 in case no key is pressed this frame
  avatarVX = 0;
  avatarVY = 0;

  // Check which keys are down and set the avatar's velocity based on its
  // speed appropriately

  // Left and right
  if (keyIsDown(LEFT_ARROW)) {
    avatarVX = -avatarSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    avatarVX = avatarSpeed;
  }

  // Up and down (separate if-statements so you can move vertically and
  // horizontally at the same time)
  if (keyIsDown(UP_ARROW)) {
    avatarVY = -avatarSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    avatarVY = avatarSpeed;
  }

  // Move the avatar according to its calculated velocity
  avatarX = avatarX + avatarVX;
  avatarY = avatarY + avatarVY;

  // The enemy always moves at enemySpeed
  enemyVX = enemySpeed;
  // Update the enemy's position based on its velocity
  enemyX = enemyX + enemyVX;

  // Check if the enemy and avatar overlap - if they do the player loses
  // We do this by checking if the distance between the centre of the enemy
  // and the centre of the avatar is less that their combined radii
  if (dist(enemyX,enemyY,avatarX,avatarY) < enemySize/2 + avatarSize/2) {
    // Tell the player they lost
    console.log("YOU LOSE!");
    // Reset the enemy's position
    enemyX = 0;
    enemyY = random(0,height);
    // Reset the avatar's position
    avatarX = width/2;
    avatarY = height/2;
    // Reset the dodge counter
    dodges = 0;

    // Reset the enemy Size to it's original size after each collision
    enemySize = 50;

    // Reset the enemy Speed to it's original speed fter each collision
    enemySpeed = 5;

  }

  // Check if the avatar has gone off the screen (cheating!)
  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
    // If they went off the screen they lose in the same way as above.
    console.log("YOU LOSE!");
    enemyX = 0;
    enemyY = random(0,height);
    avatarX = width/2;
    avatarY = height/2;
    dodges = 0;

    // Reset the enemy Size to it's original size after avatar leaves the screen
    enemySize = 50;

    // Reset the enemy speed to it's original speed after avatar leaves screen
    enemySpeed = 5;

  }

  // Check if the enemy has moved all the way across the screen
  if (enemyX > width) {
    // This means the player dodged so update its dodge statistic
    dodges = dodges + 1;
    // Tell them how many dodges they have made
    console.log(dodges + " DODGES!");
    // Reset the enemy's position to the left at a random height
    enemyX = 0;
    enemyY = random(0,height);

    // Increae the enemy Size each successful dodge
    newEnemySize = enemySize + 15;
    enemySize = newEnemySize;

    // Increae the enemy Speed each successful dodge
    newEnemySpeed = enemySpeed + 1;
    enemySpeed = newEnemySpeed;

  }


//Display the number of successful dodges in the game itself

textFont(newFont);
noStroke();
fill(255,255,255);
textSize(20);
text(dodges,95,50);
text(dodgeCount,20,50);



  // Display the number of successful dodges in the console
  console.log(dodges);

  // The player is Now blue
  fill(0,0,255);
  //The player has a yellow stoke
  strokeWeight(5);
  stroke(255,255,0);
  // Draw the player as a circle
  ellipse(avatarX,avatarY,avatarSize,avatarSize);

  // The enemy is red
  //fill(255,0,0);
  // Draw the enemy as a circle
  //ellipse(enemyX,enemyY,enemySize,enemySize);

  // Draw the New enemy Image and position it from center
  imageMode(CENTER);
  image(enemyImage,enemyX,enemyY,enemySize,enemySize);



}
