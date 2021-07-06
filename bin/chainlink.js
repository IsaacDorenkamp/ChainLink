"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _errors = require("./errors");

var _util = require("./util");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

var _dict = /*#__PURE__*/new WeakMap();

var _dom = /*#__PURE__*/new WeakMap();

var _events = /*#__PURE__*/new WeakMap();

/*
Type Definition Structure:

{
	property_with_type: [type | any],
	property_with_options: {
		type: [type | any],
		default: [default value | null]
	}
}
*/
var ChainLink = /*#__PURE__*/function () {
  function ChainLink() {
    var _this = this;

    _classCallCheck(this, ChainLink);

    _dict.set(this, {
      writable: true,
      value: {}
    });

    _dom.set(this, {
      writable: true,
      value: null
    });

    _events.set(this, {
      writable: true,
      value: {}
    });

    var typedef = this.__proto__.constructor.TypeDefinition;

    var _loop = function _loop() {
      var key = _Object$keys[_i];
      var def = typedef[key];
      var validator = null;

      if ((0, _util.is_type)(def) || def === null || typeof def === "string") {
        validator = (0, _util.create_validator)(def);
      } else if (def instanceof Object) {
        var tp = def.type || null;
        validator = (0, _util.create_validator)(tp);

        if (def["default"]) {
          var valid_default = validator(def["default"]);

          if (valid_default) {
            _classPrivateFieldGet(_this, _dict)[key] = def["default"];
          } else {
            throw new TypeError("Invalid type '".concat(_typeof(def["default"]), "' for property '").concat(key, "'"));
          }
        }
      } else {
        throw new Error("Invalid value type for type definition: " + _typeof(def));
      }

      Object.defineProperty(_this, key, {
        enumerable: true,
        get: function get() {
          return _classPrivateFieldGet(_this, _dict)[key] || null;
        },
        set: function set(val) {
          var valid_value = validator(val);

          if (valid_value) {
            _classPrivateFieldGet(_this, _dict)[key] = val;

            _this.updated();
          } else {
            throw new TypeError("Invalid type '".concat(_typeof(val), "' for property '").concat(key, "'"));
          }
        }
      });
    };

    for (var _i = 0, _Object$keys = Object.keys(typedef); _i < _Object$keys.length; _i++) {
      _loop();
    }
  }

  _createClass(ChainLink, [{
    key: "use",
    value: function use(fn) {
      if (typeof fn === "function") {
        fn(this);
        return this;
      } else {
        throw new TypeError("use() must be called with a function!");
      }
    }
  }, {
    key: "mounted",
    value: function mounted() {}
  }, {
    key: "updated",
    value: function updated() {}
  }, {
    key: "dismounted",
    value: function dismounted() {}
  }, {
    key: "_dom",
    get: function get() {
      return _classPrivateFieldGet(this, _dom);
    },
    set: function set(to) {
      _classPrivateFieldSet(this, _dom, to);
    }
  }, {
    key: "set",
    value: function set(prop, value) {
      this[prop] = value;
      return this;
    }
  }, {
    key: "event",
    value: function event(evt_type, cbk) {
      if (typeof name !== "string" || typeof cbk !== "function") throw new TypeError("event must be called with an event type and a callback respectively.");

      if (Object.hasOwnProperty(_classPrivateFieldGet(this, _events), evt_type)) {
        _classPrivateFieldGet(this, _events)[evt_type].push(cbk);
      } else {
        _classPrivateFieldGet(this, _events)[evt_type] = [cbk];
      }

      if (_classPrivateFieldGet(this, _dom) !== null) {
        _classPrivateFieldGet(this, _dom).addEventListener(evt_type, cbk);
      }

      return this;
    }
  }, {
    key: "initialize",
    value: function initialize() {
      throw new _errors.NotImplementedError();
    }
  }, {
    key: "render",
    value: function render() {
      if (_classPrivateFieldGet(this, _dom) === null) {
        this.initialize();

        if (_classPrivateFieldGet(this, _dom) === null) {
          throw new ChainError("initialize() must assign the _dom element!");
        }

        for (var _i2 = 0, _Object$keys2 = Object.keys(_classPrivateFieldGet(this, _events)); _i2 < _Object$keys2.length; _i2++) {
          var evt_type = _Object$keys2[_i2];

          var listeners = _classPrivateFieldGet(this, _events)[evt_type];

          var _iterator = _createForOfIteratorHelper(listeners),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var listener = _step.value;

              _classPrivateFieldGet(this, _dom).addEventListener(evt_type, listener);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
      }

      return _classPrivateFieldGet(this, _dom);
    }
  }, {
    key: "unrender",
    value: function unrender() {
      _classPrivateFieldGet(this, _dom).remove();

      _classPrivateFieldSet(this, _dom, null);
    }
  }]);

  return ChainLink;
}();

ChainLink.TypeDefinition = {};
var _default = ChainLink;
exports["default"] = _default;