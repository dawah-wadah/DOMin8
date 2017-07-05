/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Coord {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  equals(coord2) {
    return (this.x == coord2.x) && (this.y == coord2.y);
  }

  isOpposite(coord2) {
    return (this.x == (-1 * coord2.x)) && (this.y == (-1 * coord2.y));
  }

  plus(coord2) {
    return new Coord(this.x + coord2.x, this.y + coord2.y);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Coord);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const DOMNodeCollection = __webpack_require__(4);

const functionQueue = [];
let docReady = false;
document.addEventListener("DOMContentLoaded", execute);

function execute() {
  docReady = true;
  functionQueue.forEach((func) => {
    func();
  });
}

window.$w = function(selector) {
  if (typeof selector === "function") {
    if (docReady) {
      selector();
    } else {
      functionQueue.push(selector);
    }
  } else if (selector instanceof HTMLElement) {
      return new DOMNodeCollection([selector]);
  } else if (typeof selector === "string") {
      const nodeList = document.querySelectorAll(selector);
      const nodeListArray = Array.from(nodeList);
      return new DOMNodeCollection(nodeListArray);
  } else if (selector === window) {
      return new DOMNodeCollection([window]);
  }
};

$w.extend = function(objectA, ...objects) {
  objects.forEach((object) => {
    for (let key in object) {
      objectA[key] = object[key];
    }
  });
  return objectA;
};

$w.ajax = function(options = {}) {
  const defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: "GET",
    url: "",
    data: {},
    success: function() {},
    error: function() {}
  };

  $w.extend(defaults, options);
  const request = new XMLHttpRequest();

  request.open(defaults.method, defaults.url);
  request.onload = function() {
    if (request.status === 200) {
      defaults.success(JSON.parse(request.response));
    } else {
      defaults.error(JSON.parse(request.response));
    }
  };
  request.send(defaults.data);
};

module.exports = $w;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_view__ = __webpack_require__(5);
const $w = __webpack_require__(1);


document.addEventListener('DOMContentLoaded', () => {
  $w('.new-game').removeClass('hidden');
  const rootEl = $w('.grid');
  const view = new __WEBPACK_IMPORTED_MODULE_0__game_view__["a" /* default */](rootEl);
  $w('.new-game').on('click', () => {
    view.gameInterval = setInterval( view.step.bind(view), 100);

    $w('.new-game').addClass('hidden');
  });
});


/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(collection = []) {
    this.collection = collection;
  }

  html(arg) {
    if (arg === undefined) {
      return this.collection[0].innerHTML;
    } else {
      this.collection.forEach((node) => {
        node.innerHTML = arg;
        return;
      });
    }
  }

  empty() {
    return this.html('');
  }

  append(content) {
    if (typeof content === 'string') {
      this.collection.forEach((node) => {
        node.innerHTML += content;
      });
    } else if (content instanceof DOMNodeCollection) {
      this.collection.forEach((parent) => {
        content.collection.forEach((child) => {
          parent.appendChild(child.cloneNode(true));
        });
      });
    }
  }

  attr(key, val) {
    if (val === undefined) {
      return this.collection[0].getAttribute(key);
    } else {
      this.collection[0].setAttribute(key, val);
      return;
    }
  }

  addClass(className) {
    this.collection.forEach(node => node.classList.add(className));
  }

  removeClass(className) {
    this.collection.forEach(node => node.classList.remove(className));
  }

  children() {
    let childrenCollection = [];
    this.collection.forEach((childElement) => {
      childrenCollection = childrenCollection.concat(childElement.children);
    });

    return new DOMNodeCollection(childrenCollection);
  }

  parent() {
    let parentCollection = [];
    this.collection.forEach((childElement) => {
      parentCollection = parentCollection.concat(childElement.parentElement);
    });

    return new DOMNodeCollection(parentCollection);
  }

  find(selector) {
    let selectorNodes = [];
    this.collection.forEach((node) => {
      const allNodes = node.querySelectorAll(selector);
      selectorNodes = selectorNodes.concat(Array.from(allNodes));
    });
    return new DOMNodeCollection(selectorNodes);
  }

  remove() {
    this.collection.forEach(node => node.parentNode.removeChild(node));
  }

  on(e, callback) {
    this.collection.forEach((node) => {
      node.addEventListener(e, callback);
      node.eventCallBack = callback;
    });
    return;
  }

  off(e) {
    this.collection.forEach((node) => {
      const callback = node.eventCallBack;
        node.removeEventListener(e, callback);
    });
  }

  eq(idx) {
    return new DOMNodeCollection([this.collection[idx]]);
  }
}

module.exports = DOMNodeCollection;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__board_js__ = __webpack_require__(6);
const $w = __webpack_require__(1);


class GameView{
  constructor(rootEl) {
    this.rootEl = rootEl;
    this.board = new __WEBPACK_IMPORTED_MODULE_0__board_js__["a" /* default */]();
    this.grid = this.buildGrid();
    this.scoreEl = $w('.score');
    this.highScoreEl = $w('.high-score');
    this.gameOverEl = $w('.game-over');
    this.restart = this.restart.bind(this);
    $w(window).on("keydown", this.handleKeyEvent.bind(this));
  }

  buildGrid() {
    let rootInnerHTML = "";
    for (let i = 0; i < this.board.dimension; i++) {
      rootInnerHTML += "<ul>";
      for (let j = 0; j < this.board.dimension; j++) {
        rootInnerHTML += "<li></li>";
      }
      rootInnerHTML += "</ul>";
    }
    this.rootEl.html(rootInnerHTML);
    this.liList = $w("li");
  }

  handleKeyEvent(e) {
    if (GameView.KEYS[e.keyCode]) {
      this.board.snake.turn(GameView.KEYS[e.keyCode]);
    }
  }

  render() {
    this.updateClasses(this.board.snake.segments, "snake");
    this.updateClasses([this.board.ration.position], "ration");
    this.updateSnakeHead();
    this.updateScore();
  }

  updateClasses(coords, className) {
    $w(`.${className}`).removeClass(className);
    if (coords) {
      coords.forEach( coord => {
        const flatCoord = (coord.x * this.board.dimension) + coord.y;
        if (this.liList) {
          this.liList.eq(flatCoord).addClass(className);
        }
      });
    }
  }

  updateSnakeHead() {
    $w(`.snake-head`).removeClass('snake-head');
    let coord = this.board.snake.segments[this.board.snake.segments.length-1];
    if (coord) {
      let flatCoord = coord.x * this.board.dimension + coord.y;
      this.liList.eq(flatCoord).addClass('snake-head');
    }
  }

  updateScore() {
    this.scoreEl.html(`Score: ${this.board.score}`);
    this.highScoreEl.html(`High Score: ${this.board.highScore}`);
  }

  updateHighScore () {
    let score = this.board.score;
    let highScore = this.board.highScore;
    if (score > highScore) {
      highScore = score;
      score = 0;
    }
    this.scoreEl.html(`Score: ${score}`);
    this.highScoreEl.html(`High Score: ${highScore}`);
  }

  step() {
    if (this.board.snake.segments.length > 0 ) {
      this.board.snake.move();
      this.render();
    } else {
      this.updateHighScore();
      this.renderGameOver();
    }
  }

  renderGameOver() {
    const openPlayer = new Audio('assets/efx/metalgeargameov5235.mp3');
    openPlayer.play();
    const closePlayer = new Audio('assets/efx/0x57.wav');
    this.gameOverEl.removeClass('hidden');
    this.gameOverEl.on('click', () => {
      this.gameOverEl.addClass('hidden');
      this.board = new __WEBPACK_IMPORTED_MODULE_0__board_js__["a" /* default */](Math.max(this.board.score, this.board.highScore));
      window.clearInterval(this.gameInterval);
      this.gameInterval = window.setInterval( this.step.bind(this), 100);
      openPlayer.pause();
      openPlayer.currentTime = 0;
      closePlayer.play();
    });
  }

  restart() {
    this.gameInterval = window.setInterval( this.step.bind(this), 100);
  }
}

GameView.KEYS = {
  37: "W",
  38: "N",
  39: "E",
  40: "S",
};

/* harmony default export */ __webpack_exports__["a"] = (GameView);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__snake_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__coord_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ration_js__ = __webpack_require__(9);




class Board {
  constructor(highScore) {
    this.snake = new __WEBPACK_IMPORTED_MODULE_0__snake_js__["a" /* default */](this);
    this.score = 0;
    if (highScore) {
      this.highScore = highScore;
    } else {
      this.highScore = 140.85;
    }
    this.dimension = 25;
    this.ration = new __WEBPACK_IMPORTED_MODULE_2__ration_js__["a" /* default */](this);
  }

  isValidPosition(coord) {
    return (coord.x >= 0 && coord.x < this.dimension &&
            coord.y >= 0 && coord.y < this.dimension);
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Board);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__coord_js__ = __webpack_require__(0);


class Snake {
  constructor(board) {
    this.board = board;
    this.isTurning = false;
    this.direction = "E";
    this.segments = [new __WEBPACK_IMPORTED_MODULE_0__coord_js__["a" /* default */](3, 3)];
    this.eatRation = this.eatRation.bind(this);
    this.growthLeft = 0;
  }

  head() {
    return this.segments.slice(-1)[0];
  }

  isValid() {
    const head = this.head();

    if (!this.board.isValidPosition(this.head())) {
      return false;
    }

    for (let i = 0; i < this.segments.length - 1; i++) {
      if (this.segments[i].equals(head)) {
        return false;
      }
    }
    return true;
  }

  move() {
    this.segments.push(this.head().plus(Snake.MOVES[this.direction]));

    this.isTurning = false;

    if (this.eatRation()) {
      let player = new Audio('assets/efx/0x0D.wav');
      player.play();
      this.board.score += 10;
      this.growthLeft = 3;
      this.board.ration.placeRation();
    }
    if (this.growthLeft > 0) {
      this.growthLeft -= 1;
    } else {
      this.segments.shift();
    }
    if (!this.isValid()) {
      this.segments = [];
    }
  }

  turn(direction) {
    if (Snake.MOVES[this.direction].isOpposite(Snake.MOVES[direction]) ||
      this.isTurning) {
      return;
    } else {
      this.isTurning = true;
      this.direction = direction;
    }
  }

  hasCoord(coords) {
    let result = false;
    this.segments.forEach( segment => {
     if ((segment.x === coords[0]) && (segment.y === coords[1])) {
       result = true;
     }
   });
   return result;
 }

  eatRation() {
    if (this.head().equals(this.board.ration.position)) {
      return true;
    } else {
      return false;
    }
  }

}

Snake.MOVES = {
  "N": new __WEBPACK_IMPORTED_MODULE_0__coord_js__["a" /* default */](-1, 0),
  "E": new __WEBPACK_IMPORTED_MODULE_0__coord_js__["a" /* default */](0, 1),
  "S": new __WEBPACK_IMPORTED_MODULE_0__coord_js__["a" /* default */](1, 0),
  "W": new __WEBPACK_IMPORTED_MODULE_0__coord_js__["a" /* default */](0, -1)
};

/* harmony default export */ __webpack_exports__["a"] = (Snake);


/***/ }),
/* 8 */,
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__coord_js__ = __webpack_require__(0);


class Ration {
  constructor(board) {
    this.board = board;
    this.placeRation();
  }

  placeRation() {
    let x = Math.floor(Math.random() * this.board.dimension);
    let y = Math.floor(Math.random() * this.board.dimension);
    while (this.board.snake.hasCoord([x, y])) {
      x = Math.floor(Math.random() * this.board.dimension);
      y = Math.floor(Math.random() * this.board.dimension);
    }
    this.position = new __WEBPACK_IMPORTED_MODULE_0__coord_js__["a" /* default */](x, y);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Ration);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map