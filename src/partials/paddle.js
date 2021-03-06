import { SVG_NS, KEYS } from "../settings";

let paddleAcceleration = 0.5;

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
    this.againstTopEdge = false;
    this.againstBotEdge = false;

    this.keyState = {};

    document.addEventListener("keydown", event => {
      this.keyState[event.key] = true;
    });

    document.addEventListener("keyup", event => {
      this.keyState[event.key] = false;
    });
  }

  render(svg) {
    this.update();
    if (
      this.keyState[KEYS.a] &&
      this.upKey === KEYS.a &&
      !this.againstTopEdge
    ) {
      this.move(-paddleAcceleration);
    }
    if (
      this.keyState[KEYS.up] &&
      this.upKey === KEYS.up &&
      !this.againstTopEdge
    ) {
      this.move(-paddleAcceleration);
    }

    if (
      this.keyState[KEYS.z] &&
      this.downKey === KEYS.z &&
      !this.againstBotEdge
    ) {
      this.move(paddleAcceleration);
    }

    if (
      this.keyState[KEYS.down] &&
      this.downKey === KEYS.down &&
      !this.againstBotEdge
    ) {
      this.move(paddleAcceleration);
    }

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
    if (this.y + this.speed <= 0) {
      this.againstTopEdge = true;
      this.speed = -this.speed * 0.5;
    } else if (this.y + this.speed >= this.boardHeight - this.height) {
      this.againstBotEdge = true;
      this.speed = -this.speed * 0.5;
    } else {
      this.againstBotEdge = false;
      this.againstTopEdge = false;
      this.y += this.speed;
    }
    this.slowToZero();
  }

  slowToZero() {
    if (this.speed > 0) {
      this.speed -= 0.05;
    } else if (this.speed < 0) {
      this.speed += 0.05;
    }
  }
}
