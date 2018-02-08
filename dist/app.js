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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _fs = __webpack_require__(1);

var _fs2 = _interopRequireDefault(_fs);

var _mower = __webpack_require__(2);

var _mower2 = _interopRequireDefault(_mower);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_fs2.default.readFile('./inputfile.txt', 'utf8', function (err, data) {
  if (err) {
    console.error('Cannot find the input File ./file.txt', err);
    return;
  };

  if (!data || data.split('\r\n').length === 0) {
    console.error('Invalid Data Format', data);
    return;
  }

  var inputCommands = data.split('\r\n');
  var firstLine = inputCommands[0];
  var bordersConf = inputCommands[0];

  if (!firstLine || !firstLine.split(' ') || firstLine.split(' ').length < 2) {
    console.error('Cannot find the coordinates of the upper-right corner of the lawn');
    return;
  }

  var cornersPosition = firstLine.split(' ');
  var mower = new _mower2.default(cornersPosition[0], cornersPosition[1]);
  for (var i = 1; i < inputCommands.length - 1; i += 2) {
    var initialPositions = inputCommands[i].split(' ');
    var instructionSequence = inputCommands[i + 1];
    mower.init(initialPositions[0], initialPositions[1], initialPositions[2]);
    mower.executeSequence(instructionSequence);
    console.log(' ' + mower.position.x + ' ' + mower.position.y + ' ' + mower.position.o);
  }
});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mower = function () {
  function Mower() {
    var MaxX = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var MaxY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    _classCallCheck(this, Mower);

    // A map that stores the 4 possible directions,
    // the fitst element of the map is the current direction
    // the current direction's value is equal 1 the rest of the map is 0
    this.directionsMap = [{
      key: 'W',
      value: 1
    }, {
      key: 'N',
      value: 0
    }, {
      key: 'E',
      value: 0
    }, {
      key: 'S',
      value: 0
    }];

    this.corners = {
      MaxX: parseInt(MaxX) || 0,
      MaxY: parseInt(MaxY) || 0
    };
  }

  _createClass(Mower, [{
    key: 'init',
    value: function init() {
      var initialX = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var initialY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var initialO = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'E';

      var possibleDirections = ['W', 'N', 'E', 'S'];
      if (possibleDirections.indexOf(initialO) === -1 || isNaN(parseInt(initialX)) || isNaN(parseInt(initialX)) || parseInt(initialX) > this.corners.MaxX || parseInt(initialY) > this.corners.MaxY) {
        console.error('Invalid initial Values', initialX, initialO, initialO);
        throw Error('Invalid initial Values');
      }

      this.position = {
        x: parseInt(initialX),
        y: parseInt(initialY),
        o: initialO
      };

      while (this.directionsMap[0].key !== initialO) {
        this.rotate('R');
      }
    }

    // returns the value of the Map by key

  }, {
    key: 'getDirectionValue',
    value: function getDirectionValue(key) {
      for (var i = 0; i < this.directionsMap.length; i++) {
        if (this.directionsMap[i].key === key) {
          return this.directionsMap[i].value;
        }
      }
    }
  }, {
    key: 'moveForward',
    value: function moveForward() {
      // An equation that links the new position to the direction
      var newXPos = this.position.x + (this.getDirectionValue('E') - this.getDirectionValue('W'));
      var newYPos = this.position.y + (this.getDirectionValue('N') - this.getDirectionValue('S'));

      if (newXPos < 0 || newXPos > this.corners.MaxX || newYPos < 0 || newYPos > this.corners.MaxY) {
        return;
      }

      this.position = {
        x: newXPos,
        y: newYPos,
        o: this.directionsMap[0].key
      };
    }

    // shift an array to the right, example [1, 4, 5, 3] becomes [4, 5, 3, 1]

  }, {
    key: 'shiftDirectionsMap',
    value: function shiftDirectionsMap() {
      this.directionsMap[0].value = 0;
      var firstElm = this.directionsMap.shift();
      this.directionsMap[0].value = 1;
      this.directionsMap.push(firstElm);
    }

    // shift an array to the left, example [1, 4, 5, 3] becomes [3, 1, 4, 5]

  }, {
    key: 'unshiftDirectionsMap',
    value: function unshiftDirectionsMap() {
      this.directionsMap[0].value = 0;
      var lastElm = this.directionsMap.pop();
      this.directionsMap = [lastElm].concat(this.directionsMap);
      this.directionsMap[0].value = 1;
    }
  }, {
    key: 'rotate',
    value: function rotate(rotation) {
      if (rotation === 'R') {
        this.shiftDirectionsMap();
      } else {
        this.unshiftDirectionsMap();
      }
    }
  }, {
    key: 'executeSequence',
    value: function executeSequence(sequence) {
      if (!/^[FRL]*$/.test(sequence)) {
        console.error('Invalid sequence');
        return;
      }

      for (var i = 0; i < sequence.length; i++) {
        if (sequence[i] === 'F') {
          this.moveForward();
        } else {
          this.rotate(sequence[i]);
        }
      }
    }
  }]);

  return Mower;
}();

exports.default = Mower;

/***/ })
/******/ ]);