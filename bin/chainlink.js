"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _errors = require("./errors");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ChainLink = /*#__PURE__*/function () {
  function ChainLink() {
    _classCallCheck(this, ChainLink);
  }

  _createClass(ChainLink, [{
    key: "initialized",
    value: function initialized() {}
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
    key: "render",
    value: function render() {
      throw new _errors.NotImplementedError();
    }
  }]);

  return ChainLink;
}();

var _default = ChainLink;
exports["default"] = _default;