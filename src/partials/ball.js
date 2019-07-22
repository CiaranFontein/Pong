import { SVG_NS } from "../settings";
import pingSound from "../../public/sounds/smack.ogg";
import Trail from "./trail";

export default class Ball {
  constructor(radius, boardLength, boardHeight, velocity) {
    this.radius = radius;
    this.boardLength = boardLength;
    this.boardHeight = boardHeight;
    this.velocity = velocity;
    this.speed = Math.sqrt(
      this.velocity[0] * this.velocity[0] + this.velocity[1] * this.velocity[1]
    );
    this.startingSpeed = this.speed;
    this.theta = 0;
    this.xFlipped = 1;
    this.yFlipped = 1;

    this.spinSpeed = 0;
    this.accelerationSpeed = 0.1;
    //Pass in the number of circles used to make the trail
    this.trail = new Trail(30);
    this.ping = new Audio(pingSound);
    this.reset();
  }

  render(svg, paddle1, paddle2) {
    this.trail.render(svg, this);
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

    const rightGoal = this.x + this.radius >= this.boardLength;
    const leftGoal = this.x - this.radius <= 0;

    if (rightGoal) {
      this.goal(paddle1);
      this.direction = 1;
    } else if (leftGoal) {
      this.goal(paddle2);
      this.direction = -1;
    }
  }

  move() {
    this.spin();
    this.velocity[0] = this.speed * this.xFlipped * Math.cos(this.theta);
    this.velocity[1] = this.speed * this.yFlipped * Math.sin(this.theta);
    this.x += this.velocity[0];
    this.y += this.velocity[1];
  }

  accelerate() {
    this.speed += this.accelerationSpeed;
  }

  wallCollision() {
    const hitTop = this.y - this.radius <= 0;
    const hitBottom = this.y + this.radius >= this.boardHeight;

    if (hitTop || hitBottom) {
      this.yFlipped = -this.yFlipped;
    }
  }

  paddleCollision(player1, player2) {
    //Collision detection for right paddle
    if (
      this.x + this.radius >= player2.x &&
      this.x + this.radius <= player2.x + player2.width
    ) {
      if (this.y >= player2.y && this.y <= player2.y + player2.height) {
        this.theta += Math.PI;
        this.yFlipped = -this.yFlipped;
        this.ping.play();
        this.applySpin(player2.speed);
      }
    }
    //Collision detection for left paddle
    if (
      this.x - this.radius <= player1.x + player1.width &&
      this.x - this.radius >= player1.x &&
      (this.y >= player1.y && this.y <= player1.y + player1.height)
    ) {
      this.theta += Math.PI / 2;
      this.yFlipped = -this.yFlipped;
      this.ping.play();
      this.applySpin(player1.speed);
    }
  }

  //Slowly reduces spin speed to simulate air friction on the rotation
  applyRotationalFrictionToZero() {
    if (this.spinSpeed > 0) {
      this.spinSpeed -= 0.1;
    } else if (this.spinSpeed < 0) {
      this.spinSpeed += 0.1;
    }
  }

  //Adds spinSpeed to the ball based on speed of paddle on impact
  applySpin(paddleSpeed) {
    console.log("Applying Spin: " + this.paddleSpeed);
    this.spinSpeed += paddleSpeed;
  }

  //Changes the direction the ball is going based on the spinSpeed
  spin() {
    this.theta += this.spinSpeed * 0.001;
    this.applyRotationalFrictionToZero();
  }

  //Resets ball to the center
  reset() {
    this.theta = Math.random() * Math.PI;
    this.speed = this.startingSpeed;
    this.spinSpeed = 0;
    this.x = this.boardLength / 2;
    this.y = this.boardHeight / 2;
  }

  goal(player) {
    this.reset();
    player.score++;
  }
}
