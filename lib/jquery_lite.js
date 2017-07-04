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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dom_node_collection___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__dom_node_collection__);



const _funcs = [];
const _documentReady = false;

const $l = selector => {
  let elementList;
  switch (typeof selector) {
    case 'string':
      return getNodesFromDom(selector);
    case "object":
       if (selector instanceof HTMLElement) {
        return new __WEBPACK_IMPORTED_MODULE_0__dom_node_collection___default.a([selector]);
      }
      break;
    case "function":
      return documentReadyCallback(selector);
    default:
      console.log(selector);
  }
};

const documentReadyCallback = func => {
  if (!_documentReady){
    _funcs.push(func);
  } else {
    func();
  }
};

const getNodesFromDom = selector => {
  const elementList = document.querySelectorAll(selector);
  const elementsArray = Array.from(elementList);
  return new __WEBPACK_IMPORTED_MODULE_0__dom_node_collection___default.a(elementsArray);
};

document.addEventListener('DOMContentLoaded', () => {
  _documentReady = true;
  _funcs.forEach( func => func() );
});

window.$l = $l;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(nodes) {
    this.nodes = nodes;
  }
//prototype methods
  each(cb) {
    this.nodes.forEach(cb);
  }
  // html(argument) {
  //   if (typeof argument === "string") {
  //     this.each(node => node.innerHTML = argument);
  //   } else {
  //     if (this.nodes.length > 0) {
  //       return this.nodes[0].innerHTML;
  //     }
  //   }
  // }
  empty() {
    this.html('');
  }
  // append(argument) {
  //   if(this.nodes.length === 0) return;
  //   if(typeof(argument) === "object" && !(argument instanceof DOMNodeCollection)) {
  //     argument = $l(children);
  //   }
  //   if(typeof argument === "string") {
  //     this.each(node => node.innerHTML += argument);
  //   } else if (argument instanceof DOMNodeCollection) {
  //     this.each(node => {
  //       node.appendChild(childNode.cloneNode(true));
  //     });
  //   }
  // }
  attr(name, value) {
    this.nodes.each(node => {
      node.setAttribute(name, value);
    });
  }
  addClass(name) {
    this.nodes.each(node => node.classList.add(name));
  }
  removeClass(name) {
    this.nodes.each(node => node.classList.remove(name));
  }
// traversal
  children() {
    let result = [];
    this.elements.each(el => {
      result = result.concat(Array.from(el.children));
    });
    return new DOMNodeCollection(result);
  }
  parent() {
    let result = [];
    this.elements.each(el => {
      result.push(el.parentNode);
    });
    return new DOMNodeCollection(result);
  }
  find(selector) {
    let result = [];
    this.elements.each(el => {
      let elementList = el.querySelectorAll(selector);
      result = result.concat(Array.from(elementList));
    });
    return result;
  }
  remove() {
    this.elements.each(el => {
      const parent = el.parentNode;
      parent.removeChild(el);
  });
    this.elements = [];
  }
  on(type, callback) {
    this.elements.each(el => {
      el.addEventListener(type, callback);
      el[`myQuery-${type}-listener`] = callback;
    });
  }
  off(type) {
    this.elements.each(el => {
      let callback = el[`myQuery-${type}-listener`];
      el.removeEventListener(type, callback);
    });
  }
}
module.exports = DOMNodeCollection;


/***/ })
/******/ ]);