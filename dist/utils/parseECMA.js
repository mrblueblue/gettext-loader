'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseECMA;

var _esprimaFb = require('esprima-fb');

var _esprimaFb2 = _interopRequireDefault(_esprimaFb);

var _ramda = require('ramda');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parseECMA(source) {
  return (0, _ramda.prop)('body')(_esprimaFb2.default.parse(source, {
    tolerant: true,
    loc: true
  }));
}