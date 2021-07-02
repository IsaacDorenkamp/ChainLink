"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _chainlink = _interopRequireDefault(require("./chainlink"));

var _errors = require("./errors");

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

var _children = /*#__PURE__*/new WeakMap();

var _with = /*#__PURE__*/new WeakMap();

var ChainContainer = /*#__PURE__*/function (_ChainLink) {
  _inherits(ChainContainer, _ChainLink);

  var _super = _createSuper(ChainContainer);

  function ChainContainer() {
    var _this;

    _classCallCheck(this, ChainContainer);

    _this = _super.call(this);

    _children.set(_assertThisInitialized(_this), {
      writable: true,
      value: []
    });

    _with.set(_assertThisInitialized(_this), {
      writable: true,
      value: null
    });

    return _this;
  }

  _createClass(ChainContainer, [{
    key: "with",
    value: function (_with2) {
      function _with(_x) {
        return _with2.apply(this, arguments);
      }

      _with.toString = function () {
        return _with2.toString();
      };

      return _with;
    }(function (fn) {
      if (fn instanceof Function) {
        if (_classPrivateFieldGet(this, _with) !== null) {
          fn(_classPrivateFieldGet(this, _with));
        } else {
          throw new _errors.ChainError("No context to call with() on!");
        }
      } else {
        throw new TypeError("fn must be a function!");
      }
    })
  }, {
    key: "add",
    value: function add(child) {
      if (child instanceof _chainlink["default"]) {
        _classPrivateFieldGet(this, _children).push(child);

        _classPrivateFieldSet(this, _with, child);
      } else {
        throw new TypeError("type of child must be a subclass of ChainLink!");
      }
    }
  }, {
    key: "remove",
    value: function remove(child) {
      var idx = _classPrivateFieldGet(this, _children).includes(child);

      if (idx >= 0) {
        _classPrivateFieldGet(this, _children).splice(idx, 1);

        _classPrivateFieldSet(this, _with, null);
      } else {
        throw new _errors.ChainError("No such child '".concat(child, "'"));
      }
    }
  }, {
    key: "$children",
    get: function get() {
      return (0, _util.copy_array)(_classPrivateFieldGet(this, _children));
    }
  }]);

  return ChainContainer;
}(_chainlink["default"]);

var _default = ChainContainer;
exports["default"] = _default;