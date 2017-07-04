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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dom_node_collection__ = __webpack_require__(1);


const $l = function(selector) {
  let elementList;
  switch (typeof selector) {
    case 'string':
      elementList = document.querySelectorAll(selector);
      return Array.from(elementList);
    case 'object':
      if (selector instanceof HTMLElement) {
        return new __WEBPACK_IMPORTED_MODULE_0__dom_node_collection__["a" /* default */](selector);
      }
      break;
    default:
      console.log(selector);
  }
};

window.$l = $l;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class DOMNodeCollection {
  constructor(elements) {
    this.elements = elements;
  }

  each(callback) {
    this.elements.forEach(callback);
  }

  html(string) {
    if (string === undefined) {
      return this.elements[0].innerHTML;
    } else {
      this.forEach((el) => {
        el.innerHTML = string;
      });
    }
  }

  empty() {
    this.forEach((el) => {
      el.innerHTML = "";
    });
  }



  append(arg){
    if (typeof arg === 'string') {
      this.forEach((e) => {
        e.innerHTML += arg;
      });
      this.innerHTML += arg;
    } else if (arg instanceof HTMLElement ) {
      this.forEach((e) => {
        e.innerHTML += arg;
      });
    } else if (arg instanceof DOMNodeCollection) {
      arg.forEach((e) => {
        e.outerHTML = this;
        this.innerHTML += e;
      });
    }
  }

  attr(attribute, value){
    if(value === undefined){
      return this.elements[0].getAttribute(attribute);
    } else {
      this.elements[0].setAttribute(attribute, value);
    }
  }



}

/* harmony default export */ __webpack_exports__["a"] = (DOMNodeCollection);


/***/ })
/******/ ]);