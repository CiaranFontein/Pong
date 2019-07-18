import Board from "./board";
import { SVG_NS } from "../settings";
import Paddle from "./paddle";
import Ball from "./ball";
import { KEYS } from "../settings";

export default class Game {
  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;

    const boardHeight = this.height;
    const boardLength = this.width;
    const paddleHeight = 64;
    const paddleWidth = 8;
    const paddlePadding = 30;
    const paddleSpeed = 10;
    const boardClassName = "board";
    const ballRadius = 8;
    const ballVelocity = [4, 4];
    const ballClassName = "ball";
    const p1Up = KEYS.a;
    const p1Down = KEYS.z;
    const p2Up = KEYS.up;
    const p2Down = KEYS.down;

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
  }

  render() {
    this.gameElement.innerHTML = "";
    let svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttributeNS(null, "width", this.width);
    svg.setAttributeNS(null, "height", this.height);
    svg.setAttributeNS(null, "viewBox", `0 0 ${this.width} ${this.height}`);
    this.gameElement.appendChild(svg);
    this.board.render(svg);
    this.paddle1.render(svg);
    this.paddle2.render(svg);
    this.ball.render(svg);

    this.ball.move();
    this.paddle1.update();
    this.paddle2.update();
    this.checkCollisions();
  }

  checkCollisions() {
    console.log();
    if (
      this.ball.x - this.paddle1.x <
      this.paddle1.width / 2 + this.ball.radius
    ) {
      if (
        this.paddle1.y - this.ball.y <
        this.paddle1.height / 2 + this.ball.radius
      ) {
        this.ball.bounce();
      }
    }
    if (
      this.paddle2.x - this.ball.x - this.ball.radius <
      this.paddle2.width / 2
    ) {
      if (
        Math.abs(this.paddle2.y - this.ball.y) <
        this.paddle2.height / 2 + this.ball.radius
      ) {
        this.ball.bounce();
      }
    }
  }
}
