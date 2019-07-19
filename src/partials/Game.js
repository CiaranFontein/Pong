import Board from "./board";
import { SVG_NS } from "../settings";
import Paddle from "./paddle";
import Ball from "./ball";
import { KEYS } from "../settings";

const paddleHeight = 128;
const paddleWidth = 8;
const paddlePadding = 30;
const boardClassName = "board";
const ballRadius = 8;
const ballVelocity = [5, 3];
const ballClassName = "ball";
const p1Up = KEYS.a;
const p1Down = KEYS.z;
const p2Up = KEYS.up;
const p2Down = KEYS.down;

export default class Game {
  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;

    const boardHeight = this.height;
    const boardLength = this.width;

    let paused = true;

    this.gameElement = document.getElementById(this.element);

    this.board = new Board(boardLength, boardHeight, boardClassName);

    this.paddle1 = new Paddle(
      boardHeight,
      paddleWidth,
      paddleHeight,
      paddlePadding,
      boardHeight / 2,
      p1Up,
      p1Down
    );
    this.paddle2 = new Paddle(
      boardHeight,
      paddleWidth,
      paddleHeight,
      boardLength - paddlePadding - paddleWidth / 2,
      boardHeight / 2,
      p2Up,
      p2Down
    );

    this.ball = new Ball(
      ballRadius,
      boardLength,
      boardHeight,
      ballClassName,
      ballVelocity
    );

    document.addEventListener("keydown", event => {
      switch (event.key) {
        case KEYS.spaceBar:
          this.paused = !this.paused;
          break;
      }
    });
  } //End of CONSTRUCTOR

  render() {
    if (this.paused) {
      return;
    }
    this.gameElement.innerHTML = "";
    let svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttributeNS(null, "width", this.width);
    svg.setAttributeNS(null, "height", this.height);
    svg.setAttributeNS(null, "viewBox", `0 0 ${this.width} ${this.height}`);
    this.gameElement.appendChild(svg);

    this.board.render(svg);
    this.paddle1.render(svg);
    this.paddle2.render(svg);
    this.ball.render(svg, this.paddle1, this.paddle2);
  }

  checkPaddleCollision(object1, object2) {
    if (Math.abs(object1.x - object2.x) <= object1.radius + object2.width / 2) {
      if (
        Math.abs(object1.y - object2.y) < object2.height / 2 + object1.radius &&
        Math.abs(object1.y - object2.y) < object2.height / 2 + object1.radius
      ) {
        object1.applySpin(object2.speed);
        this.ball.bounce();
      }
    }
  }
}
