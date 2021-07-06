"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _errors = require("./errors");

var _chaincontainer = _interopRequireDefault(require("./chaincontainer"));

var _element = _interopRequireDefault(require("./element"));

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

var _dom = /*#__PURE__*/new WeakMap();

var ChainPanel = /*#__PURE__*/function (_ChainContainer) {
  _inherits(ChainPanel, _ChainContainer);

  var _super = _createSuper(ChainPanel);

  function ChainPanel() {
    var _this;

    _classCallCheck(this, ChainPanel);

    _this = _super.call(this);

    _dom.set(_assertThisInitialized(_this), {
      writable: true,
      value: null
    });

    return _this;
  }

  _createClass(ChainPanel, [{
    key: "render",
    value: function render() {
      if (_classPrivateFieldGet(this, _dom) === null) {
        _classPrivateFieldSet(this, _dom, _element["default"].create('div'));
      }

      return _classPrivateFieldGet(this, _dom);
    }
  }, {
    key: "unrender",
    value: function unrender() {
      _classPrivateFieldGet(this, _dom).remove();

      _classPrivateFieldSet(this, _dom, null);
    }
  }, {
    key: "mount",
    value: function mount(child) {
      if (_classPrivateFieldGet(this, _dom) === null) {
        throw new _errors.ChainError("Cannot mount to a panel that has not been rendered!");
      } else {
        var dom_element = child.render();

        _classPrivateFieldGet(this, _dom).appendChild(dom_element);

        child.mounted();
        this.updated(); // No-op?
      }
    }
  }, {
    key: "dismount",
    value: function dismount(child) {
      if (_classPrivateFieldGet(this, _dom) === null) {
        throw new _errors.ChainError("Cannot dismount from a panel that has not been rendered!");
      } else {
        child.unrender();
        child.dismounted();
        this.updated(); // No-op?
      }
    }
  }]);

  return ChainPanel;
}(_chaincontainer["default"]);

var _default = ChainPanel;
exports["default"] = _default;