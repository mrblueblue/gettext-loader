'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatHeader;

var _ramda = require('ramda');

function formatHeader(header) {

  var headerKeys = (0, _ramda.keys)(header);
  var headerValues = (0, _ramda.values)(header);

  return (0, _ramda.reduce)(function (accum, key) {
    return accum + ('"' + key + ' : ' + headerValues[headerKeys.indexOf(key)] + '"\n');
  }, '')(headerKeys);
}