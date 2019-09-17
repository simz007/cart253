// Exercise 1 - Movement
// Pippin Barr
//
// Starter code for exercise 1.
// Draws a moving square and circle that intersect
// in the middle of the canvas.

// The current position and size of the circle
let circleX;
let circleY;
let circleSize = 100;

// The current position and size of the square
let squareX;
let squareY;
let squareSize = 100;

// The current position of New Green Cirlce
let x = 0;
let y = 320;

// The current position of the Yellow Dot following the mouse
let dotX;
let dotY;

// preload()
//
// Nothing here

function preload() {

}

// setup()
//
// Set up the canvas, position the images, set the image mode.

function setup() {
  // Create our canvas
  createCanvas(640,640);

  // Start the circle off screen to the bottom left
  // We divide the size by two because we're drawing from the center
  circleX = -circleSize/2;
  circleY = height + circleSize/2;

  // Start the square off screen to the bottom right
  // We divide the size by two because we're drawing from the center
  squareX = width + squareSize/2;
  squareY = height + squareSize/2;



  // We'll draw rectangles from the center
  rectMode(CENTER);
  // We won't have a stroke in this
  noStroke();


}


// draw()
//
// Change the circle and square's positions so they move
// Draw the circle and square on screen

function draw() {



  // We don't fill the background so we get a drawing effect

  // Move circle up and to the right
  circleX += 1;
  circleY -= 1;
  // Make the circle transparent red
  fill(255,0,0,10);
  // Display the circle
  ellipse(circleX,circleY,circleSize,circleSize);

  // Move square up and to the left
  squareX -= 1;
  squareY -= 1;
  // Make the square transparent blue
  fill(0,0,255,10);
  // Display the square
  rect(squareX,squareY,squareSize,squareSize);


  // Move New Green circle from left to right
      x = x+1;
  // Make the New circle transparent Green
    fill(0,255,0,10);
  // Display New circle
    ellipse(x,y,50,50);


  // Make Yellow dot follow the mouse
  dotX = mouseX;
  dotY = mouseY;
  // Make the Dot Yellow
  fill(255,255,0)
  // Display the Dot
  ellipse(dotX,dotY,30,30)


}
