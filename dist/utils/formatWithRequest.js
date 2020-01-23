'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _addFilePath = require('./addFilePath');

var _addFilePath2 = _interopRequireDefault(_addFilePath);

var _buildMessageBlocks = require('./buildMessageBlocks');

var _buildMessageBlocks2 = _interopRequireDefault(_buildMessageBlocks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formatWithRequest = function formatWithRequest(request) {
  return (0, _ramda.compose)(_buildMessageBlocks2.default, (0, _addFilePath2.default)(request));
};

exports.default = formatWithRequest;