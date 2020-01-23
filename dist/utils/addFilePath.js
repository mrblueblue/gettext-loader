'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

function addFilePath(path, translations) {
  var addPath = function addPath(translation) {
    return (0, _ramda.merge)(translation)({ path: path });
  };
  return (0, _ramda.map)(addPath, translations);
}

exports.default = (0, _ramda.curry)(addFilePath);