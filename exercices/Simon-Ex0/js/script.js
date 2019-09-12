// Exercise 0 - Spiritual Self-Portrait
// Pippin Barr
//
// Uses p5's set of shape and colour functions to draw a head
// wearing a hat that Pippin claims is spiritually just like him.


// setup()
//
// Draws a beautiful face on the canvas and puts a hat on it!

function setup() {

  // Set up the canvas and give it a nice pink colour

  createCanvas(500,500);
  background(190);

  // Draw the head and body (or is it a chin?) in pink as well

  // No stroke because shapes look nicer without it I think
  noStroke();
  // Set the nice pink

  fill(0);
  ellipse(250,230,200,200);
  fill(237, 182, 123);
  // The ellipse mode will make it easier to align everything
  ellipseMode(CENTER);

  // Draw the head
  ellipse(260,260,200,200);


  // Draw the body
fill(237, 182, 123);
  ellipse(250,400,100,400);
  ellipse(200,500,200,250);
  ellipse(295,500,200,250);

fill(200,0,123);
line(400,300,282,320);
  // Draw the googly eyes

  // Draw the white backgrounds of the eyes
  fill(255);
  ellipse(200,225,40,20);
  ellipse(300,225,40,20);

  // Draw the black pupils
  fill(0);
  ellipse(200,225,15,15);
  ellipse(300,225,15,15);

  // Draw the nose

  // Nose colour
  fill(235,160,80);
  // Main nose part
  ellipse(250,250,30,50);
  // The two nostril areas
  ellipse(240,265,25,25);
  ellipse(260,265,25,25);

  // Draw the mouth our of an ellipse and a dividing line

  // Lip colour
  fill(255,150,150);
  // Lips
  ellipse(250,320,70,25);
  // Lip divider colour and size
  stroke(255,120,120);
  strokeWeight(4);
  // Lip divider
  line(217,320,282,320);
  // sourcils
  stroke(0);
  strokeWeight(4);

  line(185,205,210,205);
  line(285,205,315,205);

}

// draw()
//
// Does nothing.

function draw() {
  // Nothing here for now.
}
