"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _chainlink = _interopRequireDefault(require("./chainlink"));

var _element = _interopRequireDefault(require("./element"));

var _errors = require("./errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

var _target2 = /*#__PURE__*/new WeakMap();

var ChainWorks = /*#__PURE__*/function () {
  function ChainWorks(target) {
    _classCallCheck(this, ChainWorks);

    _target2.set(this, {
      writable: true,
      value: null
    });

    if (typeof target === "string") {
      var _target = _element["default"].query(target);

      if (_target === null) {
        throw new _errors.ChainError("Cannot create ChainWorks with null render target!");
      } else {
        _classPrivateFieldSet(this, _target2, _target);
      }
    } else if (target instanceof HTMLElement) {
      _classPrivateFieldSet(this, _target2, target);
    } else {
      throw new TypeError("target must be a selector or an element!");
    }
  }

  _createClass(ChainWorks, [{
    key: "render",
    value: function render(clink) {
      if (clink instanceof _chainlink["default"]) {
        if (this.target.childNodes.length !== 0) {
          // TODO - remove all children instead? provide an option for this?
          throw new _errors.ChainError("Cannot render to a populated element!");
        }

        this.target.appendChild(clink.render());
      } else {
        throw new TypeError("must provide a ChainLink to render");
      }
    }
  }, {
    key: "target",
    get: function get() {
      return _classPrivateFieldGet(this, _target2);
    }
    /* Returns a Promise which will resolve to a ChainWorks
       instance once the page is loaded (even if it already is) */

  }], [{
    key: "lazy",
    value: function lazy(selector) {
      if (typeof selector !== 'string') {
        throw new Error("lazy() expects a selector, not " + _typeof(selector));
      }

      if (document.readyState === 'complete') {
        return Promise.resolve(new ChainWorks(selector));
      } else {
        return new Promise(function (resolve) {
          window.addEventListener('load', function () {
            resolve(new ChainWorks(selector));
          });
        });
      }
    }
  }]);

  return ChainWorks;
}();

var _default = ChainWorks;
exports["default"] = _default;