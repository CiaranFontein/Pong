// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/styles/game.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./../../public/fonts/slkscr-webfont.eot":[["slkscr-webfont.ffa4090f.eot","public/fonts/slkscr-webfont.eot"],"public/fonts/slkscr-webfont.eot"],"./../../public/fonts/slkscr-webfont.woff":[["slkscr-webfont.1e0cef22.woff","public/fonts/slkscr-webfont.woff"],"public/fonts/slkscr-webfont.woff"],"./../../public/fonts/slkscr-webfont.ttf":[["slkscr-webfont.e002edc4.ttf","public/fonts/slkscr-webfont.ttf"],"public/fonts/slkscr-webfont.ttf"],"./../../public/fonts/slkscr-webfont.svg":[["slkscr-webfont.16d40719.svg","public/fonts/slkscr-webfont.svg"],"public/fonts/slkscr-webfont.svg"],"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/settings.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SVG_NS = exports.KEYS = void 0;
var KEYS = {
  a: "a",
  // player 1 up key
  z: "z",
  // player 1 down key
  up: "ArrowUp",
  // player 2 up key
  down: "ArrowDown",
  // player 2 down key
  spaceBar: " " // we'll use this later...

};
exports.KEYS = KEYS;
var SVG_NS = "http://www.w3.org/2000/svg";
exports.SVG_NS = SVG_NS;
},{}],"src/partials/board.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _settings = require("../settings");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Board =
/*#__PURE__*/
function () {
  function Board(width, height, className) {
    _classCallCheck(this, Board);

    this.width = width;
    this.height = height;
    this.className = className;
  }

  _createClass(Board, [{
    key: "render",
    value: function render(svg) {
      var rect = document.createElementNS(_settings.SVG_NS, "rect");
      rect.setAttributeNS(null, "class", this.className);
      rect.setAttributeNS(null, "width", this.width);
      rect.setAttributeNS(null, "height", this.height);
      var line = document.createElementNS(_settings.SVG_NS, "line");
      line.setAttributeNS(null, "x1", this.width / 2);
      line.setAttributeNS(null, "x2", this.width / 2);
      line.setAttributeNS(null, "y1", 0);
      line.setAttributeNS(null, "y2", this.height);
      line.setAttributeNS(null, "stroke", "white");
      line.setAttributeNS(null, "stroke-dasharray", "20");
      line.setAttributeNS(null, "stroke-width", "4");
      svg.appendChild(rect);
      svg.appendChild(line);
    }
  }]);

  return Board;
}();

exports.default = Board;
},{"../settings":"src/settings.js"}],"src/partials/paddle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _settings = require("../settings");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var paddleAcceleration = 0.5;

var Paddle =
/*#__PURE__*/
function () {
  function Paddle(boardHeight, width, height, x, y, upKey, downKey) {
    var _this = this;

    _classCallCheck(this, Paddle);

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
    document.addEventListener("keydown", function (event) {
      _this.keyState[event.key] = true;
    });
    document.addEventListener("keyup", function (event) {
      _this.keyState[event.key] = false;
    });
  }

  _createClass(Paddle, [{
    key: "render",
    value: function render(svg) {
      this.update();

      if (this.keyState[_settings.KEYS.a] && this.upKey === _settings.KEYS.a && !this.againstTopEdge) {
        this.move(-paddleAcceleration);
      }

      if (this.keyState[_settings.KEYS.up] && this.upKey === _settings.KEYS.up && !this.againstTopEdge) {
        this.move(-paddleAcceleration);
      }

      if (this.keyState[_settings.KEYS.z] && this.downKey === _settings.KEYS.z && !this.againstBotEdge) {
        this.move(paddleAcceleration);
      }

      if (this.keyState[_settings.KEYS.down] && this.downKey === _settings.KEYS.down && !this.againstBotEdge) {
        this.move(paddleAcceleration);
      }

      var rect = document.createElementNS(_settings.SVG_NS, "rect");
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
  }, {
    key: "move",
    value: function move(force) {
      this.speed += force;
    }
  }, {
    key: "update",
    value: function update() {
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
  }, {
    key: "slowToZero",
    value: function slowToZero() {
      if (this.speed > 0) {
        this.speed -= 0.05;
      } else if (this.speed < 0) {
        this.speed += 0.05;
      }
    }
  }]);

  return Paddle;
}();

exports.default = Paddle;
},{"../settings":"src/settings.js"}],"public/sounds/smack.ogg":[function(require,module,exports) {
module.exports = "/smack.182e8114.ogg";
},{}],"src/partials/trail.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _settings = require("../settings");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Trail =
/*#__PURE__*/
function () {
  function Trail(length) {
    _classCallCheck(this, Trail);

    this.length = length;
    this.balls = [];
  }

  _createClass(Trail, [{
    key: "render",
    value: function render(svg, ball) {
      //Creates new TrailBall at location of ball
      this.balls.push(new TrailBall(ball.x, ball.y, ball.radius));

      if (this.balls.length > this.length) {
        this.balls.shift(); //shift removes first element
      }

      this.shrinkBalls(this.balls);

      for (var i = 0; i < this.length; i++) {
        if (this.balls[i]) {
          this.renderCircleOfTrail(svg, this.balls[i]);
        }
      }
    }
  }, {
    key: "renderCircleOfTrail",
    value: function renderCircleOfTrail(svg, ball) {
      var circle = document.createElementNS(_settings.SVG_NS, "circle");
      circle.setAttributeNS(null, "r", ball.radius);
      circle.setAttributeNS(null, "cx", ball.x);
      circle.setAttributeNS(null, "cy", ball.y);
      circle.setAttributeNS(null, "fill", "red");
      svg.appendChild(circle);
    } //Makes the trail shorter at the end

  }, {
    key: "shrinkBalls",
    value: function shrinkBalls(balls) {
      for (var j = balls.length - 1; j > 0; j--) {
        balls[j].radius = j / this.length * 10;

        if (balls[j].radius < 0) {
          balls[j].radius = 0;
        }
      }
    }
  }]);

  return Trail;
}(); //Was creating Balls from ball class but they hurt the framerate too much and had velocities


exports.default = Trail;

var TrailBall = function TrailBall(x, y, radius) {
  _classCallCheck(this, TrailBall);

  this.x = x;
  this.y = y;
  this.radius = radius;
};
},{"../settings":"src/settings.js"}],"src/partials/ball.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _settings = require("../settings");

var _smack = _interopRequireDefault(require("../../public/sounds/smack.ogg"));

var _trail = _interopRequireDefault(require("./trail"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Ball =
/*#__PURE__*/
function () {
  function Ball(radius, boardLength, boardHeight, velocity) {
    _classCallCheck(this, Ball);

    this.radius = radius;
    this.boardLength = boardLength;
    this.boardHeight = boardHeight;
    this.velocity = velocity;
    this.speed = Math.sqrt(this.velocity[0] * this.velocity[0] + this.velocity[1] * this.velocity[1]);
    this.startingSpeed = this.speed;
    this.theta = 0;
    this.xFlipped = 1;
    this.yFlipped = 1;
    this.spinSpeed = 0;
    this.accelerationSpeed = 0.1; //Pass in the number of circles used to make the trail

    this.trail = new _trail.default(30);
    this.ping = new Audio(_smack.default);
    this.direction = 1;
    this.reset();
  }

  _createClass(Ball, [{
    key: "render",
    value: function render(svg, paddle1, paddle2) {
      this.trail.render(svg, this);
      this.wallCollision();
      this.move();
      this.paddleCollision(paddle1, paddle2);
      var circle = document.createElementNS(_settings.SVG_NS, "circle");
      circle.setAttributeNS(null, "class", this.className);
      circle.setAttributeNS(null, "r", this.radius);
      circle.setAttributeNS(null, "cx", this.x);
      circle.setAttributeNS(null, "cy", this.y);
      circle.setAttributeNS(null, "fill", "white");
      svg.appendChild(circle);
      var rightGoal = this.x + this.radius >= this.boardLength;
      var leftGoal = this.x - this.radius <= 0;

      if (rightGoal) {
        this.goal(paddle1);
        this.direction = 1;
      } else if (leftGoal) {
        this.goal(paddle2);
        this.direction = -1;
      }
    }
  }, {
    key: "move",
    value: function move() {
      this.spin();
      this.velocity[0] = this.speed * this.xFlipped * Math.cos(this.theta);
      this.velocity[1] = this.speed * this.yFlipped * Math.sin(this.theta);
      this.x += this.velocity[0];
      this.y += this.velocity[1];
    }
  }, {
    key: "accelerate",
    value: function accelerate() {
      this.speed += this.accelerationSpeed;
    }
  }, {
    key: "wallCollision",
    value: function wallCollision() {
      var hitTop = this.y - this.radius <= 0;
      var hitBottom = this.y + this.radius >= this.boardHeight;

      if (hitTop || hitBottom) {
        this.yFlipped = -this.yFlipped;
      }
    }
  }, {
    key: "paddleCollision",
    value: function paddleCollision(player1, player2) {
      //Collision detection for right paddle
      if (this.x + this.radius >= player2.x && this.x + this.radius <= player2.x + player2.width) {
        if (this.y >= player2.y && this.y <= player2.y + player2.height) {
          this.theta += Math.PI;
          this.yFlipped = -this.yFlipped;
          this.ping.play();
          this.applySpin(player2.speed);
        }
      } //Collision detection for left paddle


      if (this.x - this.radius <= player1.x + player1.width && this.x - this.radius >= player1.x && this.y >= player1.y && this.y <= player1.y + player1.height) {
        this.theta += Math.PI / 2;
        this.yFlipped = -this.yFlipped;
        this.ping.play();
        this.applySpin(player1.speed);
      }
    } //Slowly reduces spin speed to simulate air friction on the rotation

  }, {
    key: "applyRotationalFrictionToZero",
    value: function applyRotationalFrictionToZero() {
      if (this.spinSpeed > 0) {
        this.spinSpeed -= 0.1;
      } else if (this.spinSpeed < 0) {
        this.spinSpeed += 0.1;
      }
    } //Adds spinSpeed to the ball based on speed of paddle on impact

  }, {
    key: "applySpin",
    value: function applySpin(paddleSpeed) {
      this.spinSpeed += paddleSpeed;
    } //Changes the direction the ball is going based on the spinSpeed

  }, {
    key: "spin",
    value: function spin() {
      this.theta += this.spinSpeed * 0.001;
      this.applyRotationalFrictionToZero();
    } //Resets ball to the center

  }, {
    key: "reset",
    value: function reset() {
      this.theta = this.direction * Math.random() * (Math.PI / 2) + Math.PI / 2;
      this.speed = this.startingSpeed;
      this.spinSpeed = 0;
      this.x = this.boardLength / 2;
      this.y = this.boardHeight / 2;
    }
  }, {
    key: "goal",
    value: function goal(player) {
      this.direction *= -1;
      this.reset();
      player.score++;
    }
  }]);

  return Ball;
}();

exports.default = Ball;
},{"../settings":"src/settings.js","../../public/sounds/smack.ogg":"public/sounds/smack.ogg","./trail":"src/partials/trail.js"}],"src/partials/score.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _settings = require("../settings");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Score =
/*#__PURE__*/
function () {
  function Score(x, y, size) {
    _classCallCheck(this, Score);

    this.x = x;
    this.y = y;
    this.size = size;
  }

  _createClass(Score, [{
    key: "render",
    value: function render(svg, score) {
      var text = document.createElementNS(_settings.SVG_NS, "text");
      text.setAttributeNS(null, "x", this.x);
      text.setAttributeNS(null, "y", this.y);
      text.setAttributeNS(null, "size", this.size);
      text.setAttributeNS(null, "fill", "blue");
      text.textContent = score;
      svg.appendChild(text);
    }
  }]);

  return Score;
}();

exports.default = Score;
},{"../settings":"src/settings.js"}],"src/partials/Game.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _board = _interopRequireDefault(require("./board"));

var _settings = require("../settings");

var _paddle = _interopRequireDefault(require("./paddle"));

var _ball = _interopRequireDefault(require("./ball"));

var _score = _interopRequireDefault(require("./score"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var paddleHeight = 80;
var paddleWidth = 8;
var paddlePadding = 30;
var boardClassName = "board";
var ballRadius = 8;
var ballVelocity = [5, 2];
var p1Up = _settings.KEYS.a;
var p1Down = _settings.KEYS.z;
var p2Up = _settings.KEYS.up;
var p2Down = _settings.KEYS.down;

var Game =
/*#__PURE__*/
function () {
  function Game(element, width, height) {
    var _this = this;

    _classCallCheck(this, Game);

    this.element = element;
    this.width = width;
    this.height = height;
    this.direction = 1;
    var boardHeight = this.height;
    var boardLength = this.width;
    var paused = true;
    this.gameElement = document.getElementById(this.element);
    this.board = new _board.default(boardLength, boardHeight, boardClassName);
    this.paddle1 = new _paddle.default(boardHeight, paddleWidth, paddleHeight, paddlePadding, boardHeight / 2, p1Up, p1Down);
    this.paddle2 = new _paddle.default(boardHeight, paddleWidth, paddleHeight, boardLength - paddlePadding - paddleWidth / 2, boardHeight / 2, p2Up, p2Down);
    this.ball = new _ball.default(ballRadius, boardLength, boardHeight, ballVelocity);
    this.score1 = new _score.default(this.width / 2 - 50, 30, 30);
    this.score2 = new _score.default(this.width / 2 + 25, 30, 30);
    document.addEventListener("keydown", function (event) {
      switch (event.key) {
        case _settings.KEYS.spaceBar:
          _this.paused = !_this.paused;
          break;
      }
    });
  } //End of CONSTRUCTOR


  _createClass(Game, [{
    key: "render",
    value: function render() {
      if (this.paused) {
        return;
      }

      this.gameElement.innerHTML = "";
      var svg = document.createElementNS(_settings.SVG_NS, "svg");
      svg.setAttributeNS(null, "width", this.width);
      svg.setAttributeNS(null, "height", this.height);
      svg.setAttributeNS(null, "viewBox", "0 0 ".concat(this.width, " ").concat(this.height));
      this.gameElement.appendChild(svg);
      this.board.render(svg);
      this.score1.render(svg, this.paddle1.score);
      this.score2.render(svg, this.paddle2.score);
      this.paddle1.render(svg);
      this.paddle2.render(svg);
      this.ball.render(svg, this.paddle1, this.paddle2);
    }
  }]);

  return Game;
}();

exports.default = Game;
},{"./board":"src/partials/board.js","../settings":"src/settings.js","./paddle":"src/partials/paddle.js","./ball":"src/partials/ball.js","./score":"src/partials/score.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

require("./styles/game.css");

var _Game = _interopRequireDefault(require("./partials/Game"));

var _settings = require("./settings");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// create a game instance
var game = new _Game.default("game", 800, 400);

(function gameLoop() {
  game.render();
  requestAnimationFrame(gameLoop);
})();
},{"./styles/game.css":"src/styles/game.css","./partials/Game":"src/partials/Game.js","./settings":"src/settings.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51271" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map