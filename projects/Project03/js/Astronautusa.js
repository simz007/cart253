// Astronautusa
//
// A class that represents the american astronaut that extands the astronaut class
// moves on screen based on a noise() function. It can move around
// the screen and be consumed by the alien.

class Astronautusa extends Astronaut {

  // constructor
  //
  // Sets the initial values for the astronaut's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, radius) {
    super(x, y, speed, radius)
  }


  // display
  //
  // Draw the prey as an ellipse on the canvas
  // with a radius the same size as its current health.
  display() {
    push();
    noStroke();
    // Display properties
    // this.astroImage = astroImg;
    this.radius = this.health;

    // Display prey as an image
    if (this.radius > 20) {
      imageMode(CENTER);
      image(astroImg, this.x, this.y, this.radius * 2, this.radius * 2);
    }
    pop();
  }

}
