import { SVG_NS } from "../settings";
import Ball from "./ball";

export default class Trail {
  constructor(length) {
    this.length = length;
    this.balls = [];
  }

  render(svg, ball) {
    this.balls.push(new TrailBall(ball.x, ball.y, ball.radius, 1));
    if (this.balls.length > this.length) {
      this.balls.shift();
    }

    console.log(this.balls.length);
    this.shrinkBalls(this.balls);
    for (var i = 0; i < this.length; i++) {
      if (this.balls[i]) {
        this.renderCircleOfTrail(svg, this.balls[i]);
      }
    }
  }

  renderCircleOfTrail(svg, ball) {
    let circle = document.createElementNS(SVG_NS, "circle");
    circle.setAttributeNS(null, "r", ball.radius);
    circle.setAttributeNS(null, "cx", ball.x);
    circle.setAttributeNS(null, "cy", ball.y);
    circle.setAttributeNS(null, "fill", "red");
    circle.setAttributeNS(null, "fill-opacity", ball.opacity);
    svg.appendChild(circle);
  }

  //Makes the trail shorter at the end
  shrinkBalls(balls) {
    for (var j = balls.length - 1; j > 0; j--) {
      balls[j].radius = (j / this.length) * 10;
      if (balls[j].radius < 0) {
        balls[j].radius = 0;
        balls[j].opacity = 0.01;
      }
    }
  }
}

class TrailBall {
  constructor(x, y, radius, opacity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.opacity = opacity;
  }
}
