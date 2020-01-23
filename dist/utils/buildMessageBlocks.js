'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatMessageBlock = exports.getNumPlurals = exports.buildMsgstrs = exports.buildMsgstr = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _makeRelativePath = require('./makeRelativePath');

var _makeRelativePath2 = _interopRequireDefault(_makeRelativePath);

var _isPluralForm = require('./isPluralForm');

var _isPluralForm2 = _interopRequireDefault(_isPluralForm);

var _ramda = require('ramda');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var root = process.env.PWD;
var config = require(_path2.default.join(root, 'gettext.config.js'));

var buildMsgstr = exports.buildMsgstr = (0, _ramda.map)(function (num) {
  return 'msgstr[' + num + '] ""\n';
});
var buildMsgstrs = exports.buildMsgstrs = function buildMsgstrs(num) {
  return (0, _ramda.compose)((0, _ramda.join)(''), buildMsgstr)((0, _ramda.range)(0, num));
};
var getNumPlurals = exports.getNumPlurals = (0, _ramda.compose)(parseInt, _ramda.last, _ramda.head, (0, _ramda.split)(';'));
var formatMessageBlock = exports.formatMessageBlock = function formatMessageBlock(accum, translation) {
  var path = (0, _makeRelativePath2.default)(translation.path);

  var translationBlock = (0, _ramda.concat)('#: ' + path + ' ' + translation.loc.line + ':' + translation.loc.column + '\n', 'msgid "' + translation.text + '"');

  if ((0, _isPluralForm2.default)(translation.text)) {
    translationBlock += '\nmsgid_plural ""';
    var msgstrs = (0, _ramda.compose)(buildMsgstrs, getNumPlurals)(config.header['Plural-Forms']);

    return (0, _ramda.compose)((0, _ramda.concat)(accum), (0, _ramda.concat)(translationBlock), (0, _ramda.concat)('\n'), (0, _ramda.concat)(msgstrs))('\n');
  }

  return (0, _ramda.compose)((0, _ramda.concat)(accum), (0, _ramda.concat)(translationBlock), (0, _ramda.concat)('\n'), (0, _ramda.concat)('msgstr ""\n'))('\n');
};

exports.default = (0, _ramda.reduce)(formatMessageBlock, '');