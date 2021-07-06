"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.query = query;
exports["default"] = void 0;

function create(type) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var el = document.createElement(type);

  for (var _i = 0, _Object$keys = Object.keys(props); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];

    if (key.startsWith('on')) {
      // event listener
      var evt_type = key.substring(2);
      el.addEventListener(evt_type, props[key]);
    } else {
      el.setAttribute(key, props[key]);
    }
  }

  return el;
}

function query(selector) {
  return document.querySelector(selector);
}

var _default = {
  create: create,
  query: query
};
exports["default"] = _default;