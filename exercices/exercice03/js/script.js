"use strict";

/******************************************************************************
Where's Sausage Dog?
by Pippin Barr

An algorithmic version of a Where's Wally/Waldo searching game where you
need to click on the sausage dog you're searching for in amongst all
the visual noise of other animals.

Animal images from:
https://creativenerds.co.uk/freebies/80-free-wildlife-icons-the-best-ever-animal-icon-set/
******************************************************************************/




// Create the text Chien PErdu

let chienPerdu = "CHIEN PERDU";

//Target Speed change once you win
let speedChange = 1;



// Position of sausage dog when you win

let winX;
let winY;



// Position and image of the sausage dog we're searching for
let targetX;
let targetY;
let targetImage;


// Create velocity for the target
let targetVx;
let targetVy;


// The ten decoy images
let decoyImage1;
let decoyImage2;
let decoyImage3;
let decoyImage4;
let decoyImage5;
let decoyImage6;
let decoyImage7;
let decoyImage8;
let decoyImage9;
let decoyImage10;

// The number of decoys to show on the screen, randomly
// chosen from the decoy images

// Increase number of decoys to make it harder
let numDecoys = 160;

// Keep track of whether they've won
let gameOver = false;

// preload()
//
// Loads the target and decoy images before the program starts
function preload() {



  targetImage = loadImage("assets/images/animals-target.png");

  decoyImage1 = loadImage("assets/images/animals-01.png");
  decoyImage2 = loadImage("assets/images/animals-02.png");
  decoyImage3 = loadImage("assets/images/animals-03.png");
  decoyImage4 = loadImage("assets/images/animals-04.png");
  decoyImage5 = loadImage("assets/images/animals-05.png");
  decoyImage6 = loadImage("assets/images/animals-06.png");
  decoyImage7 = loadImage("assets/images/animals-07.png");
  decoyImage8 = loadImage("assets/images/animals-08.png");
  decoyImage9 = loadImage("assets/images/animals-09.png");
  decoyImage10 = loadImage("assets/images/animals-10.png");
}

// setup()
//
// Creates the canvas, sets basic modes, draws correct number
// of decoys in random positions, then the target
function setup() {
  createCanvas(windowWidth,windowHeight);
  background("#ffff00");
  imageMode(CENTER);





  // Use a for loop to draw as many decoys as we need
  for (let i = 0; i < numDecoys; i++) {
    // Choose a random location on the canvas for this decoy
    let x = random(0,width);
    let y = random(0,height);


    // Generate a random number we can use for probability


    let r = random();
    // Use the random number to display one of the ten decoy
    // images, each with a 10% chance of being shown
    // We'll talk more about this nice quality of random soon enough.
    // But basically each "if" and "else if" has a 10% chance of being true



// Make some decoy images larger by increasing width and height


    if (r < 0.1) {
      image(decoyImage1,x,y,decoyImage1.width*1.3, decoyImage1.height*1.3);
    }
    else if (r < 0.2) {
      image(decoyImage2,x,y,decoyImage2.width*1.3, decoyImage2.height*1.3);
    }
    else if (r < 0.3) {
      image(decoyImage3,x,y);
    }
    else if (r < 0.4) {
      image(decoyImage4,x,y);
    }
    else if (r < 0.5) {
      image(decoyImage5,x,y,decoyImage5.width*1.3, decoyImage5.height*1.3);
    }
    else if (r < 0.6) {
      image(decoyImage6,x,y);
    }
    else if (r < 0.7) {
      image(decoyImage7,x,y);
    }
    else if (r < 0.8) {
      image(decoyImage8,x,y);
    }
    else if (r < 0.9) {
      image(decoyImage9,x,y,decoyImage9.width*1.5, decoyImage9.height*1.3);
    }
    else if (r < 1.0) {
      image(decoyImage10,x,y);
    }


}


  // Draw the red rectangle on top right of window

      rectMode(CORNER);
      fill(255,0,0);
      rect(windowWidth-250,0, 250, 200);


// Draw our target image in the red rectangle

      image(targetImage, width - 125, 100);


  // Display text CHIEN PERDU
  fill(255);
  textSize(20);
  text(chienPerdu, windowWidth - 200, 50 );


  // Once we've displayed all decoys, we choose a random location for the target
  targetX = random(0,width);
  targetY = random(0,height);


// Avoid that our target image gets displayed under the red rectangle
  if ((targetX > width - 250) && (targetY < 200)){

    targetX = 100 + random(0,100);
    targetY= 200 + random(0,100);
  }




  // And draw it (because it's the last thing drawn, it will always be on top)
  image(targetImage,targetX,targetY);




  // Target initial Velocity
    targetVx = 0;
    targetVy = 0;

//winning image Position
    winX=targetX;
    winY=targetY;


}


// draw()
//
// Displays the game over screen if the player has won,
// otherwise nothing (all the gameplay stuff is in mousePressed())
function draw() {






  if (gameOver) {




    // Prepare our typography
    textFont("Helvetica");
    textSize(128);
    textAlign(CENTER,CENTER);
    noStroke();
    fill(random(255));

    // Tell them they won!
    text("YOU WINNED!",width/2,height/2);

    // Draw a circle around the sausage dog to show where it is (even though
    // they already know because they found it!)
    noFill();
    stroke(random(255));
    strokeWeight(10);
    ellipse(targetX,targetY,targetImage.width,targetImage.height);


// Draw and make the dog image move across the screen randomly
  image(targetImage,winX,winY);
  targetVx += random(-speedChange,speedChange);
  targetVy += random(-speedChange,speedChange);
  winX += targetVx;
  winY +=targetVy;



// MAke the target image wrap arround the canvas

    if (winX < 0) {
      winX += width;
    }
    else if (winX> width) {
      winX -= width;
    }
    if ( winY< 0) {
      winY += height;
    }
    else if (winY> height) {
      winY -= height;
    }















  }
}

// mousePressed()
//
// Checks if the player clicked on the target and if so tells them they won
function mousePressed() {
  // The mouse was clicked!
  // Check if the cursor is in the x range of the target
  // (We're subtracting the image's width/2 because we're using imageMode(CENTER) -
  // the key is we want to determine the left and right edges of the image.)
  if (mouseX > targetX - targetImage.width/2 && mouseX < targetX + targetImage.width/2) {
    // Check if the cursor is also in the y range of the target
    // i.e. check if it's within the top and bottom of the image
    if (mouseY > targetY - targetImage.height/2 && mouseY < targetY + targetImage.height/2) {
      gameOver = true;
    }
  }
}
