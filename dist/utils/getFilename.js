'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

exports.default = (0, _ramda.compose)((0, _ramda.join)('.'), (0, _ramda.split)('.'), _ramda.last, (0, _ramda.split)('/'));