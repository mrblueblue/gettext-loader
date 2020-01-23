'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeRelativePath;
exports.getBase = getBase;
exports.splitLastPath = splitLastPath;

var _ramda = require('ramda');

function makeRelativePath(paths) {
  var baseDir = getBase(process.env.PWD);
  var splitPath = splitLastPath(paths);
  var takeIdx = splitPath.length - splitPath.indexOf(baseDir) - 1;

  return (0, _ramda.compose)((0, _ramda.join)('/'), (0, _ramda.takeLast)(takeIdx))(splitPath);
}

function getBase(pwd) {
  return (0, _ramda.compose)(_ramda.last, (0, _ramda.split)('/'))(pwd);
}

function splitLastPath(paths) {
  return (0, _ramda.compose)((0, _ramda.split)('/'), _ramda.last, (0, _ramda.split)('!'))(paths);
}