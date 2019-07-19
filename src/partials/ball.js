import { SVG_NS } from "../settings";

export default class Ball {
  constructor(radius, boardLength, boardHeight, className, velocity) {
    this.radius = radius;
    this.boardLength = boardLength;
    this.boardHeight = boardHeight;
    this.className = className;
    this.x = boardLength / 2;
    this.y = boardHeight / 2;
    this.velocity = velocity;
    this.speed = Math.sqrt(
      Math.exp(this.velocity[0], 2) + Math.exp(this.velocity[1], 2)
    );
    console.log("Start Ball Speed: ", this.speed);
    this.theta = 0;
    this.crazySpinTheta = 0;
  }

  render(svg, paddle1, paddle2) {
    this.wallCollision();
    this.move();
    this.paddleCollision(paddle1, paddle2);

    let circle = document.createElementNS(SVG_NS, "circle");
    circle.setAttributeNS(null, "class", this.className);
    circle.setAttributeNS(null, "r", this.radius);
    circle.setAttributeNS(null, "cx", this.x);
    circle.setAttributeNS(null, "cy", this.y);
    circle.setAttributeNS(null, "fill", "white");

    svg.appendChild(circle);
  }

  move() {
    this.x += this.velocity[0];
    this.y += this.velocity[1];
  }

  wallCollision() {
    const hitLeft = this.x - this.radius <= 0;
    const hitRight = this.x + this.radius >= this.boardLength;
    const hitTop = this.y - this.radius <= 0;
    const hitBottom = this.y + this.radius >= this.boardHeight;

    if (hitLeft || hitRight) {
      this.velocity[0] = -this.velocity[0];
    }

    if (hitTop || hitBottom) {
      this.velocity[1] = -this.velocity[1];
    }
  }

  paddleCollision(player1, player2) {
    // moving right
    // console.log("player1", player1);
    // console.log("player2", player2);
    if (this.velocity[0] > 0) {
      // collision detection for right paddle
      if (
        this.x + this.radius >= player2.x && // right edge of the ball is >= left edge of the paddle
        this.x + this.radius <= player2.x + player2.width && // right edge of the ball is <= right edge of the paddle
        (this.y >= player2.y && this.y <= player2.y + player2.height) // ball Y is >= paddle top Y and <= paddle bottom Y
      ) {
        // if true then there's a collision
        this.velocity[0] = -this.velocity[0];
        this.applySpin(player2.speed);
      }
    } else {
      // moving left
      if (
        this.x - this.radius <= player1.x + player1.width &&
        this.x - this.radius >= player1.x &&
        (this.y >= player1.y && this.y <= player1.y + player1.height)
      ) {
        this.velocity[0] = -this.velocity[0];
        this.applySpin(player1.speed);
      }
    }
  }

  //EXPERIMENTAL
  spinBounce() {
    this.theta = -this.theta;
    this.velocity[0] = this.speed * -Math.sin(this.theta);
    this.velocity[1] = this.speed * -Math.cos(this.theta);
  }

  applyRotationalFrictionToZero() {
    if (this.theta > 0.05) {
      this.theta -= 0.01;
    } else if (this.theta < -0.05) {
      this.theta += 0.01;
    }
  }

  applySpin(paddleSpeed) {
    console.log("Applying Spin: " + this.theta);
    this.theta = paddleSpeed;
  }

  spin() {
    this.velocity[0] = this.speed * Math.cos(this.theta);
    this.velocity[1] = this.speed * Math.sin(this.theta);
    this.applyRotationalFrictionToZero();
  }

  crazySpin() {
    this.velocity[0] += this.speed * Math.cos(this.crazySpinTheta);
    this.velocity[1] += this.speed * Math.sin(this.crazySpinTheta);
    this.crazySpinTheta -= 0.2;
  }

  reset() {
    this.x = this.boardLength / 2;
    this.y = this.boardHeight / 2;
  }
}
