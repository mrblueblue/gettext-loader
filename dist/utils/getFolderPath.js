'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getFolderPath;

var _ramda = require('ramda');

function getFolderPath(filePath) {
  return (0, _ramda.compose)((0, _ramda.join)('/'), (0, _ramda.dropLast)(1), (0, _ramda.split)('/'))(filePath);
}