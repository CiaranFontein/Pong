import { SVG_NS } from "../settings";

export default class Trail {
  constructor(length) {
    this.length = length;
    this.balls = [];
  }

  render(svg, ball) {
    //Creates new TrailBall at location of ball
    this.balls.push(
      new TrailBall(ball.x, ball.y, ball.radius, [
        Math.random() - 0.5,
        Math.random() - 0.5
      ])
    );
    if (this.balls.length > this.length) {
      this.balls.shift(); //shift removes first element
    }

    this.shrinkBalls(this.balls);
    for (var i = 0; i < this.length; i++) {
      if (this.balls[i]) {
        this.balls[i].move();
        this.renderCircleOfTrail(svg, this.balls[i]);
      }
    }
  }

  renderCircleOfTrail(svg, ball) {
    let circle = document.createElementNS(SVG_NS, "circle");
    circle.setAttributeNS(null, "r", ball.radius);
    circle.setAttributeNS(null, "cx", ball.x);
    circle.setAttributeNS(null, "cy", ball.y);
    circle.setAttributeNS(null, "fill", getRandomColor());
    svg.appendChild(circle);
  }

  //Makes the trail shorter at the end
  shrinkBalls(balls) {
    for (var j = balls.length - 1; j > 0; j--) {
      balls[j].radius -= j * 0.002;
      if (balls[j].radius < 0) {
        balls[j].radius = 0;
      }
    }
  }
}

//Was creating Balls from ball class but they hurt the framerate too much and had velocities
class TrailBall {
  constructor(x, y, radius, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velocity = velocity;
    this.acceleration = -0.01;
  }

  move() {
    this.x += this.velocity[0];
    this.y += this.velocity[1];
  }
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
