// Astronautrus
//
// A class that represents the russian astronauts that extends from the astronaut mother class
// moves on screen based on a noise() function. It can move around
// the screen and be consumed by the alien , it start by being hidden then it appears on screen, they are
// so smart they learned how to camouflage in space

class Astronautrus extends Astronaut {

  // constructor
  //
  // Sets the initial values for the astronaut's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, radius) {
    super(x, y, speed, radius);

    // Vriables to make the russian astronauts camouflage
    this.visibleduration = 5;
    this.visibletimer = 0;

  }

  // display
  //
  // Draw the prey as an ellipse on the canvas
  // with a radius the same size as its current health.
  display() {
    push();
    noStroke();
    // Display properties
    // with an if statement to create the effect of camouflage , make them appear And
    // disappear to make them harder to catch

    this.radius = this.health;
    this.visibletimer -= deltaTime / 1000;

    if (this.visibletimer > 0) {
      // Display prey as an image
      if (this.radius > 20) {
        imageMode(CENTER);
        image(rusastroImg, this.x, this.y, this.radius * 2, this.radius * 2);
      }
    }

    if (this.visibletimer < -this.visibleduration) {
      this.visibletimer = this.visibleduration
    }

    pop();
  }

}
