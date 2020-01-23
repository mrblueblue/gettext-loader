'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _loaderUtils = require('loader-utils');

var _loaderUtils2 = _interopRequireDefault(_loaderUtils);

var _po2json = require('po2json');

var _po2json2 = _interopRequireDefault(_po2json);

var _ramda = require('ramda');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var DEFAULT_GETTEXT = '__';

var root = process.env.PWD;
var config = require(_path2.default.join(root, 'gettext.config.js'));

module.exports = function (source) {

  if (this.cacheable) {
    this.cacheable();
  }
  var relativeFilename = _path2.default.relative(root, this.resourcePath);

  if (relativeFilename.indexOf('..') >= 0) {
    // don't consider files outside of root
    return source;
  }

  var output = {
    path: root + '/' + (config.output.replace('[filename]', relativeFilename) || 'en.po')
  };

  var methodNames = config.methods || [DEFAULT_GETTEXT];

  var AST = (0, _utils.parseECMA)(source);
  var translations = _utils.extractTranslations.apply(undefined, _toConsumableArray(methodNames))(AST);

  if (!translations.length) {
    return source;
  }

  var formatTranslations = (0, _utils.formatWithRequest)(this.request);

  try {
    var buffer = _fs2.default.readFileSync(output.path);
    var current = _po2json2.default.parse(buffer);
    var newStrings = function newStrings(node) {
      return !current[(0, _ramda.prop)('text')(node)];
    };
    var found = (0, _ramda.filter)(newStrings)(translations);

    if (found.length) {

      console.log(found.length + ' new translations found in ' + (0, _utils.getFilename)(this.resourcePath));

      output.source = formatTranslations(found);
      _fs2.default.appendFileSync(output.path, output.source);
    }
  } catch (error) {
    var header_prefix = config.header_prefix || '';
    var header = (0, _utils.formatHeader)(config.header);
    var body = formatTranslations(translations);
    output.source = header_prefix + '\n' + header + '\n' + body;

    _mkdirp2.default.sync((0, _utils.getFolderPath)(output.path));
    _fs2.default.writeFileSync(output.path, output.source);
  }

  return source;
};