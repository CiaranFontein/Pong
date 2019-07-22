import Board from "./board";
import { SVG_NS } from "../settings";
import Paddle from "./paddle";
import Ball from "./ball";
import Score from "./score";
import { KEYS } from "../settings";

const paddleHeight = 80;
const paddleWidth = 8;
const paddlePadding = 30;
const boardClassName = "board";
const ballRadius = 8;
const ballVelocity = [5, 2];
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
    this.direction = 1;
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

    this.ball = new Ball(ballRadius, boardLength, boardHeight, ballVelocity);

    this.score1 = new Score(this.width / 2 - 50, 30, 30);
    this.score2 = new Score(this.width / 2 + 25, 30, 30);

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
    this.score1.render(svg, this.paddle1.score);
    this.score2.render(svg, this.paddle2.score);
    this.paddle1.render(svg);
    this.paddle2.render(svg);
    this.ball.render(svg, this.paddle1, this.paddle2);
  }
}
