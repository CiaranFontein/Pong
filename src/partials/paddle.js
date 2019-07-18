import { SVG_NS } from "../settings";

const deltaTime = 1 / 60;

export default class Paddle {
  constructor(boardHeight, width, height, x, y, upKey, downKey) {
    this.boardHeight = boardHeight;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = 0;
    this.score = 0;
    this.upKey = upKey;
    this.downKey = downKey;

    let force = 1;

    document.addEventListener("keydown", event => {
      switch (event.key) {
        case upKey:
          console.log(this);
          this.move(-force);
          break;
        case downKey:
          console.log(this);
          this.move(force);
      }
    });
  }

  render(svg) {
    let rect = document.createElementNS(SVG_NS, "rect");
    rect.setAttributeNS(null, "class", this.className);
    rect.setAttributeNS(null, "width", this.width);
    rect.setAttributeNS(null, "height", this.height);
    rect.setAttributeNS(null, "x", this.x);
    rect.setAttributeNS(null, "y", this.y);
    rect.setAttributeNS(null, "speed", this.speed);
    rect.setAttributeNS(null, "score", this.score);
    rect.setAttributeNS(null, "fill", "white");
    svg.appendChild(rect);
  }

  move(force) {
    this.speed += force;
  }

  update() {
    this.y += this.speed;
    this.slowToZero();
    this.checkBorderCollisions();
  }

  slowToZero() {
    if (this.speed > 0) {
      this.speed -= 0.01;
    } else if (this.speed < 0) {
      this.speed += 0.01;
    }
  }

  checkBorderCollisions() {
    if (this.y <= 0 || this.y >= this.boardHeight - this.height) {
      this.speed = -this.speed;
    }
  }
}
