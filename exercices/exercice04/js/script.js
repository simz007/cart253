"use strict";

// Pong Soccer
// by Simon Zogheib
//
// A "simple" implementation of Soccer Pong with a bar as a scoring guide
// Up and down keys control the right hand paddle, W and S keys control
// the left hand paddle, the first player to get to 10 goals wins the game.

// Whether the game has started
let playing = false;

// To track if the game is over
let gameOver = false;

// Game colors (using hexadecimal)
let bgColor = 0;
let fgColor = 255;

// BALL

// A ball object with the properties of
// position, size, velocity, and speed
let ball = {
  x: 0,
  y: 0,
  size: 30,
  vx: 0,
  vy: 0,
  speed: 5
}

// PADDLES

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, and speed
let leftPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: 70,
  vy: 0,
  speed: 5,
  upKey: 87,
  downKey: 83,
  green: 255,
  alpha: 255
}

// RIGHT PADDLE

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, and speed
let rightPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: 70,
  vy: 0,
  speed: 5,
  upKey: 38,
  downKey: 40,
  green: 255,
  alpha: 255
}

// A variable to hold the beep sound we will play on bouncing
let beepSFX;

//A variable to hold Applause sound evrytime a player Scores
let applauseSFX;

// Variables to track the Scroe
let rightScore = 0;
let leftScore = 0;

// Visual Bars for score
let leftBar = {
  x: 50,
  y: 50,
  w: 10,
  h: 20,
}
let rightBar = {
  x: 450,
  y: 50,
  w: 10,
  h: 20,
}

// Variable to store the background image
let bgImage;

// Variable to store the ball image
let ballImage;


// preload()
//
// Loads the beep audio for the sound of bouncing
// Load applause sound when a player scores

function preload() {
  beepSFX = new Audio("assets/sounds/beep.wav");
  applauseSFX = new Audio("assets/sounds/applause.wav");
  // Load background Image
  bgImage = loadImage("assets/images/bg.png");
  ballImage = loadImage("assets/images/ball.png");
}

// setup()
//
// Creates the canvas, sets up the drawing modes,
// Sets initial values for paddle and ball positions
// and velocities.
function setup() {
  // Create canvas and set drawing modes
  createCanvas(640, 480);
  rectMode(CENTER);
  noStroke();
  fill(fgColor);

  setupPaddles();
  resetBall();
}

// setupPaddles()
//
// Sets the starting positions of the two paddles
function setupPaddles() {
  // Initialise the left paddle position
  leftPaddle.x = 0 + leftPaddle.w;
  leftPaddle.y = height / 2;

  // Initialise the right paddle position
  rightPaddle.x = width - rightPaddle.w;
  rightPaddle.y = height / 2;
}

// draw()
//
// Calls the appropriate functions to run the game
// See how tidy it looks?!
function draw() {

  // Add the Background image
  image(bgImage, 0, 0);

  if (playing && !gameOver) {
    // Check if game is over
    checkGameOver();
    // If the game is in play, we handle input and move the elements around
    handleInput(leftPaddle);
    handleInput(rightPaddle);
    updatePaddle(leftPaddle);
    updatePaddle(rightPaddle);
    updateBall();

    checkBallWallCollision();
    checkBallPaddleCollision(leftPaddle);
    checkBallPaddleCollision(rightPaddle);



    // Check if the ball went out of bounds and respond if so
    // (Note how we can use a function that returns a truth value
    // inside a conditional!)
    if (ballIsOutOfBounds()) {
      // If it went off either side, reset it
      resetBall();
      // This is where we would likely count points, depending on which side
      // the ball went off...

    }
  }

  // We always display the paddles and ball so it looks like Pong!
  displayPaddle(leftPaddle);
  displayPaddle(rightPaddle);
  displayBall();
  displayScoreBar(rightBar);
  displayScoreBar(leftBar);

  if (gameOver) {
    gameOverScreen();
  } else if (!playing) {
    // Otherwise we display the message to start the game
    displayStartMessage();
  }
}

// handleInput()
//
// Checks the mouse and keyboard input to set the velocities of the
// left and right paddles respectively.
function handleInput(paddle) {
  // Move the paddle based on its up and down keys
  // If the up key is being pressed
  if (keyIsDown(paddle.upKey)) {
    // Move up
    paddle.vy = -paddle.speed;
  }
  // Otherwise if the down key is being pressed
  else if (keyIsDown(paddle.downKey)) {
    // Move down
    paddle.vy = paddle.speed;
  } else {
    // Otherwise stop moving
    paddle.vy = 0;
  }
}

// updatePositions()
//
// Sets the positions of the paddles and ball based on their velocities
function updatePaddle(paddle) {
  // Update the paddle position based on its velocity
  paddle.y += paddle.vy;
}

// updateBall()
//
// Sets the position of the ball based on its velocity
function updateBall() {
  // Update the ball's position based on velocity
  ball.x += ball.vx;
  ball.y += ball.vy;
}

// ballIsOutOfBounds()
//
// Checks if the ball has gone off the left or right
// Returns true if so, false otherwise
function ballIsOutOfBounds() {
  // Update the score depending on where the ball went
  // Change the opacity of the paddles, the more the loose the more they get transparant
  // using an alpha value and calling it from the object
  // constrain the right and left score to a maximum value of 10

  if (ball.x < 0) {
    rightScore = rightScore + 1;
    rightScore = constrain(rightScore, 0, 10);
    leftPaddle.alpha -= 25;

  }
  if (ball.x > width) {
    leftScore = leftScore + 1;
    leftScore = constrain(leftScore, 0, 10);
    rightPaddle.alpha -= 25;

  }

  // Check for ball going off the sides
  if (ball.x < 0 || ball.x > width) {
    // Play applause sound effect by rewinding and then playing
    applauseSFX.currentTime = 0;
    applauseSFX.play();
    return true;
  } else {
    return false;
  }

}

// checkBallWallCollision()
//
// Check if the ball has hit the top or bottom of the canvas
// Bounce off if it has by reversing velocity
// Play a sound
function checkBallWallCollision() {
  // Check for collisions with top or bottom...
  if (ball.y < 0 || ball.y > height) {
    // It hit so reverse velocity
    ball.vy = -ball.vy;
    // Play our bouncing sound effect by rewinding and then playing
    beepSFX.currentTime = 0;
    beepSFX.play();
  }
}

// checkBallPaddleCollision(paddle)
//
// Checks for collisions between the ball and the specified paddle
function checkBallPaddleCollision(paddle) {
  // VARIABLES FOR CHECKING COLLISIONS

  // We will calculate the top, bottom, left, and right of the
  // paddle and the ball to make our conditionals easier to read...
  let ballTop = ball.y - ball.size / 2;
  let ballBottom = ball.y + ball.size / 2;
  let ballLeft = ball.x - ball.size / 2;
  let ballRight = ball.x + ball.size / 2;

  let paddleTop = paddle.y - paddle.h / 2;
  let paddleBottom = paddle.y + paddle.h / 2;
  let paddleLeft = paddle.x - leftPaddle.w / 2;
  let paddleRight = paddle.x + paddle.w / 2;

  // First check the ball is in the vertical range of the paddle
  if (ballBottom > paddleTop && ballTop < paddleBottom) {
    // Then check if it is touching the paddle horizontally
    if (ballLeft < paddleRight && ballRight > paddleLeft) {
      // Then the ball is touching the paddle
      // Reverse its vx so it starts travelling in the opposite direction
      ball.vx = -ball.vx;
      // Play our bouncing sound effect by rewinding and then playing
      beepSFX.currentTime = 0;
      beepSFX.play();
    }
  }
}

// displayPaddle(paddle)
//
// Draws the specified paddle
function displayPaddle(paddle) {
  // Draw the paddles
  push();
  fill(255, paddle.alpha);
  rect(paddle.x, paddle.y, paddle.w, paddle.h);
  pop();

}


// displayBall()
//
// Draws the ball on screen as an ellipse
function displayBall() {
  // Draw the soccer ball image
  push();
  imageMode(CENTER);
  image(ballImage, ball.x, ball.y, ball.size, ball.size);
  pop();
}

// resetBall()
//
// Sets the starting position and velocity of the ball
function resetBall() {
  // Making the ball launch in the direction of the paddle that won
  // the most recent point
  if (ball.x < 0) {
    ball.vx = ball.speed;
  } else if (ball.x > width) {
    ball.vx = -ball.speed;
  } else {
    ball.vx = ball.speed;
  }

  // Give the ball a random y velocity
  // give it a random value between 1 and 6
  ball.vy = random(-3, 6);

  // Initialise the ball's position and velocity
  ball.x = width / 2;
  ball.y = height / 2;

}

// displayStartMessage()
//
// Shows a message about how to start the game
function displayStartMessage() {
  push();
  textAlign(CENTER, CENTER);
  textSize(40);
  textFont("Impact");
  fill(255, 255, 0);
  text("CLICK TO START", width / 2, 100);
  pop();
}

// mousePressed()
//
// Here to require a click to start playing the game
// Which will help us be allowed to play audio in the browser
// add a mousePressed statement to reset the game after the gameover screen with a click
function mousePressed() {

  if (!playing) {
    playing = true;
  } else if (gameOver) {
    resetGame();
    setupPaddles();
  }
}

// function to draw the score Bars
function displayScoreBar() {


  // map the width of the right score bar to the score of
  // the right side player and limit the score to 10
  let rightBarScore;
  rightBarScore = map(rightScore, 0, 10, 0, 110);

  // Draw the right Score bar by using two diffrent rectangles
  // one on top of the other, the top green rectangle will change size
  // depending on the right score
  push();
  rectMode(CORNER);
  fill(255, 0, 0);
  rect(rightBar.x, rightBar.y, 110, 20);
  fill(0, 255, 0);
  rectMode(CORNER);
  rect(rightBar.x, rightBar.y, rightBarScore, rightBar.h);
  pop();

  // map the width of the left score bar to the score of
  // the left side player and limit the score to 10
  let leftBarScore;
  leftBarScore = map(leftScore, 0, 10, 0, 110);

  // Draw the left Score bar by using two diffrent rectangles
  // one on top of the other, the top green rectangle will change size
  // depending on the left score
  push()
  rectMode(CORNER);
  fill(255, 0, 0);
  rect(leftBar.x, leftBar.y, 110, 20);
  fill(0, 255, 0);
  rectMode(CORNER);
  rect(leftBar.x, leftBar.y, leftBarScore, leftBar.h);
  pop();
}

// Fuction to chek if the game is over
// once a player reaches 10 points the game ends
function checkGameOver() {
  if ((leftScore >= 10) || (rightScore >= 10)) {
    gameOver = true;
  }
}

// Fucntion to add the text of the game over screnn and display
// each player's score
function gameOverScreen() {
  // set the game over screen to a black background with Green and white text on it
  background(0);
  push();
  textFont("Impact");
  fill(0, 255, 0);
  textSize(30);
  textAlign(CENTER, CENTER);
  // Display We have a Winner Text
  text("WE HAVE A WINNER", width / 2, 200);
  pop();

  push();
  fill(255);
  textSize(25);
  textAlign(CENTER, CENTER);
  // Display the score of each player after the game is over
  text("Right player Scored " + (rightScore) + " Goal(s)", width / 2, 240);
  text("Left player Scored " + (leftScore) + " Goal(s)", width / 2, 270);
  pop();
}

// function to reset the game

function resetGame() {
  playing = false;
  gameOver = false;
  leftScore = 0;
  rightScore = 0;
  leftPaddle.alpha = 255;
  rightPaddle.alpha = 255;

}
