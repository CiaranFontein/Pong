import { SVG_NS } from "../settings";

export default class Ball {
  constructor(radius, boardLength, boardHeight, className, velocity) {
    this.radius = radius;
    this.boardLength = boardLength;
    this.boardHeight = boardHeight;
    this.direction = 1;
    this.className = className;
    this.x = boardLength / 2;
    this.y = boardHeight / 2;
    this.velocity = velocity;
  }

  render(svg) {
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

    if (this.y == this.boardHeight - this.radius || this.y == 0 + this.radius) {
      this.velocity[1] = -this.velocity[1];
    }

    if (
      this.x == this.boardLength - this.radius ||
      this.x == this.boardLength - this.radius
    ) {
      this.velocity[0] = -this.velocity[0];
    }
  }

  bounce() {
    this.velocity[0] = -this.velocity[0];
  }
}
