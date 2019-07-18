import "./styles/game.css";
import Game from "./partials/Game";
import Board from "./partials/board";
import Paddle from "./partials/paddle";

const boardHeight = 256;
const boardLength = 512;
const paddleHeight = 8;
const paddleWidth = 2;

// create a game instance
const game = new Game("game", boardLength, boardHeight);
const board = new Board(boardLength, boardHeight);
const paddle1 = new Paddle(boardHeight, paddleHeight, paddleWidth);
const paddle2 = new Paddle(boardHeight, paddleHeight, paddleWidth);

(function gameLoop() {
  game.render();
  requestAnimationFrame(gameLoop);
})();
